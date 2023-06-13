const board = document.querySelector(".board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highScore");
const foodSound = new Audio('food.mp3');
const gameEnd = new Audio('end.mp3');
const moveSound = new Audio('move.mp3');

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
    snakeY = 19;
let snakeBody = [];
let velocityX = 0,
    velocityY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFood = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! press ok to Restart");
    location.reload();

}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        moveSound.play();
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        moveSound.play();
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        moveSound.play();
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        moveSound.play();
    }

}
const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class= "food" style="grid-area:${foodY} /${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFood();
        foodSound.play();
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score :
            highScore;
        localStorage.setItem("highScore", highScore)
        scoreElement.innerText = `Score: ${score}`;


    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]

    }
    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
        gameEnd.play();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class= "head" style="grid-area:${snakeBody[i][1]} /${snakeBody[i][0]}"></div>`;

        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
            gameEnd.play();
        }

    }


    board.innerHTML = htmlMarkup;
}
changeFood();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection)