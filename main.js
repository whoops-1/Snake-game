let board = document.querySelector(".board")
let time = document.querySelector(".tspan")
let scoreDiv = document.querySelector(".sspan")
let highScoreDiv = document.querySelector(".hspan")
let restart = document.querySelector(".restart")
let reTimeout;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") ? parseInt(localStorage.getItem("snakeHighScore")) : 0;
highScoreDiv.innerHTML = highScore;

let obj = {
    boardHeight: board.clientHeight,
    boardWidth: board.clientWidth,
};

let size = 40
let rows = Math.floor(obj.boardHeight / size);
let cols = Math.floor(obj.boardWidth / size)

let blocks = []
let snake = [
    {y: 0, x: 0},
];

let food = {};
let direction = "right";
let nextDirection = "right";
let intervalId = null;

let gif = new Image();
gif.src = './8de28f51a3083491685bca61f9ace241.gif';

function loadGif() {
  document.getElementById('gover').src = gif.src;
}

function unloadGif() {
  document.getElementById('gover').src = '';
}

function restartGif() {
  gif.src = './8de28f51a3083491685bca61f9ace241.gif';
  document.getElementById('gover').src = gif.src;
}


// Create blocks
for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        blocks[ `${row}-${col}` ] = block
    }
}

function getRandomFoodPosition() {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };
    } while(snake.some(segment => segment.x === pos.x && segment.y === pos.y));
    return pos;
}

function render() {
    // Remove previous snake and food classes
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            blocks[`${row}-${col}`].classList.remove("fill", "food");
        }
    }

    // Draw food
    blocks[`${food.y}-${food.x}`].classList.add("food");

    // Draw snake
    snake.forEach(segment => {
        blocks[`${segment.y}-${segment.x}`].classList.add("fill");
    });
}

function moveSnake() {
    // Update direction, avoid instant reversal
    if (
        (nextDirection === "left"  && direction !== "right") ||
        (nextDirection === "right" && direction !== "left") ||
        (nextDirection === "up"    && direction !== "down") ||
        (nextDirection === "down"  && direction !== "up")
    ) {
        direction = nextDirection;
    }

    let head = { ...snake[0] };
    if(direction === "left")  head.x -= 1;
    if(direction === "right") head.x += 1;
    if(direction === "up")    head.y -= 1;
    if(direction === "down")  head.y += 1;

    // Check collision with wall or itself
    if (
        head.x < 0 || head.x >= cols ||
        head.y < 0 || head.y >= rows ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        stopGame();
        highScoreDiv.innerHTML = highScore;
        clearInterval(timer);
        restartWindow();
        return;
    }

    // Move
    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDiv.innerHTML = score;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("snakeHighScore", highScore);
            highScoreDiv.innerHTML = highScore;
        }
        food = getRandomFoodPosition();
    } else {
        // Remove tail if not eating
        snake.pop();
    }

    render();
}

function startGame(){
    clearInterval(intervalId);
    clearInterval(timer);
    timeFunc();
    render();
    intervalId = setInterval(moveSnake, 400);
}

function stopGame() {
    clearInterval(intervalId);
    clearInterval(timer);
}

function restartGame() {
    seconds = 0;
    minutes = 0;
    hours = 0;
    score = 0;
    scoreDiv.innerHTML = "0";
    snake = [{ y: 0, x: 0 }];
    direction = "right";
    nextDirection = "right";
    food = getRandomFoodPosition();
    startGame();
}

function restartWindow(){
    restart.classList.remove("hidden");
    restartGif();
    reTimeout = setTimeout(()=>{
        restart.classList.add("hidden");
        restartGame();
    }, 6000);
}

document.querySelectorAll("button").forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        if(btn.classList.contains("left"))      nextDirection = "left";
        else if(btn.classList.contains("right"))nextDirection = "right";
        else if(btn.classList.contains("up"))   nextDirection = "up";
        else if(btn.classList.contains("down")) nextDirection = "down";
    });
});

function timeFunc(){
    timer = setInterval(function() {
        seconds++;
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes >= 60) {
            hours++;
            minutes = 0;
        }
        let displaySeconds = seconds < 10 ? '0' + seconds : seconds;
        let displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        let displayHours = hours < 10 ? '0' + hours : hours;
        if (hours > 0) {
            time.innerHTML = `${displayHours}:${displayMinutes}:${displaySeconds}`;
        } else if (minutes > 0) {
            time.innerHTML = `${displayMinutes}:${displaySeconds}`;
        } else {
            time.innerHTML = `${displaySeconds}`;
        }
    }, 1000);
}

addEventListener("keydown", (event)=>{
    if(event.key == "ArrowUp")    nextDirection = "up";
    if(event.key == "ArrowDown")  nextDirection = "down";
    if(event.key == "ArrowRight") nextDirection = "right";
    if(event.key == "ArrowLeft")  nextDirection = "left";
});

document.querySelector(".rebtn").addEventListener('click', ()=>{
    clearTimeout(reTimeout)
    restart.classList.add("hidden")
    restartGame()
});

// initialize food and start the game
food = getRandomFoodPosition();
startGame();let gif = new Image();
gif.src = './8de28f51a3083491685bca61f9ace241.gif';

function loadGif() {
  document.getElementById('gover').src = gif.src;
}

function unloadGif() {
  document.getElementById('gover').src = '';
}

function restartGif() {
  gif.src = './8de28f51a3083491685bca61f9ace241.gif';
  document.getElementById('gover').src = gif.src;
}



// for(let i = 0; i < columns*rows; i++){
//         let box = document.createElement("div")
//         box.className = "block"
//         board.appendChild(box)
// }

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        blocks[ `${row}-${col}` ] = block
        
   }    
}

function render() {
    
          
          snake.forEach(segment =>{
                blocks[`${segment.y}-${segment.x}`].classList.add("fill")
          })
          
          blocks[`${food.y}-${food.x}`].classList.add("food")
          
          let head = null  
          
          if(direction === "left"){
              
              head = {x: snake[0].x - 1, y: snake[0].y}    
              checkSnake(head)
              
          }
          if(direction === "right"){
              
              head = {x: snake[0].x + 1, y: snake[0].y}    
             checkSnake(head)
             
          }
          if(direction === "up"){
              
              head = {x: snake[0].x, y: snake[0].y - 1}    
             checkSnake(head)
             
          }
          if(direction === "down"){
              
              head = {x: snake[0].x, y: snake[0].y + 1}    
             checkSnake(head)
             
          }
          if(head.y === food.y && head.x === food.x){
                blocks[`${food.y}-${food.x}`].classList.remove("food")
                food = {
                 x: Math.floor(Math.random()*cols),
                 y: Math.floor(Math.random()*rows)
                }
                snake.unshift(head)
                score++
                scoreDiv.innerHTML = score;
                score >= highScore ? highScore = score : highScore += 0
          }
          
          
          snake.forEach(segment =>{
                        blocks[`${segment.y}-${segment.x}`].classList.remove("fill")
                })
                
          snake.unshift(head)
          snake.pop()
          
          snake.forEach(segment =>{
                        blocks[`${segment.y}-${segment.x}`].classList.add("fill")
                })
        
        
}

function startGame(){
    timeFunc()
    intervalId = setInterval(()=>{
  render()   
}
,400)}


function checkSnake(head){
     if(head.x >= cols || head.y >= rows || head.x < 0 || head.y < 0){
         
         stopGame()
         highScoreDiv.innerHTML = highScore
         clearInterval(timer)
         restartWindow()
         return true;
     }
     
}

// function checkFood(head){
//     if(head.y === food.y && head.x === food.x){
//         blocks[`${food.x}-${food.y}`].classList.remove("food")
        
//     }
// }

const controlBtn = {
    left: function(){
        direction = "left"
    },
    right: function(){
        direction = "right"
    },
    up: function(){
        direction = "up"
    },
    down: function(){
        direction = "down"
    }
}

document.querySelectorAll("button").forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        if(btn.classList.contains("left")){
            controlBtn.left()
        }
        else if(btn.classList.contains("right")){
            controlBtn.right()
        }
        else if(btn.classList.contains("up")){
            controlBtn.up()
        }
        else if(btn.classList.contains("down")){
            controlBtn.down()
        }
    })
})



function timeFunc(){
    timer = setInterval(function() {
    seconds++;
    if (seconds >= 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes >= 60) {
      hours++;
      minutes = 0;
    }
    let displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    let displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    let displayHours = hours < 10 ? '0' + hours : hours;
    if (hours > 0) {
      time.innerHTML = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    } else if (minutes > 0) {
      time.innerHTML = `${displayMinutes}:${displaySeconds}`;
    } else {
      time.innerHTML = `${displaySeconds}`;
    }
  }, 1000);}

startGame()

function stopGame() {
    clearInterval(intervalId)
    clearInterval(timer)
}

function restartGame() {
    seconds = 0
    minutes = 0
    hours = 0
    score = 0
    scoreDiv.innerHTML = "0"
    snake = [{y:0, x:0}]
    blocks[`${food.y}-${food.x}`].classList.remove("food")
    food = {
    x: Math.floor(Math.random()*cols),
    y: Math.floor(Math.random()*rows)
    }
    direction = "right"
    startGame()
    
}

function restartWindow(){
    restart.classList.remove("hidden")
    
    restartGif()
    reTimeout = setTimeout(()=>{
        restart.classList.add("hidden")
        restartGame()
        
    },6000)
    
}

addEventListener("keydown", (event)=>{
    if(event.key == "ArrowUp"){
        controlBtn.up()
    }
    if(event.key == "ArrowDown"){
        controlBtn.down()
    }
    if(event.key == "ArrowRight"){
        controlBtn.right()
    }
    if(event.key == "ArrowLeft"){
        controlBtn.left()
    }
})



document.querySelector(".rebtn").addEventListener('click', ()=>{
    clearTimeout(reTimeout)
    restart.classList.add("hidden")
    restartGame()
    
})
