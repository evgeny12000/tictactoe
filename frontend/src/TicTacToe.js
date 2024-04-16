import React, { useState } from 'react';
import axios from 'axios';
import './TicTacToe.css';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    const makeStep = async (index) => {
        if (board[index] || winner) {
            console.log('Invalid step');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/makeStep', {
                board: board,
                step: { index: index, player: currentPlayer }
            });
            setBoard(response.data.board);
            setWinner(response.data.winner);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        } catch (error) {
            console.error('incorect step', error);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setWinner(null);
    };

    return (
        <div>
            <div className="game-board">
                {board.map((cell, idx) => (
                    <div key={idx} className="board-cell" onClick={() => makeStep(idx)}>
                        {cell}
                    </div>
                ))}
            </div>
            {winner && <p className="winner-message">Winner: {winner}</p>}
            <button className="reset-button" onClick={resetGame}>New Game</button>
        </div>
    );
};

export default TicTacToe;