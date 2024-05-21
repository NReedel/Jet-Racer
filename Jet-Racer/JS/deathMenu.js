class DeathMenu{
    constructor(){
        // Singleton
        if (DeathMenu.instance) {
            return DeathMenu.instance;
        }
        DeathMenu.instance = this;

        this.item = document.getElementsByTagName("canvas")[0];
        document.body.insertBefore(this.#insertModal(), this.item);

        this.background = document.getElementById("background");
        this.background.style.animationPlayState = 'paused';

        this.modal = document.getElementById("modal");
        this.restartBtn = document.getElementById("restart");
        
        this.homeBtn = document.getElementById("home");

        this.homeBtn.addEventListener("click", function(){
            location.href = "./..";
        });

        this.restartBtn.addEventListener("click", function(){
            let newModal = document.getElementById("modal");
            newModal.style.display = "none";
            gameArea.restart();
        });
        
        /*window.addEventListener("click", function(e){
            let newModal = document.getElementById("modal");
            if(e.target == newModal){
                newModal.style.display = "none";
            }
            this.background.style.animationPlayState = 'running';
            gameArea.clear();
            gameArea.start();
        });*/
    }

    #insertModal(){
        let obj = document.createElement("div");
        obj.className = "modal";
        obj.id = "modal";
        obj.innerHTML = `
        <div class="modal-content">
            <h1>You Died :(</h1>
            <h2>Score: ${distance}</h2>
            <button class="restart modal-btn" id="restart">Restart</button>
            <button class="home modal-btn" id="home">Return Home</button>
        </div>
        `;
        return obj;
    }

    OpenDeathMenu(){
        this.modal.style.display = "block";
        gameArea.stop();
    }
}
