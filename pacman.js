// class Pacman {
  // constructor(x, y, type) {
  //   // debugger
  //   this.x = x;
  //   this.y = y;
  //   this.type = type;
  //   this.overlap = true;
  //   this.moving = false;
  //   this.toX = 0;
  //   this.toY = 0;
  //   this.speed = 0.2;
  // }
  //
  // updatePacman () {
  //   // debugger
  //   // let tileX = Math.floor(this.x);
  //   // let tileY = Math.floor(this.y);
  //   let tile = getTile(this.toX, this.toY);
  //   let tileType = tile.type;
  //   if (tile.overlap) {
  //     switch (tileType) {
  //       case 'COOKIE':
  //       score++;
  //       tile.overlap = false;
  //       break;
  //       case 'REWARD':
  //       score += 10;
  //       tile.overlap = false;
  //       break;
  //     }
  //   }
//   }
//
//
// }






function handlePacman () {
  // debugger
  if (keyIsDown(UP_ARROW)) {
  return pacman.move(0, - 1, true)
  } else if (keyIsDown(DOWN_ARROW)) {
    return pacman.move(0, 1, true)
  } else if (keyIsDown(LEFT_ARROW)) {
    return pacman.move(-1, 0, true)
  } else if (keyIsDown(RIGHT_ARROW)) {
    return pacman.move(1, 0, true)
  }
}
