const mongoose = require('mongoose');

const GameSessionSchema = mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true
        },
        gameLeader: {
            type: String,
            required: true
        },
        users: [
            {
                user: {
                    type: String,
                    required: true
                },
                audioFiles: [
                    {
                        round: Number,
                        audioData: {
                            type: Buffer,
                            required: true
                        }
                    }
                ]
            }
        ],
        gameRound: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const GameSession = mongoose.model('GameSession', GameSessionSchema);

module.exports = {GameSession};