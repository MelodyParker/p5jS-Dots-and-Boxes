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
let canvasBackgroundColor = "#ddd";
let outerRadius = 10;

// dots
let dotDiameter = 20;
let dotColor = "#444";

// lines
let lineThickness = 7;


// player colors
let playerLineColors =  ["#999", "#FF007F", "#31AFD4", "#FFFD82"];
let playerBoxColors =   [canvasBackgroundColor, "#FF85C2", "#CCEBF5", "#DDDD00"]
let playerHoverColors = ["#222", "#CC0066", "#2698BA", "#FFFC33"]
// indexed by player (0 is no one there, 1 is player 1 there, 2 is player 2 there, etc.)










function setup() {
  if ((window.innerWidth * 0.8 <= (horizDimension * scalingFactor) || window.innerHeight * 0.9 <= (vertDimension * scalingFactor))) {
    scalingFactor = 0.8 * Math.min(window.innerWidth / horizDimension, window.innerHeight / vertDimension);
  }
  canvas = createCanvas(horizDimension * scalingFactor + dotDiameter + 2 * outerRadius, vertDimension * scalingFactor + dotDiameter + 2 * outerRadius);
  canvas.parent("canvas-holder");
}


function draw() {
  background(canvasBackgroundColor);
  cursor(ARROW);
  renderBoxes(boxGrid);
  drawLines(horizLineGrid, vertLineGrid);
  drawHoveredLine(mouseX, mouseY);
  drawDots(horizDimension, vertDimension);
}


function mouseClicked() {
  handleMouseClick(mouseX, mouseY);
}