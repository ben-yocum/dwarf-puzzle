const CELL_STATUS = {
  black: {
    id: 0,
    color: 'black'
  },
  initialWhite: {
    id: 1,
    color: 'white'
  },
  addedWhite: {
    id: 2,
    color: '#DDDDDD'
  }
}

const INVERTED_CELL_STATUS = Object.entries(CELL_STATUS).reduce((acc, [_, value]) => {
  acc[value.id] = value;
  return acc;
}, {});

class Grid {

  table = document.getElementById('table');

  constructor(data) {
    this.data = data;
    this.height = data.length;
    this.width = data[0].length;
  }

  drawGrid() {
    this.removeAllChildNodes(this.table);

    for (let i = 0; i < this.data.length; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < this.data[i].length; j++) {
        const td = document.createElement('td');
        td.id = `${i}-${j}`;
        td.style.backgroundColor = INVERTED_CELL_STATUS[this.data[i][j]].color;
        td.onclick = (event) => this.tdClicked(event);
        tr.appendChild(td);

        if (j === this.data[i].length - 1) {
          const td = document.createElement('td');
          td.style.border = 'none';
          td.id = `row-${i}`;
          tr.appendChild(td);
        }
      }

      document.getElementById('table').appendChild(tr);

      if (i === this.data.length - 1) {
        const tr = document.createElement('tr');
        for (let j = 0; j < this.data[i].length; j++) {
          const td = document.createElement('td');
          td.style.border = 'none';
          td.id = `col-${j}`;
          tr.appendChild(td);
        }
        document.getElementById('table').appendChild(tr);
      }
    }
  }

  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  tdClicked(event) {
    const [x, y] = event.target.id.split('-');
    if (this.data[x][y] === CELL_STATUS.black.id && numAddedTiles < AVAILABLE_TILES) {
      this.data[x][y] = CELL_STATUS.addedWhite.id;
    }
    this.drawGrid();
    updateStats();
  }

  drawOutline(startX, startY, endX, endY) {
    for (let i = startX; i <= endX; i++) {
      document.getElementById(`${startY}-${i}`).style.borderTop = '1px solid red';
      document.getElementById(`${endY}-${i}`).style.borderBottom = '1px solid red';
    }

    for (let i = startY; i <= endY; i++) {
      document.getElementById(`${i}-${startX}`).style.borderLeft = '1px solid red';
      document.getElementById(`${i}-${endX}`).style.borderRight = '1px solid red';
    }
  }
}

const grid = new Grid([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
  [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1],
  [0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
  [0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
]);

const AVAILABLE_TILES = 17;
let numAddedTiles = 0;

grid.drawGrid();
updateStats();

for (let i = 0; i < grid.height-1; i+=2) {
  grid.drawOutline(0, i, 13, i+1);
}

function updateStats() {
  let blackCount = 0;
  let whiteCount = 0;
  let addedCount = 0;
  const numWhiteInCol = new Array(grid.width).fill(0);
  const numWhiteInRow = new Array(grid.height).fill(0);

  for (let rowIdx = 0; rowIdx < grid.data.length; rowIdx++) {
    const row = grid.data[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const cell = grid.data[rowIdx][colIdx];
      if (cell === CELL_STATUS.black.id) {
        blackCount++;
      } else {
        whiteCount++;
        numWhiteInCol[colIdx]++;
        numWhiteInRow[rowIdx]++;
        if (cell === CELL_STATUS.addedWhite.id) {
          addedCount++;
        }
      }
    }
  }

  document.getElementById('total-black').innerHTML = String(blackCount);
  document.getElementById('total-white').innerHTML = String(whiteCount);
  document.getElementById('total-added').innerHTML = String(addedCount);
  numAddedTiles = addedCount;

  for (let i = 0; i < numWhiteInCol.length; i++) {
    document.getElementById(`col-${i}`).innerHTML = String(numWhiteInCol[i]);
  }

  for (let i = 0; i < numWhiteInRow.length; i++) {
    document.getElementById(`row-${i}`).innerHTML = String(numWhiteInRow[i]);
  }
}

function isWhite(id) {
  return id === CELL_STATUS.initialWhite.id || id === CELL_STATUS.addedWhite.id;
}
