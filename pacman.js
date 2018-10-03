class Pacman {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}






function handlePacman () {
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
