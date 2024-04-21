const express = require('express');
import * as uuid from 'uuid';
const {GameSession} = require('./models/gameSession');


const router = express.Router();

router.get("/game/:id", async (req, res) => {

  // find a game based on the session id
  const game = await GameSession.findOne({ sessionId: req.params.id });

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  res.status(200).json({ game });
});

router.post("/game/:id/join", async (req, res) => {

  // find a game based on the session id
  const game = await GameSession.findOne({ sessionId: req.params.id });

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // add the user to the game session
  // check if the game is full first
  if (game.users.length > 3) {
    return res.status(400).json({ error: "Game is full" });
  }

  game.users.push(req.body.user);

  await game.save();

  res.status(200).json({ game });
});

router.post('/game', async (req, res) => {
   
   // create a game session
   // generate a unique session id
  const sessionId = uuid.v4();
   const newGame = {
      sessionId: sessionId,
      gameLeader: req.body.user,
      users: [req.body.user]
   }
   const game = await GameSession.create(newGame);

  res.json({ game });
});

// submit the game for a particular round
router.post('/game/:id/round/:round', async (req, res) => {

  // find a game based on the session id
  const game = await GameSession.findOne({ sessionId: req.params.id });

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // find the user in the game session
  const user = game.users.find(u => u.user === req.body.user);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // check if the user has already submitted for this round
  const round = user.audioFiles.find(a => a.round === req.params.round);

  if (round) {
    return res.status(400).json({ error: "User has already submitted for this round" });
  }
  
  // add the audio file to the user
  user.audioFiles.push({
    round: req.params.round,
    audioData: req.body.audioData,
    mimeType: req.body.mimeType
  });

  await game.save();

  res.status(200).json({ game });

});


export default router;
