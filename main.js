//https://www.youtube.com/watch?v=jj5ADM2uywg&list=PLnKe36F30Y4bLhA-st9sC4ZthyV7nsL2Q&index=2
class Board{
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
    
    constructor(x , y) { 
        this.width = 34;
        this.height = 24;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "./pictures/yellowbird-midflap.png";    
    }
}
class Pipes {
    constructor(x,y) {
        this.width = 64;
        this.height = 512;
        this.x = x;
        this.y = y;
        this.prosla = false;

        this.array = [];
        this.img = new Image();
        this.img.src = "./pictures/pipe-red.png";  
        
    }
}
class Fyzika {
    constructor() {
        this.velocityX = -2;
        this.velocityY = 0;
        this.gravitace = 0.4;
    }
}

let board = new Board();
let hrac = new Hrac(board.width / 8, board.height / 2);
let pipesArray = [];
let fyzika = new Fyzika();
//----------------------------------------------------------------
function update(){
    
    board.ctx.clearRect(0, 0, board.width, board.height);

    board.ctx.drawImage(board.imgBack, 0,0);
    
    

    //Malovani hrace
        board.ctx.drawImage(hrac.img, hrac.x, hrac.y);
    //Fyzika hráče
    fyzika.velocityY += fyzika.gravitace;
    hrac.y = Math.max(hrac.y + fyzika.velocityY,0) && Math.min(hrac.y + fyzika.velocityY,board.height - 24);


    //Malovani pipes horni
    for (let index = 0; index < pipesArray.length; index++) {
        let pipe = pipesArray[index];
        pipe.x += fyzika.velocityX;
        board.ctx.drawImage(pipe.img, pipe.x, pipe.y + 600, pipe.width, pipe.height);
    }
    // Malovani pipes dolni
    for (let index = 0; index < pipesArray.length; index++) {
        let pipe = pipesArray[index];
        pipe.x += fyzika.velocityX;
        board.ctx.save();
        board.ctx.scale(1, -1);
        board.ctx.drawImage(pipe.img, pipe.x, -pipe.y - pipe.height + 80, pipe.width, pipe.height);
        board.ctx.restore();
    }
    
    //Resetovani snimku
    requestAnimationFrame(update);
}

//------------------------------------------------------------
function generacePipes(){
    //512 je vyska pipes
    let randomPipeY = 1 - 512/ 4 - Math.random()* (512/2);
    let pipe1 = new Pipes(board.width, randomPipeY);
    //let pipe2 = new Pipes(board.width, randomPipeY);
    
    pipesArray.push(pipe1);
}
//---------------------------------------------------------------
function moveBird(key){
    if (key.code == "Space" ||key.code == "ArrowUp" ||key.code == "W"){
        fyzika.velocityY = -6;
    }
}
//---------------------------------------------------------------

window.onload = function (){
    board.hra = document.getElementById("hra");
    board.width = 360;
    board.height =  640;
    board.ctx = board.hra.getContext("2d");

    update();
    setInterval(generacePipes, 1500);
    document.addEventListener("keydown", moveBird);
}    

