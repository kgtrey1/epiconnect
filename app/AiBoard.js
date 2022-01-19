import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
const io = require("socket.io-client");

const socket = io("ws://192.168.1.3:4242")
const EMPTY = 0
const PLAYER = 1
const AI = 2

function AiBoard(props) {
    const [init, setInit] = useState(false)
    const [turn, setTurn] = useState(PLAYER)
    const [board, setBoard] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ])
    
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
        return; //fix the full column
    }

    const getRow = () => {
        return (Object.keys(board).map((i) => {
            let row = Object.keys(board[i]).map((j) => {
                if (board[i][j] === EMPTY)
                    return (<TouchableOpacity key={i+'-'+j} style={styles.emptyPawn} onPress={() => { playerMove(j) }}/>)
                else if (board[i][j] === 1)
                    return (<TouchableOpacity key={i+'-'+j} style={styles.redPawn} onPress={() => { playerMove(j) }}/>)
                return (<TouchableOpacity key={i+'-'+j} style={styles.yellowPawn} onPress={() => { playerMove(j) }}/>)
            })
            return (
                <View key={i} style={{ backgroundColor: '#202a7d', flex: 1, flexDirection: 'row'}}>
                    {row}
                </View>
            )
        }))
    }
    
    return (
        <View style={{borderColor: 'black', borderWidth: 1, height: '34%', width: '80%'}}>
            {getRow()}
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
    }
})

export default AiBoard