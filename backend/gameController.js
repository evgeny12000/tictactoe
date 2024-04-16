
function checkWinner(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (board[line[0]] && board[line[0]] === board[line[1]] && board[line[0]] === board[line[2]]) {
            return board[line[0]];
        }
    }
    if (board.includes(null)) {
        return null;
    } else {
        return 'Tie';
    }
}

const makeStep = (board, step) => {
    const { index, player } = step;

    if (index < 0 || index > 8 || board[index] || !player) {
        throw new Error('incorect step');
    }

    board[index] = player;
    const winner = checkWinner(board);
    return { board: board, winner: winner};
};

module.exports = {
    makeStep
};
