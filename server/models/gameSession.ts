const mongoose = require('mongoose');

const GameSessionSchema = mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        gameLeader: {
            type: String,
            required: true
        },
        users: {
            // list of users in game session
            type: [String]
        }
    },
    {
        timestamps: true
    }
);

const GameSession = mongoose.model('GameSession', GameSessionSchema);

module.exports = { GameSession };