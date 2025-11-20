let board = document.querySelector(".board")
let time = document.querySelector(".tspan")
let scoreDiv = document.querySelector(".sspan")
let highScoreDiv = document.querySelector(".hspan")
let restart = document.querySelector(".restart")
let startBtn = document.querySelector('.stbtn')

let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;

function Score(){
        let score = 0;
        return {
          showScore: function(){
                  return score;
          },
          addScore: function(){
                  score++
                  return score
          },
          setScore: function(newScore){
              score = newScore
              return score
          }
        }
}

let score = new Score()

let highScore = localStorage.getItem('highscore') || 0;
let obj = {
        boardHeight: board.clientHeight,
        boardWidth: board.clientWidth,
}
let size = 40
let rows = Math.floor(obj.boardHeight / size);
let cols = Math.floor(obj.boardWidth / size)

let blocks = []
let snake = [
        {y:0, x:0},
        // {y:2, x:5},
        // {y:2, x:6}
        
]

let food = {
    x: Math.floor(Math.random()*cols),
    y: Math.floor(Math.random()*rows)
    
}
let direction = "right"
let nextDirection = "right"
let intervalId = null;



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
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            blocks[`${row}-${col}`].classList.remove("fill", "food", "head");
        }
    }
          
          snake.forEach(segment =>{
                blocks[`${segment.y}-${segment.x}`].classList.add("fill")
          })
          
          blocks[`${food.y}-${food.x}`].classList.add("food")
          
          let head = null  
          if (
            (nextDirection === "left"  && direction !== "right") ||
            (nextDirection === "right" && direction !== "left") ||
            (nextDirection === "up"    && direction !== "down") ||
            (nextDirection === "down"  && direction !== "up")
        ) {
            direction = nextDirection;
        }
          
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
                blocks[`${snake[0].y}-${snake[0].x}`].classList.remove("head")     

                food = {
                 x: Math.floor(Math.random()*cols),
                 y: Math.floor(Math.random()*rows)
                }
                
                snake.unshift(head)
                score.addScore()
                scoreDiv.innerHTML = score.showScore();
                if(score.showScore() > highScore){
                    highScore = score.showScore()
                    localStorage.setItem("highscore", highScore.toString())
                }
                
          }
          
          
          snake.forEach(segment =>{
                        blocks[`${segment.y}-${segment.x}`].classList.remove("fill")
                })
          blocks[`${snake[0].y}-${snake[0].x}`].classList.remove("head")     
          snake.unshift(head)
          snake.pop()
          
          snake.forEach(segment =>{
                        blocks[`${segment.y}-${segment.x}`].classList.add("fill")
                })
          blocks[`${snake[0].y}-${snake[0].x}`].classList.add("head")
        highScoreDiv.innerHTML = highScore
        
        
}

function startGame(){
    timeFunc()
    intervalId = setInterval(()=>{
  render()   
}
,400)}


function checkSnake(head){
     if(head.x >= cols || head.y >= rows || head.x < 0 || head.y < 0 || snake.some(segment => segment.x === head.x && segment.y === head.y)){
         
         stopGame()
         
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
        nextDirection = "left"
    },
    right: function(){
        nextDirection = "right"
    },
    up: function(){
        nextDirection = "up"
    },
    down: function(){
        nextDirection = "down"
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



function stopGame() {
    clearInterval(intervalId)
    clearInterval(timer)
}

function restartGame() {
    seconds = 0
    minutes = 0
    hours = 0
    score.setScore(0)
    scoreDiv.innerHTML = "0"
    snake = [{y:0, x:0}]
    blocks[`${food.y}-${food.x}`].classList.remove("food")
    food = {
    x: Math.floor(Math.random()*cols),
    y: Math.floor(Math.random()*rows)
    }
    direction = "right"
    nextDirection = "right"
    startGame()
    
}

function restartWindow(){
    restart.classList.remove("hidden")
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
    
    restart.classList.add("hidden")
    restartGame()
    
})

startBtn.addEventListener("click", ()=>{
    document.querySelector(".modal").style.display = "none"
    startGame()
    
})