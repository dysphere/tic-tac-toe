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

    const checkWinner = () => {
        let boardVal = board.getBoard();
        let boardA = []
        for (const row of boardVal) {
            let rowA = []
            for (const cell of row) {
                rowA.push(cell.value)
            }
            boardA.push(rowA)
        }
        for (let i = 0; i < 3; i++) {
            if (boardA[0][i] === boardA[1][i] && boardA[0][i] === boardA[2][i] && boardA[0][i] != 0) {
                return true;
            }
            else if (boardA[i][0] === boardA[i][1] && boardA[i][0] === boardA[i][2] && boardA[i][0] != 0) {
                return true;
            }
        }
        if (boardA[0][0] === boardA[1][1] && boardA[0][0] === boardA[2][2] && boardA[0][0] != 0) {
            return true;
        }
        else if (boardA[0][2] === boardA[1][1] && boardA[0][2] === boardA[2][0] && boardA[0][2] != 0) {
            return true;
        }
    }

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} made mark at row ${row} and column ${column}`);
        board.getBoard();
        makeMark(row, column);
        console.log(checkWinner())
        checkWinner();

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
        boardDiv.textContent = ""

        const board = game.getBoard();
        const player = game.getActivePlayer();

        playerTurn.textContent = `${player.name}'s turn`

        board.forEach((row, j) => {
            const colDiv = document.createElement("div");
            row.forEach((cell, index) => {
                const cellButton = document.createElement('button');
                cellButton.setAttribute("class", "cell");
                cellButton.setAttribute("type", "button")
                if (cell.value != 0) {
                    cellButton.textContent = cell.value
                }
                cellButton.dataset.row = index
                colDiv.appendChild(cellButton);
            })
            colDiv.dataset.column = j
            boardDiv.appendChild(colDiv);
        })

        const buttons = document.querySelectorAll(".cell");
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                let column = button.dataset.row
                let row = button.parentElement.dataset.column
                game.playRound(row, column);
                updateScreen();
            });
        });
    }

    updateScreen();
})();

const game = GameController