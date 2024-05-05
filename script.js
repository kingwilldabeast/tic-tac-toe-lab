//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0,1,2], //first row
    [3,4,5],
    [6,7,8],
    [0,3,6], //first columm
    [1,4,7],
    [2,5,8], //
    [0,4,8],
    [2,4,6]
]

/*---------------------------- Variables (state) ----------------------------*/


let winner 
let board
let turn 
let tie 

/*------------------------ Cached Element References ------------------------*/

const page = document.querySelector('body')

const header = document.querySelector('h1')

const messageEl = document.getElementById(`message`)

const table = document.querySelector('#board')

const squareEls = document.querySelectorAll('.sqr')

const resetBtnEl = document.getElementById('reset')

/*-------------------------------- Functions --------------------------------*/


function init() {
    page.style.backgroundColor = 'gainsboro';
    header.style.color = 'black';
    messageEl.style.color = 'black';
    squareEls.forEach((square) => square.style.backgroundColor = 'gainsboro')
    board = ['', '', '','','','','','','']
    // board = ['X', 'X', 'X','X','O','','','','X'] //winning
    // board = ['X', 'O', 'X','X','O','X','O','X','O'] //tie

    //players are objects
    players = [{name: 'Alice',symbol:'😇', color: '#ee44dd'},{name: 'Barney', symbol:'👺', color: '#2299aa'}]

    turn = players[0] //set starting player
    // winner = true
    winner = false
    // tie = true
    tie = false
    render()
}

function render() {
    updateBoard()
    updateMessage()
}

//sets board display to match board array 
// function updateBoard() {
//     for (let i = 0; i < 9; i++) {
//         document.getElementById(i).innerText = board [i];
//         //console.log(document.getElementById(i).innerText)
//     }
// }
function updateBoard() {
        squareEls.forEach((i) => {
            let index = parseInt(i.getAttribute('id'))
            i.innerText = board[index]
        })
    }



//changes prompt on screen
function updateMessage() {
    if (winner == false && tie ==false) {
        messageEl.innerText = `It is player ${turn.name}'s turn`
    } else if (winner == false && tie == true) {
        messageEl.innerText = `it is a tie`
        page.style.backgroundColor = '#DFE42D';
        messageEl.style.color = '#8C6D13';
        header.style.color = '#8C6D13';
    }   else  {
        messageEl.innerText = `Player ${turn.name} is the winner!`
        page.style.backgroundColor = '#6ADB6A';
        messageEl.style.color = '#257325';
        header.style.color = '#257325';
    }    
}

//many things happen when click square
function handleClick(square) {
    if (winner == true) {return}
     
    //change color 
    if (square.innerText != "") {
        return
    } else {
        square.style.backgroundColor = turn.color;
    }

    //update array
    let index = parseInt(square.getAttribute('id'))
    board[index] = turn.symbol

    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        // console.log(`combos are ${combo[0]} ${combo[1]} ${combo[2]}`)
        let [a,b,c] = combo
        if (board[a] != "" && board[a] == board[b] && board[b] == board[c]) {
            winner = true
        }
    })
}

// function checkForTie() {
//     if (winner == true) {return} //stop the function 
//     let counter = 0
//     board.forEach((index) => {
//         if (index == '') {
//             return //stop the function 
//         } else {
//             counter++ 
//         }
//     })
//     if (counter == 9) {
//         tie = true
//     }

// }
function checkForTie() { 
        if (winner) {return}
        const isFull = (currentValue) => currentValue != '';
        if (board.every(isFull)) {tie = true}
}


    //change player
    function switchPlayerTurn() {
        if (winner) {return}
        turn == players[0] ? turn = players[1] : turn = players[0]

    }


/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('body').addEventListener("load", init());
// document.querySelector('body').onload = function(){init()};


// Add a click event listener to each square
squareEls.forEach(function(square) {
    square.addEventListener('click', function() {    handleClick(square)  }  );
});

// alternate Event listener function to handle button clicks
// square.addEventListener('click', handleButtonClick);

//alternate click function
// function handleButtonClick(event) {
    //     const squareIndex = event.target.id;
    //     console.log('Clicked button ID:', clickedButtonId);
    // }
    
resetBtnEl.addEventListener("click", init);
    
    


// collab with Tanner Gilliam
// assisted Megan, Kass, Alfred, Azalea and in some cases took inspiration from their code 
