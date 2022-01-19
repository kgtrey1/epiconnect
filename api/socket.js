const { Server } = require("socket.io")
const Game = require('./ai.js')
const io = new Server({})

console.log('server started')

io.on("connection", (socket) => {
    let game = null;

    console.log('New Connection')
    socket.on('start', () => {
        console.log('Player started a game')
        if (game !== null)
            game = null
        game = new Game(socket)
        return
    })

    socket.on('player_move', (move) => {
        console.log('Player moved')
        console.log(move)
        if (game != null) {
            console.log('game not null')
            game.setMove(move)
        }
        return
    })
})

io.listen(4242)