


var myGamePiece;
var defaultCanvasWidth = 440;

// Initiates the game
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 520);
}

/****** The functions that create the pieces needed for the game *******/

// creates a rectangle in the game space
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.speedX = 0;
    this.speedY = 0;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        // don't let the GamePiece leave the canvas
        if(this.x + this.speedX > 0 && this.x + this.speedX <= defaultCanvasWidth - 10) {
            this.x += this.speedX;
        }
        else {
            if(this.x + this.speedX > defaultCanvasWidth - 10) {
                this.x = defaultCanvasWidth - 10;
            }
            else { // this.x + this.speedX <= 0
                this.x = 0;
            }
        }
        //this.x += this.speedX;
        //this.y += this.speedY; 
    } 
}


// Creates a canvas on which the game to take place
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 440;
        this.canvas.height = 560;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10); // updates the canvas every 20ms
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    
    // only allow the GamePiece to move left and right on the canvas
    //if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
    //if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
    myGamePiece.newPos(); 
    myGamePiece.update();
}

