const TYPES = ["WALL", "EMPTY", "COOKIE", "REWARD", "GHOST", "PACMAN"]
const XDIMENSION = 28;
const YDIMENSION = 31;
const TILE_SPEED = 0.2;
const TILE_SIZE = 25;
let ghostImg, pacImg, cherryImg;



class Tile {
  constructor (x, y, type, ghost_id) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.moving = false;
    this.toX = 0;
    this.toY = 0;
    this.speed = 0.2;
    this.overlap = true;
    this.ghost_id = ghost_id;
    this.last_move = [[0,0]];
    this.direction = '';
  }



  draw() {
    const tileLength = this.x * TILE_SIZE;
    const tileHeight = this.y * TILE_SIZE;

    switch (this.type) {
      case "WALL":
        stroke(0);
        strokeWeight(2);
        fill("#6495ED");
        rect(tileLength, tileHeight, TILE_SIZE * 4 / 5, TILE_SIZE * 4 / 5);
        break;
      case "EMPTY":
        break;
      case "COOKIE":
        noStroke();
        strokeWeight(5);
        fill(255);
        ellipse(tileLength + TILE_SIZE / 2.5, tileHeight + TILE_SIZE / 2.5, TILE_SIZE / 4);
        break;
      case "REWARD":
        // cherryImg = createImg('./img/cherry.png');
        // cherryImg.position(-10000,-1000);
        // image(cherryImg, tileLength, tileHeight, TILE_SIZE * 4 / 5, TILE_SIZE * 4 / 5);
        stroke("#F0FFFF");
        strokeWeight(1);
        fill("#DC143C");
        ellipse(tileLength + TILE_SIZE / 2.5, tileHeight + TILE_SIZE / 2.5, TILE_SIZE / 2);
        break;
      case "GHOST":
        // ghostImg = createImg('./img/ghost_r1.png');
        // ghostImg.position(-10000,-1000);
        // image(ghostImg, tileLength, tileHeight, TILE_SIZE * 4 / 5, TILE_SIZE * 4 / 5);
        fill("#FF00EE");
        stroke(0);
        strokeWeight(1);

        beginShape();
        vertex(tileLength + TILE_SIZE / 2, tileHeight + TILE_SIZE / 8);
        vertex(tileLength + TILE_SIZE / 4, tileHeight + (TILE_SIZE / 4 * 3));
        vertex(tileLength + (TILE_SIZE / 4 * 3), tileHeight + (TILE_SIZE / 4 * 3));
        endShape(CLOSE);
        break;
      case "PACMAN":
        // image(pacImg, tileLength, tileHeight, TILE_SIZE * 4 / 5, TILE_SIZE * 4 / 5)
      if (keyIsDown(UP_ARROW)) {
          pacImg = createImg('./img/pacman_up.png');
          pacImg.position(-1000,-1000);
          image(pacImg, tileLength, tileHeight, TILE_SIZE * 4 / 5, TILE_SIZE * 4 / 5);
        } else if (keyIsDown(DOWN_ARROW)) {
          pacImg = createImg('./img/pacman_down.png');
          pacImg.position(-1000,-1000);
          image(pacImg, tileLength, tileHeight, TILE_SIZE * 4 / 5, TILE_SIZE * 4 / 5);
        } else if (keyIsDown(LEFT_ARROW)) {
          pacImg = createImg('./img/pacman_left.png');
          pacImg.position(-1000,-1000);
          image(pacImg, tileLength, tileHeight, TILE_SIZE * 4 / 5, TILE_SIZE * 4 / 5);
        } else if (keyIsDown(RIGHT_ARROW)) {
          pacImg = createImg('./img/pacman_right.png');
          pacImg.position(-1000,-1000);
          image(pacImg, tileLength, tileHeight, TILE_SIZE * 4 / 5, TILE_SIZE * 4 / 5);
      } else {
        fill('#FFFF00');
        noStroke();
        ellipse(tileLength + TILE_SIZE / 2.5, tileHeight + TILE_SIZE / 2.5, TILE_SIZE /10 * 8);
        fill(51);
      }





        // pac.position(50,100);

        // triangle(tileLength + TILE_SIZE / 2.5, tileHeight + TILE_SIZE / 2.5,)
        // let p = new Pacman();
        // p.display();
        break;
    }
  }

  updateTile () {
    if (!this.overlap){
      return;
    }
    if (this.moving) {
      this.x = lerp(this.x, this.toX, this.speed);
      this.y = lerp(this.y, this.toY, this.speed);
      if (Math.abs(this.x - this.toX) < 0.2 && Math.abs(this.y - this.toY) < 0.2) {
        this.x = this.toX;
        this.y = this.toY;
        this.moving = false;
      }
    }
    if (this.type === 'PACMAN') {
      let tileX = Math.floor(this.x);
      let tileY = Math.floor(this.y);
      let tile = getTile(tileX, tileY);
      let tileType = tile.type;
      if (tile.overlap) {
        switch (tileType) {
          case 'COOKIE':
          score++;
          tile.overlap = false;
          break;
          case 'REWARD':
          score += 10;
          tile.overlap = false;
          break;
     }
    }
  } else if (this.type === 'GHOST'){
    let dist_ghost_pac = dist(pacman.x, pacman.y, this.x, this.y);
    if (dist_ghost_pac < 0.3) {
      return winGame(false);
    }
    if (this.moving){
      return;
    }
    let possibleMoves = [
      getTile(this.x - 1, this.y),
      getTile(this.x + 1, this.y),
      getTile(this.x, this.y - 1),
      getTile(this.x, this.y + 1),
    ]

    let possibleMovesResult = [];

    for (let i = 0; i < 4; i++) {
      if (possibleMoves[i].type !== 'WALL' && possibleMoves[i] !== this.last_move[this.last_move.length - 1]) {
        possibleMovesResult.push(possibleMoves[i]);
      }
    }
    if(possibleMovesResult.length === 0) {

    }
    // debugger
    //
    possibleMovesResult.sort(function (a, b) {
      let aDist = dist(a.x, a.y, pacman.x, pacman.y);
      let bDist = dist(b.x, b.y, pacman.x, pacman.y);
      return aDist - bDist;
    })
    // console.log("hello1");
    if (this.ghost_id === 0) {
      // console.log("hello2");
      this.move(possibleMovesResult[0].x, possibleMovesResult[0].y, false);
      this.last_move.push(possibleMovesResult[0]);
      // for (let i = 0; i < possibleMovesResult.length; i++) {
          // if ()) {
        //   break;
        // }
      // }
    } else {
      // console.log("hello3");
      // return;
      let index = Math.floor(random(possibleMovesResult.length));
      this.move(possibleMovesResult[index].x, possibleMovesResult[index].y, false);
      this.last_move.push(possibleMovesResult[index]);
    }

    // let index = Math.floor(random(3.99));
    // this.move(possibleMoves[index].x, possibleMoves[index].y, false);
  }
  if (score === 391) {
    winGame(true);
  }

}


  move (x, y, relative) {
    let endX, endY;
    if (relative) {
      endX = this.x + x;
      endY = this.y + y;
    } else {
      endX = x;
      endY = y;
    }

    if (this.moving) {
      return false;
    }

    let toTile = getTile(endX, endY);
    if (!toTile){
      return;
    }
    // debugger
    // console.log(`${index}`)
    // console.log(`${toTile}`)
    let toTileType = toTile.type;
    if ((toTileType === 'WALL' && this.type != 'WALL') || (toTileType === 'GHOST' && this.type === 'GHOST')) {
      // console.log("you can not move");
      return false;
    }
    this.moving = true;
    this.toX = endX,
    this.toY = endY;
    return true
  }
}

function parseTileType(n) {
    switch (n) {
      case "0":
        return "WALL";
      case "1":
        return "COOKIE";
      case "2":
        return "REWARD";
      case "3":
        return "EMPTY";
      case "4":
        return "GHOST";
      case "5":
        return "PACMAN";
    }
  }

  function getTile(x, y) {
    let index =y * XDIMENSION + x
    return result = field[index];


  }
