class GameArea{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNumber = 0;
    }

    start(){
        this.interval = setInterval(updateGameArea, 1000 / frameRate);
    }

    restart(){
        location.reload();
    }

    resume(){
        this.start()
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    stop(){
        clearInterval(this.interval);
    }
}
