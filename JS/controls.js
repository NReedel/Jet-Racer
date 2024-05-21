var keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
  
    if (e.key == "e" || e.key == "E"){
        player.usePower();
    } else if (e.key == "q" || e.key == "Q"){
        player.cyclePowers();
    }
  });