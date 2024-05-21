function setMusicVolume(volume){
    localStorage.setItem('Volume', volume);
}

function getMusicVolume(){
    let num = localStorage.getItem('Volume');

    return num;
}