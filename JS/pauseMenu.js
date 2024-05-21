class PauseMenu{
    constructor(){
        // Singleton
        if (PauseMenu.instance) {
            return PauseMenu.instance;
        }
        PauseMenu.instance = this;

        this.item = document.getElementsByTagName("canvas")[0];
        document.body.insertBefore(this.#insertModal(), this.item);

        this.background = document.getElementById("background");
        this.background.style.animationPlayState = 'paused';

        this.modal = document.getElementById("modal");
        this.restartBtn = document.getElementById("restart");
        this.resumeBtn = document.getElementById("resume");
        this.homeBtn = document.getElementById("home");

        this.homeBtn.addEventListener("click", function(){
            location.href = "./..";
        });

        this.restartBtn.addEventListener("click", function(){
            let newModal = document.getElementById("modal");
            newModal.style.display = "none";
            gameArea.restart();
        });

        this.resumeBtn.addEventListener("click", function(){
            let newModal = document.getElementById("modal");
            newModal.style.display = "none";
            this.background.style.animationPlayState = 'running';
        });
        
        window.addEventListener("click", function(e){
            let newModal = document.getElementById("modal");
            if(e.target == newModal){
                newModal.style.display = "none";
            }
            this.background.style.animationPlayState = 'running';
            gameArea.clear();
            gameArea.start();
        });
    }

    #insertModal(){
        let obj = document.createElement("div");
        obj.className = "modal";
        obj.id = "modal";
        obj.innerHTML = `
        <div class="modal-content">
            <button class="resume modal-btn" id="resume">Resume</button>
            <button class="restart modal-btn" id="restart">Restart</button>
            <button class="home modal-btn" id="home">Return Home</button>
        </div>
        `;
        return obj;
    }

    OpenPauseMenu(){
        this.modal.style.display = "block";
        gameArea.stop();
    }
}
