// logic
let horizDimension = 5;
let vertDimension = 5;

// representations (0=empty, 1=claimed by player 1, 2=claimed by player 2, etc.)
let boxGrid = createBoxGrid(horizDimension, vertDimension); 
// represents the filled in boxes

let vertLineGrid = createVertLineGrid(horizDimension, vertDimension);
// represents the vertical lines in the grid
let horizLineGrid = createHorizLineGrid(horizDimension, vertDimension);
// represents the horizontal lines in the grid

// players
let numPlayers = 3;
let currentTurn = 1;


// user input
let lineErrorMargin = 15;



// rendering
let canvas;
let scalingFactor = 100;
let canvasBackgroundColor = "#000";
let outerRadius = 10;

// dots
let dotDiameter = 20;
let dotColor = "#666";

// lines
let lineThickness = 10;


// player colors
let playerLineColors =  ["#333", "#F49F0A", "#00E0E0", "#5CFF7F", "#E637C9"];
let playerBoxColors =   [canvasBackgroundColor, "#9D6607", "#009393", "#008F1F", "#A3148C"];
let playerHoverColors = ["#222", "#B07207", "#008F8F", "#008F1F", "#7F106D"]
// indexed by player (0 is no one there, 1 is player 1 there, 2 is player 2 there, etc.)

let gameOver = false;


function submitForm(e) {
  e.preventDefault();
  let formElement = document.querySelector("#start-game-form");
  numPlayers = document.querySelector("#num-players").value;
  horizDimension = document.querySelector("#x-dim").value;
  vertDimension = document.querySelector("#y-dim").value;
  resizeCanvas(horizDimension * scalingFactor + dotDiameter + 2 * outerRadius, vertDimension * scalingFactor + dotDiameter + 2 * outerRadius);
  formElement.parentNode.removeChild(formElement);
  
  // representations (0=empty, 1=claimed by player 1, 2=claimed by player 2, etc.)
  boxGrid = createBoxGrid(horizDimension, vertDimension); 
  // represents the filled in boxes

  vertLineGrid = createVertLineGrid(horizDimension, vertDimension);
  // represents the vertical lines in the grid
  horizLineGrid = createHorizLineGrid(horizDimension, vertDimension);
  // represents the horizontal lines in the grid
}





function setup() {
  if ((window.innerWidth * 0.8 <= (horizDimension * scalingFactor) || window.innerHeight * 0.9 <= (vertDimension * scalingFactor))) {
    scalingFactor = 0.8 * Math.min(window.innerWidth / horizDimension, window.innerHeight / vertDimension);
  }
  // canvas = createCanvas(horizDimension * scalingFactor + dotDiameter + 2 * outerRadius, vertDimension * scalingFactor + dotDiameter + 2 * outerRadius);
  canvas = createCanvas(0,0)
  canvas.parent("canvas-holder");
  let formElement = document.querySelector("#start-game-form");
  formElement.addEventListener("submit", submitForm) 
}


function draw() {
  if (gameOver) return
  background(canvasBackgroundColor);
  cursor(ARROW);
  renderBoxes(boxGrid);
  drawLines(horizLineGrid, vertLineGrid);
  drawHoveredLine(mouseX, mouseY);
  drawDots(horizDimension, vertDimension);
  if (!gameOver && gameIsOver(boxGrid)) {
    gameOver = true;
    let winner = getWinner(boxGrid);
    let winnerElement = document.createElement("p");
    winnerElement.innerHTML = `Player ${winner} wins!`;
    winnerElement.style.color = playerLineColors[winner];
    let parentElement = document.querySelector("#winner-container");
    parentElement.appendChild(winnerElement);
    let allContainer = document.querySelector("#all-container");
    allContainer.classList.add("post-win")
  }
}


function mouseClicked() {
  handleMouseClick(mouseX, mouseY);
}