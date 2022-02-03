import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SocketContext } from './Socket';

const EMPTY = 0
const PLAYER = 1
const AI = 2

function AiBoard(props) {
    const socket = React.useContext(SocketContext)
    const [init, setInit] = React.useState(false)
    const [turn, setTurn] = React.useState(PLAYER)
    const [board, setBoard] = React.useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ])


    React.useEffect(() => {
        if (init === false) {
            socket.emit('start')

            socket.on('win', (player) => {
              let temporaryBoard =  [... board]
        
              for (let i = 0; i <= temporaryBoard.length - 1; i++) {
                for (let j = 0; j <= temporaryBoard[i].length - 1; j++)
                  temporaryBoard[i][j] = 0
              }
              setBoard(temporaryBoard)
              setTurn(PLAYER)
              props.onWin(player)
              socket.emit('start')
            })
            
            socket.on('move', (position) => {
                setNewPawn(position, AI)
                setTurn(PLAYER)
            })
        
            setInit(true)
        }
    });

    const playerMove = (column) => {
        if (turn === PLAYER) {
            setTurn(AI)
            socket.emit('player_move', column)
            setNewPawn(column, PLAYER)
        }
        return
    }

    const setNewPawn = (column, player) => {
        let temporaryBoard = new Array([]);

        temporaryBoard = [... board];
        for (let i = temporaryBoard.length - 1; i >= 0; i--) {
            if (temporaryBoard[i][column] === 0) {
                temporaryBoard[i][column] = player;
                setBoard(temporaryBoard);
                return;
            }
        }
        return;
    }

    const renderRow = () => {
        return (Object.keys(board).map((i) => {
            let row = Object.keys(board[i]).map((j) => {
                if (board[i][j] === EMPTY)
                    return (
                        <TouchableOpacity
                            key={i+'-'+j}
                            style={styles.emptyPawn}
                            onPress={() => { playerMove(j) }}
                        />
                    )
                else if (board[i][j] === 1)
                    return (
                        <TouchableOpacity
                            key={i+'-'+j}
                            style={styles.redPawn}
                            onPress={() => { playerMove(j) }}
                        />
                    )
                return (
                    <TouchableOpacity
                        key={i+'-'+j}
                        style={styles.yellowPawn}
                        onPress={() => { playerMove(j) }}
                    />
                )
            })
            return (
                <View
                    key={i}
                    style={styles.boardCell}
                >
                    {row}
                </View>
            )
        }))
    }
    
    return (
        <View
            style={styles.board}
        >
            {renderRow()}
        </View>
    )
}

const styles = StyleSheet.create({
    emptyPawn: {
        backgroundColor: 'white',
        flex: 1,
        width: '50%',
        height: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 100
    },
    yellowPawn: {
        backgroundColor: 'yellow',
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 100
    },
    redPawn: {
        backgroundColor: 'red',
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 100
    },
    board: {
        borderColor: 'black',
        borderWidth: 1,
        height: '34%',
        width: '80%'
    },
    boardCell: {
        backgroundColor: '#202a7d',
        flex: 1,
        flexDirection: 'row'
    }
})

export default AiBoard