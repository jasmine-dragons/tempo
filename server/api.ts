const express = require('express');
import * as uuid from 'uuid';
const {GameSession} = require('./models/gameSession');




// const upload = multer({ storage: multer.memoryStorage() });


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
router.post('/game/:id/submit', async (req, res) => {
  if (!req.query.user || !req.params.id) {
    return res.status(400).json({ error: "Bad request" });
  }
  console.info(`Received submission from ${req.query.user}`)

  // find a game based on the session id
  const game = await GameSession.findOne({ sessionId: req.params.id });

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // old upload 
  // const blob = req.file.buffer;
  // const buffer = Buffer.from(blob, 'binary');
  // game.blob = buffer;
  // await game.save();

  console.log(req.body)
  const buffer = req.body;
  game.submissions.push({user: req.query.user, blob: buffer});
  await game.save();

  // const wavFile = req.file;
  // console.log(req.file);
  // //Buffer.from(new Uint8Array(wavData))
  // game.musicBlob = wavFile.buffer;
  // await game.save();


  res.status(200).json({ game });
});


export default router;
