import { getinputDirection } from "./input.js"
export const SNAKE_SPEED = 5

const snakeBody = [{x : 11, y: 11}] 
let newSegment = 0

export function update(){
    addSegements()
    const inputDirection = getinputDirection()
    for (let i = snakeBody.length - 2 ; i >= 0; i-- ){
        snakeBody[i+1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
    if (snakeBody[0].x == 22){
        snakeBody[0].x = 1
    }
    if (snakeBody[0].x == 0){
        snakeBody[0].x = 21
    }
    if (snakeBody[0].y == 22){
        snakeBody[0].y = 1
    }
    if (snakeBody[0].y == 0){
        snakeBody[0].y = 21
    }
}

export function draw(gameBoard){
    snakeBody.forEach(segment =>{
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount){
    newSegment += amount
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment,index)=>{
        if (ignoreHead && index === 0) return false
        return equalposition(segment,position)
    })
}

function equalposition(pos1,pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegements(){
    for (let i = 0; i < newSegment; i++){
        console.log(i)
        snakeBody[snakeBody.length] = ({ ...snakeBody[snakeBody.length - 1]})
    }
    newSegment = 0
}

export function getSnakehead(){
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}