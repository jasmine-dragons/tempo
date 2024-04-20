const express = require('express');
const GameSession = require('./models/gameSession');

const router = express.Router();

router.get("/game/:id", async (req, res) => {

  // find a game based on the session id
  const game = await GameSession.findOne({ sessionId: req.params.id });
  res.json(game);

});

router.post("/game/:id/join", async (req, res) => {

  // find a game based on the session id
  const game = await GameSession.findOne({ sessionId: req.params.id });

  // add the user to the game session
  // check if the game is full first
  if (game.users.length < 4) {
    game.users.push(req.body.user);
    await game.save();
  }

  res.json(game);
});

router.post('/game', async (req, res) => {
   
   // create a game session
   // generate a unique session id
   const roomId = '123';
   const gameSession = new GameSession({
        sessionId: roomId,
        gameLeader: req.body.user
    });

    await gameSession.save()
    res.json({ gameSession });
});

export default router;
