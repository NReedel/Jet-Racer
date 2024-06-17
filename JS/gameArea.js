class GameArea{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNumber = 0;
        this.pause = false;
        this.stopwatch = new Stopwatch();
    }

    start(){
        this.interval = setInterval(updateGameArea, 1000 / frameRate);
        this.pause = false;
        this.stopwatch.start(); 
    }

    restart(){
        location.reload();
        this.stopwatch.stop(); 
        this.stopwatch.reset(); 
    }

    resume(){
        this.start()
        this.stopwatch.start(); 
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    stop(){
        clearInterval(this.interval);
        this.pause = true
        this.stopwatch.stop(); 
    }
}
