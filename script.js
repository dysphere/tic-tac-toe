const Player = (name, mark) => {
    return {name, mark}
};

const Cell = () => {

    let value = '';

    const getValue = () => {return value};

    return {getValue};
};

const GameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => {return board};

    const addMark = (row, column, Player) => {
        if (board[row][column] == '') {
            board[row][column].addToken(Player);
        }
    };

    const printBoard = () => {
        const boardWithMarks = board.map(function(row) {
            return row.map(function(cell) {
                return cell.getValue();
            })
        });
        console.log(boardWithMarks);
    }

    return {getBoard, printBoard, addMark};
})();

const DisplayController = (() => {

    const board = GameBoard;
    const players = [Player("Player one", "X"),
                    Player("Player two", "O")];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} made mark at row ${row} and column ${column}`);
        board.getBoard()
        board.addMark(row, column, getActivePlayer())
        console.log(board.getBoard())

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {getActivePlayer, playRound};
})();

const game = DisplayController