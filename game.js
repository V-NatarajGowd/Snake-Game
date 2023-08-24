import { update as updatesnake, draw as drawsnake, SNAKE_SPEED } from "./snake.js"
import {update as updatefood, draw as drawfood} from "./food.js"
import { getSnakehead, snakeIntersection } from "./snake.js"
import { outsideGrid } from "./grid.js"

const gameBoard = document.getElementById("snakeboard")
let lastRenderTime = 0
let gameOver = false

function main(currentTime){
    if (gameOver){
        if (confirm("You Lost. Press Ok to restart")){
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondSinceLastRender = (currentTime - lastRenderTime)/ 1000
    if (secondSinceLastRender < 1/SNAKE_SPEED) return

    lastRenderTime = currentTime
    update()
    draw()
}

window.requestAnimationFrame(main)

function draw(){
    gameBoard.innerHTML = ""
    drawsnake(gameBoard)
    drawfood(gameBoard)
}

function update(){
    updatesnake()
    updatefood()
    checkDeath()
}

function checkDeath() {
    gameOver = outsideGrid(getSnakehead()) || snakeIntersection() 
}