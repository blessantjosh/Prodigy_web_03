
// Get references to grid elements and information container
const boxes = document.querySelectorAll('.box');
const info = document.querySelector('.info');
const resetButton = document.getElementById('reset');

// Game variables
let currentPlayer = 'X'; // Starting player
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Array to store game state

// Function to update box text and game state
function updateBox(index, player) {
  boxes[index].textContent = player;
  gameBoard[index] = player;
}

// Function to check for win
function checkWin(player) {
  const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  for (const condition of winningConditions) {
    if (
      gameBoard[condition[0]] === player &&
      gameBoard[condition[1]] === player &&
      gameBoard[condition[2]] === player
    ) {
      return true;
    }
  }

  return false;
}

// Function to check for draw
function checkDraw() {
  return gameBoard.every((box) => box !== ''); // Check if all boxes are filled
}

// Function to handle box click
function handleBoxClick(event) {
  const index = parseInt(event.target.dataset.index); // Get box index

  // Check if box is empty and game is not over
  if (gameBoard[index] === '' && !checkWin('X') && !checkWin('O')) {
    updateBox(index, currentPlayer);

    // Check for win or draw
    if (checkWin(currentPlayer)) {
      info.textContent = alert(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
      info.textContent = alert("It's a draw!");
    } else {
      // Switch player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Add click event listeners to boxes
boxes.forEach((box, index) => {
  box.dataset.index = index; // Set data attribute for box index
  box.addEventListener('click', handleBoxClick);
});

// Reset button event listener
resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  boxes.forEach((box) => (box.textContent = ''));
  info.textContent = '';
});
