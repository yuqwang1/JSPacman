let field = [];
let ghosts = [];
let pacX, pacY, pacman, score;
let MAP = [
  '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
  '0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0',
  '0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0',
  '0,1,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0',
  '0,1,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,0,0,1,0',
  '0,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,2,1,1,0',
  '0,1,0,0,1,0,0,0,0,1,0,0,2,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0',
  '0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0',
  '0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0',
  '0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0',
  '0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0',
  '1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1',
  '0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0',
  '0,0,0,1,0,0,0,0,0,1,0,3,4,3,4,3,3,0,1,0,0,0,0,0,1,0,0,0',
  '1,1,1,1,1,1,1,1,1,1,0,3,4,3,4,3,3,0,1,1,1,1,1,1,1,1,1,1',
  '0,0,0,1,0,0,1,0,0,1,0,3,3,3,3,3,3,0,1,0,0,1,0,0,1,0,0,0',
  '0,0,0,1,0,0,1,0,0,1,0,0,3,3,3,3,0,0,1,0,0,2,0,0,1,0,0,0',
  '0,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,0',
  '0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0',
  '0,1,0,0,0,0,1,0,0,0,0,0,2,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0',
  '0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0',
  '0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0',
  '0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0',
  '0,1,1,1,0,0,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0,0,1,1,1,0',
  '0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0',
  '0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0',
  '0,1,1,2,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,2,1,1,0',
  '0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0',
  '0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0',
  '0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,2,1,1,1,1,0',
  '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',

]
// function preload() {
//   // pacImg = loadImage('http://bdfjade.com/data/out/96/6014329-pacman-pictures.png');
//
// }

function setup () {
  createCanvas(700, 800);
  field = generateField();
  score = 0;
}

function draw () {
  background(51);
  // image(pacImg, 1, 1, 100, 100);
  for (let i = 0; i < field.length; i++) {
    if (field[i].overlap) {
      field[i].updateTile();
      field[i].draw();
    }
  }

  pacman.updateTile();
  pacman.draw();
  for (let j = 0; j < ghosts.length; j++) {
    ghosts[j].updateTile();
    ghosts[j].draw();
  }

  noStroke(0);
  fill(255);
  textSize(30);
  text("SCORE: " + score, 5, height - 5);
  handlePacman();
}

function winGame(won) {
  if (won) {
    text("Congradulation! You win", width / 3, height / 2)
  } else {
    text("Your lose! Please try again ", width / 3, height / 2)
  }
  text("Press enter to restart", width /3, height / 2 + 50)
  noLoop();
}



function generateField () {
  let ghost_id = 0;
  for (let i = 0; i < MAP.length; i++) {
    let row = MAP[i].split(',')
    for (let j = 0; j < row.length; j++) {
    let type = parseTileType(row[j]);
    let tile = new Tile(j,i,type, null);
    let empty_tile = new Tile(j, i, 'EMPTY', null);
    if (type === 'PACMAN') {
      pacman = tile;
      field.push(empty_tile)
    } else if (type === 'GHOST') {
      field.push(new Tile(j, i, 'GHOST', ghost_id));
      // field.push(empty_tile);
      ghost_id++;
    } else if (type === 'WALL' || type === 'EMPTY' || type === 'REWARD' || type === 'COOKIE') {
      field.push(tile);
      }
    }
  }
   return field;
}
