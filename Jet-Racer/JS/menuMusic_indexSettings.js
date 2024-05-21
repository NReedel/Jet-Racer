const settings = document.getElementById("settings");
const volumeSlider = document.getElementById("volumeSlider");

let audio = new Audio('/Jet-Racer/AUDIO/main_menu_music.wav');
window.addEventListener("click", () =>{
    audio.volume = getMusicVolume();
    audio.play();
    audio.loop = true;
    setMusicVolume((volumeSlider.value / 100));
});

volumeSlider.addEventListener("change", () =>{
    let displayValue = document.getElementById("volumeAmount");
    displayValue.innerText = `${volumeSlider.value}%`;
    setMusicVolume((volumeSlider.value / 100));
    audio.volume = getMusicVolume();
    audio.load();
});

settings.addEventListener("click", () =>{
    let modal = document.getElementById("modal");
    if(modal.style.display == "block"){
        modal.style.display = "none";
    }else{
        modal.style.display = "block";
        volumeSlider.value = getMusicVolume() * 100;
    }
});

window.addEventListener("click", function(e){
    let newModal = document.getElementById("modal");
    if(e.target == newModal){
        newModal.style.display = "none";
    }
});