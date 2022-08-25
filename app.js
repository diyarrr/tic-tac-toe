
const submitButton = document.getElementById("submit-button");
let name1Input = document.getElementById("player1");
let name2Input = document.getElementById("player2");
const namesContainer = document.getElementsByClassName("names");
const title = document.getElementById("h1");
const restart = document.getElementById("restart");

// Getting the names of players with submission

let player1, player2;

submitButton.addEventListener("click", function() {

    if(name1Input.value === "" || name2Input.value === "") {
        alert("Please fill name section appropriately");
    }
    else {
        player1 = Person(name1Input.value, 1, "x");
        player2 = Person(name2Input.value, 2, "o");

        console.log(player1);
        console.log(player2);

        namesContainer[0].style.visibility = "hidden";
        title.textContent = player1.playerName + "'s turn";
    }

    restart.style.visibility = "visible";

})

// Creating board object
const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const fillBoard = (index, sign) => {
        board[index] = sign;

    }
    return {fillBoard, board};
})();


// Creating person object
const Person = (playerName, playerNumber, sign) => {

    return {playerName, playerNumber, sign};

}

// Filling the divs with board elements

function renderBoard() {
    board = gameBoard.board;
    const boxes = Array.from(document.getElementsByClassName("box"));

    for(let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = board[i];


    }
}

// Altering textcontexts with dom manipulation

const displayController = () => {
    const clickedBoxes = document.querySelectorAll(".box");

    let gameCounter = 0;


    clickedBoxes.forEach(box => {
        box.addEventListener("click", function(e) {

            // Keep tracking which player's turn
            // Modulo operator is suitable for this kind of problem
            if(gameCounter % 2 === 0) {
                title.textContent = player1.playerName + "'s turn";
                if(checkEmptySpot(gameBoard.board, e.target.id)) {
                    gameBoard.fillBoard(e.target.id, player1.sign);
                    e.target.textContent = player1.sign;
                    e.target.style.color = "#FEC260";
                    if(isGameOver(gameBoard.board, player1.sign)) {
                        
                        title.textContent = player1.playerName + " Won!";
                        return;
                        
                    }
                    else if(isDraw(gameBoard.board)) {
                        title.textContent = "Draw!";
                    }
                    else {
                        title.textContent = player2.playerName + "'s turn";
                    }
                }
                gameCounter++;

            }

            else {
                if(checkEmptySpot(gameBoard.board, e.target.id)) {
                    gameBoard.fillBoard(e.target.id, player2.sign);
                    e.target.textContent = player2.sign;
                    e.target.style.color = "#2A0944";
                    if(isGameOver(gameBoard.board, player2.sign)) {
                        title.textContent = player2.playerName + " Won!";
                        return;
                    }
                    else if(isDraw(gameBoard.board)) {
                        title.textContent = "Draw!";
                    }

                    else {
                        title.textContent = player1.playerName + "'s turn";
                    }
                }
                gameCounter++;   
            }
            console.log(gameCounter);
        })
    }) 
    return {gameCounter};
    }

// Checking if clicked box is empty or not
const checkEmptySpot = (board, index) => {
    if(board[index] === "x" || board[index] === "o") {
        return false;
    }
    else {
        return true;
    }

}


// Checking state of the game
const isGameOver = (board, sign) => {
    const allConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ]

    for(let i = 0; i < allConditions.length; i++) {
        const condition = allConditions[i];
        const box1 = board[condition[0]];
        const box2 = board[condition[1]];
        const box3 = board[condition[2]];

        if((box1 === box2 && box2 === box3) && (box1 === sign)) {
            return true;
        }
    }

}

// Looking for a tie

const isDraw = (board) => {
    let counter = 0;
    for(let i = 0; i < board.length; i++) {
        if(board[i] !== "") {
            counter++;
            
        }
    }
    if(counter === 9) {
        return true;
    }
}

// Restarts the game

restart.addEventListener("click", function() {
    board = gameBoard.board;
    const clickedBoxes = document.querySelectorAll(".box");

    for(let i = 0; i < board.length; i++) {
        board[i] = "";
    }

    clickedBoxes.forEach(box => {
        box.textContent = "";

    })

    title.textContent = "Tic Tac Toe";

    displayController.gameCounter = 0;

    name1Input.value = "";
    name2Input.value = "";

    namesContainer[0].style.visibility = "visible";
        
})

renderBoard();
displayController();