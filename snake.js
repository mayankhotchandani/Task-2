const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
const ghostImg = new Image();
ghostImg.src = "img/pokemon.png";

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/pokeball.png";

// create the ghost

let ghost = [];

ghost[0] = {
  x: 9 * box,
  y: 10 * box,
};

// create the food

let food = {
  x: Math.floor(Math.random() * 18 + 1) * box,
  y: Math.floor(Math.random() * 16 + 3) * box,
};
let food1 = {
  x: Math.floor(Math.random() * 18 + 1) * box,
  y: Math.floor(Math.random() * 16 + 3) * box,
};
let food2 = {
  x: Math.floor(Math.random() * 18 + 1) * box,
  y: Math.floor(Math.random() * 16 + 3) * box,
};

// create the score var

let score = 0;

//control the ghost

let d;

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37) {
    d = "LEFT";
  } else if (key == 38) {
    d = "UP";
  } else if (key == 39) {
    d = "RIGHT";
  } else if (key == 40) {
    d = "DOWN";
  }
}

// cheack collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything to the canvas

function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < 1; i++) {
    ctx.drawImage(ghostImg, ghost[i].x, ghost[i].y, box, box);
  }

  ctx.beginPath();
  ctx.lineWidth = "32";
  ctx.strokeStyle = "red";
  ctx.rect(16, 80, 608, 544);
  ctx.stroke();

  ctx.drawImage(foodImg, food.x, food.y);
  ctx.drawImage(foodImg, food1.x, food1.y);
  ctx.drawImage(foodImg, food2.x, food2.y);

  // old head position
  let ghostX = ghost[0].x;
  let ghostY = ghost[0].y;

  // which direction
  if (d == "LEFT") ghostX -= box;
  if (d == "UP") ghostY -= box;
  if (d == "RIGHT") ghostX += box;
  if (d == "DOWN") ghostY += box;

  // if the ghost eats the food
  if (ghostX == food.x && ghostY == food.y) {
    score++;

    food = {
      x: Math.floor(Math.random() * 18 + 1) * box,
      y: Math.floor(Math.random() * 16 + 3) * box,
    };
  }
  if (ghostX == food1.x && ghostY == food1.y) {
    score++;

    food1 = {
      x: Math.floor(Math.random() * 18 + 1) * box,
      y: Math.floor(Math.random() * 16 + 3) * box,
    };
  }
  if (ghostX == food2.x && ghostY == food2.y) {
    score++;

    food2 = {
      x: Math.floor(Math.random() * 18 + 1) * box,
      y: Math.floor(Math.random() * 16 + 3) * box,
    };
  }

  // add new Head

  let newHead = {
    x: ghostX,
    y: ghostY,
  };

  // game over

  if (
    ghostX < box ||
    ghostX > 18 * box ||
    ghostY < 3 * box ||
    ghostY > 18 * box
  ) {
    clearInterval(game);
    ctx.fillStyle = "Red";
    ctx.font = "45px Changa one";
    ctx.fillText("GAME OVER", 6 * box, 10 * box);
  }

  ghost.unshift(newHead);

  ctx.fillStyle = "Black";
  ctx.font = "45px Changa one";
  ctx.fillText("Score:" + score, 8 * box, 1.6 * box);
}

// call draw function every 500 ms

let game = setInterval(draw, 500);
