const Player = (name, mark) => {
    return {name, mark};
};

const Cell = () => {

    let value = 0;

    const changeValue = (mark) => {
        value = mark;
    }

    return {changeValue, value};
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

    const printBoard = () => {
        const boardWithMarks = board.map(function(row) {
            return row.map(function(cell) {
                return cell.value;
            })
        });
        console.log(boardWithMarks);
    }

    return {getBoard, printBoard};
})();

const GameController = (() => {

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

    const makeMark = (row, column) => {
        if (board.getBoard()[row][column].value == 0)
         board.getBoard()[row][column].value = getActivePlayer().mark;
    }

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} made mark at row ${row} and column ${column}`);
        board.getBoard();
        makeMark(row, column);

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {getActivePlayer, playRound,
            getBoard: board.getBoard};
})();

const DisplayController = (() => {
    const boardDiv = document.querySelector(".board");
    const playerTurn = document.querySelector(".turn");
    const game = GameController

    const updateScreen = () => {
        const board = game.getBoard();
        const player = game.getActivePlayer();

        playerTurn.textContent = `${player.name}'s turn`

        board.forEach((row, j) => {
            const rowDiv = document.createElement("div");
            row.forEach((cell, index) => {
                const cellButton = document.createElement('button');
                cellButton.setAttribute("class", "cell");
                if (cell.value != 0) {
                    cellButton.textContent = cell.value
                }
                cellButton.dataset.column = index
                rowDiv.appendChild(cellButton);
            })
            boardDiv.appendChild(rowDiv);
        })
    }

    updateScreen();
})();

const game = GameController