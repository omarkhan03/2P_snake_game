import { getInputDirection } from "./input.js"
import { onP2, P2Body } from "./playerTwo.js"

export const SNAKE_SPEED = 15 //moves this many times per second
export const snakeBody = [ 
  { x: 25, y: 4 },
]
let newSegments = 0

export function update() {
  addSegments()

  const inputDirection = getInputDirection()
  for (let i = snakeBody.length -2; i>=0; i--) {
    snakeBody[i+1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
  newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

export function getSnakeHead() {
  return snakeBody[0]
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true }) || onP2(snakeBody[0], { ignoreHead: false })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments=0
}

export function teleportSnake() {
  let oldPos = snakeBody[0]

  switch(oldPos.x) {
    case 0:
      snakeBody[0] = { x: 42, y: oldPos.y }
      break
    case 43:
      snakeBody[0] = { x: 1, y: oldPos.y }
      break

    default:

      switch(oldPos.y) {
        case 0:
          snakeBody[0] = { x: oldPos.x, y: 42 }
          break
        case 43:
          snakeBody[0] = { x: oldPos.x, y: 1 }
          break
      }
  }
}