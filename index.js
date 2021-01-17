//Developed by Rajat Kaushik.

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio
const dead = new Audio();
const dead2 = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
dead2.src = "audio/dead2.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create snake

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

//food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

//score
let score = 0;

//control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event) {
  key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    d = "LEFT";
    left.play();
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}

//check collision
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

//draw everything on canvas
function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#3a6b16";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "lightgreen";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  //if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  }
  //we don't remove the tail
  else {
    //remove tail
    snake.pop();
  }

  //add new Head
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //game over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
    dead2.play();
    document.querySelector(".gameover").classList.remove("hidden");
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "40px Lato";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

//call draw func every 100ms
let game = setInterval(draw, 80);
