// same as getElementById
const myCanvas = document.querySelector(".my-floppy");
const ctx = myCanvas.getContext("2d");
  // console.log(ctx); to test if connected


// there are multiples ways to approach this exercise
// however, this is a quick review doing it through prototypes.
// floppy is an object, obstacles is an array.
  const Game = function(){
    this.floppy = {};
    this.obstacles = [];
  }

  // floppy bird constructor function:
  const Floppy = function(){
    this.x = 0;
    this.y = 220;
    this.width = 100;
    this.height = 100;
    this.isCrashed = false;
    this.image = 'images/floppybird.png'
  }

  Floppy.prototype.draw = function(){
    // console.log("Outter this: ", this);
    const floppyImg = new Image();
    floppyImg.src = this.image;
    // this solves a problem with a function within a function and outside scope
    // since we have 2 funtional scopes, the keyword "this" will belong to different scopes inside each of the two functions
    // our way of solving this is reassigning keyword "this"  to "that" so it refers to the outer scope
    // let self = this;
    // floppyImg.onload = function(){
    //   // console.log(that); => that refers to the Floppy object and that's what we need
    //   ctx.drawImage(floppyImg, that.x, that.y, that.width, that.height);
    // }

    
    // floppyImg.onload = () => { //commented out later because ".onload" is only when you do not have loops.
      // console.log("inner this: ", this);
      ctx.drawImage(floppyImg, this.x, this.y, this.width, this.height);
    // }
  
  }

Floppy.prototype.fly = function(someKeyCode){
  switch(someKeyCode){
    case 37: // left
      this.x -= 10;
      break;
    case 39: // right
      this.x += 10;
      break;
    case 38: // up
      this.y -= 10;
      break;
    case 40: // down
      this.y += 10;
      break;

  }

}

function Obstacle(theX, theY, theWidth, theHeight){
  this.x = theX;
  this.y = theY;
  this.width = theWidth;
  this.height = theHeight;
  this.isTouched = false;

}

Obstacle.prototype.drawObstacle = function(){
  
    if(currentGame.floppy.isCrashed === false){
      this.x -= 2;
      if(this.x < -this.width){ // "-" because it's once the image is on negative side of width
        this.x = 1000;  
    }
  }
  if(this.isTouched){
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "green";
  }
  ctx.fillRect(this.x, this.y, this.width, this.height);
}


  // function Game(){
  //   // is the same as above function
  // }

// global variables 
let currentGame;
let currentFloppy;

  function startGame(){
    currentGame = new Game();
    currentFloppy = new Floppy();
    currentGame.floppy = currentFloppy;
    // console.log(" = = = ", currentGame);
    currentGame.obstacles = [
      new Obstacle(650, 0, 30, 250),
      new Obstacle(800, 350, 30, 200),
      new Obstacle(970, 0, 30, 250),
      new Obstacle(1120, 300, 30, 250),
      new Obstacle(1270, 0, 45, 200)
    ];
    // console.log(currentGame);
    drawingLoop();

  }

  document.onkeydown = function(event){
    // console.log(event.keyCode);
    currentGame.floppy.fly(event.keyCode);
  }

  function drawEverything(){
    currentGame.floppy.draw();
    currentGame.obstacles.forEach((oneObstacle) => {
      oneObstacle.drawObstacle();
      if(checkCollision(currentGame.floppy, oneObstacle)){
        currentGame.floppy.isCrashed = true;
        oneObstacle.isTouched = true;
        gameOver();
      }
    });
  }

  function drawingLoop(){
    ctx.clearRect(0, 0, 1000, 600);
    drawEverything();
    requestAnimationFrame(function(){
      drawingLoop();
    })
  }

function checkCollision(obj1, obj2){
  return obj1.y + obj1.height - 10 >= obj2.y
  && obj1.y <= obj2.y + obj2.height
  && obj1.x + obj1.width - 10 >= obj2.x
  && obj1.x >= obj2.x + obj2.width
}

function gameOver(){
  ctx.font = "bold 70px Arial";
  ctx.fillStyle = "orange";
  ctx.fillText("GAME OVER", 420, 220);

}


startGame();