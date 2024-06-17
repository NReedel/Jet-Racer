class Stopwatch {
    constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.running = false;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.startTime = (performance.now() / 1000) - this.elapsedTime;
        }
    }

    stop() {
        if (this.running) {
            this.running = false;
            this.elapsedTime = (performance.now() / 1000) - this.startTime;
        }
    }

    reset() {
        this.running = false;
        this.startTime = 0;
        this.elapsedTime = 0;
    }

    getTime() {
        if (this.running) {
            return (performance.now() / 1000) - this.startTime;
        } else {
            return this.elapsedTime;
        }
    }

    formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = ms % 1000;

        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }
}

// Example usage
// const stopwatch = new Stopwatch();
// stopwatch.start();
// setTimeout(() => {
//     stopwatch.stop();
//     console.log(stopwatch.formatTime(stopwatch.getTime())); // Prints the elapsed time in minutes:seconds.milliseconds format
// }, 2000);