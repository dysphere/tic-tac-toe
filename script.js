const Cell = () => {

    let value = '';

    const addMark = (player) => {
        if (value == '') {
            value = player.mark
        }
    };

    const getValue = () => {value};

    return {addMark, getValue};
};

const Player = (name, mark) => {
    return {name, mark}
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

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithMarks = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithMarks);
    }

    return {getBoard, printBoard};
})();

const DisplayController = (() => {

    const board = GameBoard;
    const players = [Player("Player one", "X"),
                    Player("Player two", "O")];
})();

console.log(GameBoard.getBoard())