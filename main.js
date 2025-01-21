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
    constructor(x,y,) {
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
    
    //Malovani hráčova boxu
    board.ctx.fillStyle = "red";
    board.ctx.fillRect(hrac.x, hrac.y,hrac.width, hrac.height);

    //Malovani hrace
    board.ctx.drawImage(hrac.img, hrac.x, hrac.y);

    //malovani pipes
    for (let index = 0; index < pipesArray.length; index++) {
        let pipe = pipesArray[index];
        pipe.x += fyzika.velocityX;
        board.ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    }

    //resetovani snimku
    requestAnimationFrame(update);
}
  
//------------------------------------------------------------
function generacePipes(){
    let randomPipeY = 1;
    let topPipe = new Pipes(board.width, randomPipeY);

    pipesArray.push(topPipe);
}

//---------------------------------------------------------------

window.onload = function (){
    board.hra = document.getElementById("hra");
    board.width = 360;
    board.height =  640;
    board.ctx = board.hra.getContext("2d");
        
    //malovani hrace
    board.ctx.drawImage(hrac.img, hrac.x, hrac.y);



    update();
    setInterval(generacePipes, 2500);
}    
