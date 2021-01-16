function startDino(){
  document.getElementById('information').style.display = 'none';
  document.getElementById('background-dino').style.display = 'block';
  document.getElementById('dino').style.display = 'block';
  document.getElementById('score').style.display = 'block';
  character = document.querySelector('.dino');
  backgroundType = document.querySelector(".background-dino");

  obstacleType = 'cactus';

  createObstacle();
  document.addEventListener("keyup", handlerKeyUp, true);
  document.addEventListener("keydown", handlerKeyDown, true);
}
function startHero(){
  document.getElementById('information').style.display = 'none';
  document.getElementById('background-hero').style.display = 'block';
  document.getElementById('hero').style.display = 'block';
  document.getElementById('score').style.display = 'block';
  character = document.querySelector('.hero');
  backgroundType = document.querySelector(".background-hero");
  obstacleType = 'enemie';

  createObstacle(); 
  document.addEventListener("keyup", handlerKeyUp, true);
  document.addEventListener("keydown", handlerKeyDown, true);
}
function reload(){
  document.location.reload();
}

var character;
var obstacleType;
var backgroundType;

let positionY = 0;
let positionX = 10;
let isJumping = false;
let isGameOver = false;
let score = 0;

function handlerKeyUp(event) {
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (!isJumping) jump();
  }
}
function handlerKeyDown(event) {
  if (event.keyCode == 37) backward();
  else if (event.keyCode == 39) forward();
}
function jump() {
  console.log("JUMP!");
  isJumping = true;
  let upInterval = setInterval(() => {
    if (positionY >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (positionY <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          positionY -= 20;
          character.style.bottom = positionY + "px";
        }
      }, 45);
    } else {
      positionY += 20;
      character.style.bottom = positionY + "px";
    }
  }, 35);
}
function forward() {
  console.log("FORWARD!");
  if (positionX <= document.body.clientWidth) {
    positionX += 10;
    character.style.left = positionX + "px";
  }
}
function backward() {
  console.log("BACKWARD!");
  if (positionX > 10) {
    positionX -= 10;
    character.style.left = positionX + "px";
  }
}
function createObstacle() {
  const obstacle = document.createElement("div");
  let obstaclePosition = 1000;
  let randomTime = Math.random() * 6000;

  if(isGameOver) return;

  obstacle.classList.add(obstacleType);
  backgroundType.appendChild(obstacle);
  obstacle.style.left = obstaclePosition + "px";

  let leftInterval = setInterval(() => {
    if (obstaclePosition < -60) {
        clearInterval(leftInterval);
        backgroundType.removeChild(obstacle);
        
        score += 100;
        console.log("SCORE ++", score);
        document.getElementById("score").innerHTML = `SCORE ( ${score} )`
    } else if (obstaclePosition > 0 && obstaclePosition == positionX && positionY < 50){
        clearInterval(leftInterval);
        isGameOver = true;
        document.body.innerHTML = `
        <h1 class="game-over"> Game Over </h1>
            <h2 id="finalScore" class="text-center"> FINAL SCORE ( ${score} )</h2>
            <div class="col-md-12 div-button text-center">
                <button type="button" onclick="reload()" class='botao'>Restart Game <i class="fas fa-redo-alt"></i></button>
            </div>`;
        
    } else {
      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + "px";
    }
  }, 35);

  setTimeout(createObstacle, randomTime);
}



