var cnv;
var grid, maze;
var drawBtn, instantBtn, colorBtn, dimSlider;
let current;
let done;
let currentGrid;
let stack = [];
let DIM;
let winSize;
let w;

function setup() {
  winSize = min(windowWidth, windowHeight) - 100;
  cnv = createCanvas(winSize, winSize);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  // frameRate(10);
  drawBtn = createButton("draw");
  instantBtn = createButton("instant");
  colorBtn = createCheckbox("color", true);
  dimSlider = createSlider(10, 100, 40, 1);
  currentGrid = "grid";
  done = false;
  DIM = dimSlider.value();
  colorBtn.style("color: white;");
  drawBtn.mousePressed(() => {
    remakeGrid();
    currentGrid = "grid";
  });
  instantBtn.mousePressed(() => {
    currentGrid = "instant";
    maze = generateMaze();
  });

  w = width / DIM;
  remakeGrid();
  maze = generateMaze();
  current = grid[floor(DIM / 2)][floor(DIM / 2)];
}

function remakeGrid() {
  grid = new Array(DIM);
  for (let i = 0; i < DIM; i++) {
    grid[i] = new Array(DIM);
    for (let j = 0; j < DIM; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
}

function draw() {
  // draw grid
  if (DIM != dimSlider.value()) {
    DIM = dimSlider.value();
    w = width / DIM;
    remakeGrid();
    current = grid[floor(DIM / 2)][floor(DIM / 2)];
    maze = generateMaze();
    done = false;
  }
  clear();
  background(255);
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      if (currentGrid === "grid") {
        grid[j][i].show();
      } else if (currentGrid === "instant") {
        maze[j][i].show();
      }
    }
  }

  if (!done) {
    current.visited = true;
    let next = current.checkNeighbors(grid);
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      done = true;
    }
  }
}

function removeWalls(a, b) {
  var x = a.j - b.j;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.i - b.i;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
