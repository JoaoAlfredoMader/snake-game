let canvas;
let context;
let box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let gameSpeed = 150;
let direction = "right";
let snakeX = snake[0].x;
let snakeY = snake[0].y;
let gameInterval;
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

document.addEventListener('keydown', update);

function setup() {
    canvas = document.getElementById('meuCanvas');

    context = canvas.getContext('2d');

    document.addEventListener('keydown', update);

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    document.addEventListener('keydown', update);

}

function createBG() {
    context.fillStyle = "lightgreen";

    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood() {
    if (snakeX === food.x && snakeY === food.y) {
        snake.unshift({ x: snakeX, y: snakeY });

        food = generateRandomFoodPosition();
    }

    while (
        food.x < 1 * box || food.x > 15 * box ||
        food.y < 3 * box || food.y > 17 * box ||
        snake.some(part => part.x === food.x && part.y === food.y)
    ) {
        food = generateRandomFoodPosition();
    }

    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function generateRandomFoodPosition() {
    const x = Math.floor(Math.random() * 15 + 1) * box;
    const y = Math.floor(Math.random() * 13 + 3) * box;
    return { x, y };
}

function startGame() {
    console.log('Game started!');

    gameInterval = setInterval(() => {
        updateGame();  
        render(); 
    }, gameSpeed); 

}

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    else if (event.keyCode == 38 && direction != "down") direction = "up";
    else if (event.keyCode == 39 && direction != "left") direction = "right";
    else if (event.keyCode == 40 && direction != "up") direction = "down";
}

function updateGame() {
    console.log('Updating game...');

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    if (direction === "right") snakeX += box;
    if (direction === "left") snakeX -= box;
    if (direction === "up") snakeY -= box;
    if (direction === "down") snakeY += box;

    if (snakeX >= 16 * box) snakeX = 0;
    if (snakeX < 0) snakeX = 16 * box - box;
    if (snakeY >= 16 * box) snakeY = 0;
    if (snakeY < 0) snakeY = 16 * box - box;

    if (snakeX === food.x && snakeY === food.y) {
        snake.unshift({ x: snakeX, y: snakeY });

        food = generateRandomFoodPosition();
    } else {
        snake.pop();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            // Game Over
            alert("Game Over!");
            clearInterval(gameInterval);
            return;
        }
    }

    // Cria uma nova cabeça para a cobrinha
    let newHead = { x: snakeX, y: snakeY };

    // Adiciona a nova cabeça à primeira posição da array snake
    snake.unshift(newHead);
}

function render() {
    console.log('Rendering game...');

    createBG();
    createSnake();
    createFood();
}

function gameLoop() {
    updateGame();  
    render(); 
    requestAnimationFrame(gameLoop);
}

  

window.onload = function () {
    setup();

    startGame();
};
