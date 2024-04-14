import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);

  const handlePress = (index) => {
    if (board[index] || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameOver(true);
        Alert.alert(`Player ${board[a]} Wins!`);
        return;
      }
    }
    if (!board.includes(null)) {
      setGameOver(true);
      Alert.alert('Draw Game!');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe Game</Text>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33%',
    height: '33%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  cellText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
});

export default App;
