const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

let running = false;
let snaekMove;
let hScore = document.querySelector(".hScore");
let currentHigh = 0;
let scoreScreen = document.querySelector(".score");

let startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", function () {
    if (running) return;
    running = true;
    hScore.textContent = currentHigh;
    reset();
    scoreScreen.textContent = score;
    drawSnake();
    clearInterval(snaekMove);
    snaekMove = setInterval(snakeMove, speed);
});


let snake = [{
        x: 150,
        y: 150
    },
    {
        x: 140,
        y: 150
    },
    {
        x: 130,
        y: 150
    },
    {
        x: 120,
        y: 150
    },
    {
        x: 110,
        y: 150
    },
]

let food = {
    x: 50,
    y: 40
}

let snakeDirection = {
    up: false,
    right: true,
    down: false,
    left: false
}

let newX = 10;
let newY = 0;
let score = 0;
let speed = 80;

document.addEventListener("keydown", function (e) {

    let key = e.code;

    if (key === "ArrowUp" && snakeDirection.down !== true) {

        newX = 0
        newY = -10
        resetDirection("up", snakeDirection)


    } else if (key === "ArrowRight" && snakeDirection.left !== true) {

        newX = 10;
        newY = 0;
        resetDirection("right", snakeDirection)

    } else if (key === "ArrowDown" && snakeDirection.up !== true) {

        newX = 0;
        newY = 10;
        resetDirection("down", snakeDirection);

    } else if (key === "ArrowLeft" && snakeDirection.right !== true) {

        newX = -10;
        newY = 0;
        resetDirection("left", snakeDirection);
    }
})

function resetDirection(direction, obj) {

    for (let key in obj) {
        obj[key] = false
    }
    obj[direction] = true;
}

function reset() {
    snake = [{
            x: 150,
            y: 150
        },
        {
            x: 140,
            y: 150
        },
        {
            x: 130,
            y: 150
        },
        {
            x: 120,
            y: 150
        },
        {
            x: 110,
            y: 150
        },
    ]
    score = 0;

    speed = 80;
    snakeDirection = {
        up: false,
        right: true,
        down: false,
        left: false
    }

    newX = 10;
    newY = 0;

}

function snakeMove() {
    // Put a "head" first and make first obj in snake arr. make 10px in the right direction of movement.
    let head = {
        x: snake[0].x + newX,
        y: snake[0].y + newY,
    }

    if (snake[0].x > 590 || snake[0].x < 0) {
        console.log("He ded");
        clearInterval(snaekMove);
        renderLoss();
        if (score > currentHigh) {
            currentHigh = score;
        }
        running = false;

    } else if (snake[0].y > 590 || snake[0].y < 0) {
        console.log("He ded");
        clearInterval(snaekMove);
        renderLoss();
        if (score > currentHigh) {
            currentHigh = score;
        }
        running = false;

    }
    snake.unshift(head);
    snake.pop();
    checkCollision();
    drawSnake();
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(snaekMove);
            renderLoss();
            console.log("collision");
            if (score > currentHigh) {
                currentHigh = score;
            }
            running = false;
        } else if (snake[0].x === food.x && snake[0].y === food.y) {
            score += 1;
            scoreScreen.textContent = score;
            console.log(score);
            food.x = (Math.round(Math.random() * 50)) * 10;
            food.y = (Math.round(Math.random() * 50)) * 10;
            snake.push({
                x: snake[snake.length - 1].x,
                y: snake[snake.length - 1].y
            })
            if (score % 3 === 0) {
                if (score < 55) {
                    speed -= 3;
                } else speed -= 0;

                clearInterval(snaekMove);

                snaekMove = setInterval(snakeMove, speed);
            }
            console.log(speed);
        }
    }
}

function drawSnake() {
    ctx.clearRect(0, 0, 600, 600);
    for (let obj in snake) {
        ctx.fillStyle = 'lightgreen';
        ctx.strokestyle = 'darkgreen';
        ctx.strokeRect(snake[obj].x, snake[obj].y, 10, 10);
        ctx.fillRect(snake[obj].x, snake[obj].y, 10, 10);
    }
    spawnFood();
}

function spawnFood() {
    food.x;
    food.y;
    ctx.fillStyle = 'purple';
    ctx.strokestyle = 'darkpurple';
    ctx.strokeRect(food.x, food.y, 10, 10);
    ctx.fillRect(food.x, food.y, 10, 10);
}

function renderLoss() {
    let body = document.body;
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    body.appendChild(overlay);
    let h3 = document.createElement("h3");
    h3.textContent = "YOU DIED";
    h3.className = "lossScreen";
    body.appendChild(h3);

    setTimeout(() => {
        body.removeChild(overlay);
        body.removeChild(h3);
    }, 1500)
}