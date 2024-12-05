function createBoxGrid(horizDimension, vertDimension) {
  let blankGrid = [];
  for (let i=0; i<vertDimension; i++) {
    let newRow = [];
    for (let j=0; j<horizDimension; j++) {
      newRow.push(0);
    }
    blankGrid.push(newRow);
  }
  return blankGrid;
}


function createVertLineGrid(horizDimension, vertDimension) {
  let blankGrid = [];
  for (let i=0; i<vertDimension; i++) {
    let newRow = [];
    for (let j=0; j<horizDimension + 1; j++) {
      newRow.push(0);
    }
    blankGrid.push(newRow);
  }
  return blankGrid;
  
}

function createHorizLineGrid(horizDimension, vertDimension) {
  let blankGrid = [];
  for (let i=0; i<vertDimension + 1; i++) {
    let newRow = [];
    for (let j=0; j<horizDimension; j++) {
      newRow.push(0);
    }
    blankGrid.push(newRow);
  }
  return blankGrid;
  
}


function intersectsWithLine(x, y) {
  
  if (x >= (outerRadius + scalingFactor * horizDimension + lineErrorMargin) || y >= (outerRadius + scalingFactor * vertDimension + lineErrorMargin) || x < outerRadius || y < outerRadius) return 0;

  // checks vertical line intersections
  let intersectsWithVertLine = Math.abs((x - outerRadius) % scalingFactor) <= lineErrorMargin;
  let intersectsWithHorizLine = Math.abs((y - outerRadius) % scalingFactor) <= lineErrorMargin;

  return 1 * intersectsWithHorizLine + 2 * intersectsWithVertLine; 
  // 0 = intersects with nothing
  // 1 = intersects with horiz line only
  // 2 = intersects with vert line only
  // 3 = intersects with both lines
}


function intersectingVertLine(x, y) {
  return [Math.round((x - outerRadius) / scalingFactor), Math.round((y - outerRadius) / scalingFactor - 0.5)];
  // [x, y]
}

function intersectingHorizLine(x, y) {
  return [Math.round((x - outerRadius) / scalingFactor - 0.5), Math.round((y - outerRadius) / scalingFactor)];
  // [x, y]
}


function handleMouseClick(x, y) {
  let intersections = intersectsWithLine(x, y);

  if (intersections === 0 || intersections === 3) return

  if (intersections === 2) {
    let [lineX, lineY] = intersectingVertLine(x, y);
    if (vertLineGrid[lineY][lineX] !== 0) return;
    vertLineGrid[lineY][lineX] = currentTurn;
  }
  if (intersections === 1) {
    let [lineX, lineY] = intersectingHorizLine(x, y);
    if (horizLineGrid[lineY][lineX] !== 0) return;
    horizLineGrid[lineY][lineX] = currentTurn;
  }


  let newBox = newCompleteBox();

  if (newBox) {
    let [newBoxX, newBoxY] = newBox;
    boxGrid[newBoxY][newBoxX] = currentTurn;

    newBox = newCompleteBox(); // checking for two filled at once
    if (newBox) {
      [newBoxX, newBoxY] = newBox;
      boxGrid[newBoxY][newBoxX] = currentTurn;
    }
  } else {
    currentTurn = nextTurn();
  }


}



function nextTurn() {
  if (currentTurn < numPlayers) return currentTurn + 1;
  return 1;
}


function boxComplete(boxX, boxY) {
  return (
    horizLineGrid[boxY][boxX] && horizLineGrid[boxY + 1][boxX] && 
    vertLineGrid[boxY][boxX]  && vertLineGrid [boxY][boxX + 1]
  );
}


function newCompleteBox() {
  for (let y=0; y<boxGrid.length; y++) {
    let boxRow = boxGrid[y];
    for (let x=0; x<boxRow.length; x++) {
      if (boxRow[x]) continue;
      if (boxComplete(x, y)) return [x, y];
    }
  }
  return 0;
}


function gameIsOver(boxGrid) {
  for (let boxRow of boxGrid) {
    if (Math.min(...boxRow) === 0) return false;
  }
  return true;
}

function getWinner(boxGrid) {
  let scores = {};
  for (let i=0; i<numPlayers+1; i++) {
    scores[i] = 0;
  }
  for (let boxRow of boxGrid) {
    for (let box of boxRow) {
      scores[box] ++;
    }
  }
  return (Object.values(scores)).indexOf(Math.max(...(Object.values(scores))));
}