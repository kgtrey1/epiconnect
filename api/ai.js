const { spawn } = require('child_process');
const {streamWrite} = require('@rauschma/stringio')

const PLAYER = 1
const AI = 2

const ENDED = 3
const ONGOING = 4

class Game {
    constructor(socket) {
        this.socket = socket
        this.ai = spawn('python3', ['-u', './ai/program.py', 'human', 'minimax'], {
            env: {
                "PYTHONUNBUFFERED": 'TRUE'
            }
        })
        this.turn = PLAYER
        this.gameStatus = ONGOING

        this.ai.stdout.on('data', (data) => {
            console.log('AI Moved')
            let serializedData = data.toString();
            let resp = {}
            console.log(serializedData)
            serializedData.replace('\n', '');
            serializedData.replace('\r', '');
            if (serializedData.includes('win')) {
                this.gameStatus = ENDED
                socket.emit('win', serializedData[serializedData.length - 2])
            }
            else {
                this.turn = PLAYER
                console.log('moving on ' + serializedData[serializedData.length - 2])
                socket.emit('move', serializedData[serializedData.length - 2])
            }
        })
    }

    async getGameStatus() {
        return (this.gameStatus)
    }

    async getTurn() {
        return (this.turn)
    }

    async setMove(move) {
        if (this.turn !== PLAYER || this.gameStatus !== ONGOING)
            return;
        console.log('Player move:' + move)
        if (parseInt(move) < 0 || parseInt(move) > 6)
            return;
        this.turn = AI
        await streamWrite(this.ai.stdin, move + '\n')
    }
}

module.exports = Game;