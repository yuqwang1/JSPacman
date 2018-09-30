function handlePacman () {
  if (keyIsDown(UP_ARROW)) {
  return pacman.move(0, - 1)
  } else if (keyIsDown(DOWN_ARROW)) {
    return pacman.move(0, 1)
  } else if (keyIsDown(LEFT_ARROW)) {
    return pacman.move(-1, 0)
  } else if (keyIsDown(RIGHT_ARROW)) {
    return pacman.move(1, 0)
  }
}
