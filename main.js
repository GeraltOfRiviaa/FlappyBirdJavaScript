class Board {
    constructor() {
        this.hra;
        this.width = 360;
        this.height = 640;
        this.ctx = null;
        this.imgBack = new Image();
        this.imgBack.src = "./pictures/background-night.png";
    }
}

class Hrac {
    constructor(x, y) { 
        this.width = 34;
        this.height = 24;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "./pictures/yellowbird-midflap.png";    
    }
}

class Pipes {
    constructor(x, y, isTop) {
        this.width = 64;
        this.height = 512;
        this.x = x;
        this.y = y;
        this.isTop = isTop;
        this.prosla = false;
    }
}

class Fyzika {
    constructor() {
        this.velocityX = -5;
        this.velocityY = 0;
        this.gravitace = 0.4;
    }
}

let board = new Board();
let hrac = new Hrac(board.width / 8, board.height / 2);
let pipesArray = [];
let fyzika = new Fyzika();
let gameOver = false;
const DEBUG_MODE = false;
let imgPipe = new Image();
imgPipe.src = "./pictures/pipe-red.png";
endImg = new Image();
endImg.src = "./pictures/gameover.png"
baseImg = new Image();
baseImg.src = "./pictures/base.png";

function update() {
    if(gameOver) {
        board.ctx.drawImage(endImg, 100,300)
        return;
    }
    
    board.ctx.clearRect(0, 0, board.width, board.height);
    board.ctx.drawImage(board.imgBack, 0, 0);
    board.ctx.drawImage(baseImg, 0,530);
    
    // Malování hráče
    board.ctx.drawImage(hrac.img, hrac.x, hrac.y);
    
    // Fyzika hráče
    fyzika.velocityY += fyzika.gravitace;
    hrac.y = Math.max(hrac.y + fyzika.velocityY, 0);
    hrac.y = Math.min(hrac.y, board.height - hrac.height);

    // Malování a kontrola trubek
    for (let i = 0; i < pipesArray.length; i++) {
        let pipe = pipesArray[i];
        pipe.x += fyzika.velocityX;
        
        // Spodní trubka
        let bottomY = pipe.y + 600;
        board.ctx.drawImage(imgPipe, pipe.x, bottomY, pipe.width, pipe.height);
        
        // Horní trubka
        let topY = -pipe.y - pipe.height + 80;
        board.ctx.save();
        board.ctx.scale(1, -1);
        board.ctx.drawImage(imgPipe, pipe.x, topY, pipe.width, pipe.height);
        board.ctx.restore();
/*
        // Debug zobrazení hitboxů
        if (DEBUG_MODE) {
            // Hitbox spodní trubky
            board.ctx.strokeStyle = "red";
            board.ctx.strokeRect(pipe.x + 2, bottomY, pipe.width - 4, pipe.height);
            
            // Hitbox horní trubky
            board.ctx.strokeRect(pipe.x + 2, -topY - pipe.height, pipe.width - 4, pipe.height);
            
            // Hitbox ptáčka
            board.ctx.strokeStyle = "blue";
            board.ctx.strokeRect(hrac.x + 2, hrac.y + 2, hrac.width - 4, hrac.height - 4);
        }
*/
        // Kontrola kolizí
        if (checkCollision(hrac, pipe.x, bottomY) || // kontrola spodní trubky
            checkCollision(hrac, pipe.x, -topY - pipe.height)) { // kontrola horní trubky
            gameOver = true;
        }
    }

    // Mazání trubek mimo obrazovku
    pipesArray = pipesArray.filter(pipe => pipe.x + pipe.width > 0);
    
    requestAnimationFrame(update);
}

function checkCollision(hrac, pipeX, pipeY) {
    // Zmenšené hitboxy pro přesnější kolize
    let hracLeft = hrac.x + 2;
    let hracRight = hrac.x + hrac.width - 2;
    let hracTop = hrac.y + 2;
    let hracBottom = hrac.y + hrac.height - 2;
    
    let pipeLeft = pipeX + 2;
    let pipeRight = pipeX + 64 - 2;
    let pipeTop = pipeY;
    let pipeBottom = pipeY + 512;

    return hracRight > pipeLeft && 
           hracLeft < pipeRight && 
           hracBottom > pipeTop && 
           hracTop < pipeBottom;
}

function generacePipes() {
    if(gameOver) {
        return;
    }
    
    let randomPipeY = 1 - 512/4 - Math.random() * (512/2);
    let pipe = new Pipes(board.width, randomPipeY);
    pipesArray.push(pipe);
}

function moveBird(key) {
    if (key.code == "Space" || key.code == "ArrowUp" || key.code == "KeyW") {
        fyzika.velocityY = -6;
    }
}

window.onload = function() {
    board.hra = document.getElementById("hra");
    board.width = 360;
    board.height = 640;
    board.ctx = board.hra.getContext("2d");

    update();
    setInterval(generacePipes, 1500);
    document.addEventListener("keydown", moveBird);
}