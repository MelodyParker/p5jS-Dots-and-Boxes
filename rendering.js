function dotPos(dotX, dotY) {
  return [dotDiameter / 2 + outerRadius + scalingFactor * dotX, dotDiameter / 2 + outerRadius +  scalingFactor * dotY]
}

function drawDots(horizDimension, vertDimension) {
  push();
  fill(dotColor);
  noStroke()
  for (let i=0; i<horizDimension + 1; i++) {
    for (let j=0; j<vertDimension + 1; j++) {
      let [dotPosX, dotPosY] = dotPos(i, j);
      ellipse(dotPosX, dotPosY, dotDiameter, dotDiameter);
    }
  }
  pop();
}

function drawLines(horizLineGrid, vertLineGrid) {
  push();
  strokeWeight(lineThickness);

  // draw horizLineGrid
  for (let y=0; y<horizLineGrid.length; y++) {
    let row = horizLineGrid[y];
    for (let x=0; x<row.length; x++) {
      let playerInControl = row[x];
      [startPosX, startPosY] = dotPos(x, y);
      [endPosX, endPosY] = dotPos(x + 1, y);
      stroke(playerLineColors[playerInControl]);
      line(startPosX, startPosY, endPosX, endPosY);
    }
  }


  // draw vertLineGrid 
  for (let y=0; y<vertLineGrid.length; y++) {
    let row = vertLineGrid[y];
    for (let x=0; x<row.length; x++) {
      let playerInControl = row[x];
      [startPosX, startPosY] = dotPos(x, y);
      [endPosX, endPosY] = dotPos(x, y + 1);
      stroke(playerLineColors[playerInControl]);
      line(startPosX, startPosY, endPosX, endPosY);
    }
  }

  pop();
}


function drawHoveredLine(x, y) {
  // if (x >= scalingFactor * horizDimension || y >= scalingFactor * vertDimension) return;
  push()
  strokeWeight(lineThickness);
  stroke(playerHoverColors[currentTurn]);


  let intersections = intersectsWithLine(x, y);

  if (intersections === 0 || intersections === 3) return

  if (intersections === 2) {
    let [lineX, lineY] = intersectingVertLine(x, y);
    if ((lineX > horizDimension + 1 || lineY > vertDimension) || vertLineGrid[lineY][lineX] !== 0) return;

    [startPosX, startPosY] = dotPos(lineX, lineY);
    [endPosX, endPosY] = dotPos(lineX, lineY + 1);
  }
  if (intersections === 1) {
    let [lineX, lineY] = intersectingHorizLine(x, y);
    if (horizLineGrid[lineY][lineX] !== 0) return;
    [startPosX, startPosY] = dotPos(lineX, lineY);
    [endPosX, endPosY] = dotPos(lineX + 1, lineY);
  }

  line(startPosX, startPosY, endPosX, endPosY);
  cursor(HAND)
  pop()
}

function renderBoxes(boxGrid) {
  push();
  noStroke();
  for (let y=0; y<boxGrid.length; y++) {
    let boxRow = boxGrid[y];
    for (let x=0; x<boxRow.length; x++) {
      fill(playerBoxColors[boxRow[x]]);
      let [drawX, drawY] = dotPos(x, y);
      rect(drawX, drawY, scalingFactor, scalingFactor);
    }
  }
  pop();
}