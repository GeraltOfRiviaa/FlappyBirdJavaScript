//https://www.youtube.com/watch?v=jj5ADM2uywg&list=PLnKe36F30Y4bLhA-st9sC4ZthyV7nsL2Q&index=2
class Hra{
    constructor() {
        this.hra = document.getElementById("hra");
        this.width = 360;
        this.height =  640;
        this.ctx = this.hra.getContext("2d");
    }
}
class Hrac {
    constructor() {
        this.width = 34;
        this.height = 24;
        this.x = Hra.width / 8;
        this.y = Hra.height / 2;
    }
}

function draw(){
    drawImage("/pictures/yellowbird-midflap.png", Hrac.x, Hrac.y);
}