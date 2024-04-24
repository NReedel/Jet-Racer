// Local variables
this.startTime = new Date().getTime();
let intitalSpawn = 2;
let startSpawn = intitalSpawn;
let endSpawn = [10,20,30];


function everyInterval(n){
    return (gameArea.frameNumber / n) % 1 == 0;
}

// With a given level config, finds every object that can be currently spawned.
function findSpawnableObjects(levelObjects){
    spawnables = new Set();

    // Checks each potential object for the current level.
    levelObjects.forEach((object) => {
        // Passes if current time is within the time frame of the object.
        // if (time >= object.startTime && time <= object.endTime){ // old code
        if (time >= startSpawn && time < endSpawn[level-1] || level-1 == endSpawn.length){
            // Passes if spawn rate condition is met.
            if (object.spawnRate >= Math.random()){
                spawnables.add(object.objectID);
            }
        }
        else if(time >= endSpawn[level-1] && level-1 != endSpawn.length){
            console.log(time);
            startSpawn = intitalSpawn + endSpawn[level-1];
            level += 1;
            // setTimeout(() => {loadNextLevel(level)}, (startSpawn)*1000); // optional transistion
            loadNextLevel(level-1);
        }        
    });

    return spawnables;
}

function loadNextLevel(lvl){
    var compBackgroundImage = window.getComputedStyle(background);
    var backgroundImageUrl = compBackgroundImage.backgroundImage.replace(/^url\(['"]?([^'"]*)['"]?\)$/, '$1');
    const hasZoneFiles = localStorage.getItem('zoneFiles') !== null;
    if (hasZoneFiles){
        let zoneFiles = JSON.parse(localStorage.getItem('zoneFiles'));
        let nextLevel = zoneFiles[1][lvl];
        console.log(nextLevel);
        let parts = backgroundImageUrl .split('/');
        let currentLevel = parts[parts.length-1];
        if(nextLevel !== currentLevel){
            backgroundImageUrl = backgroundImageUrl.replace(currentLevel,nextLevel);
            console.log(backgroundImageUrl)
            background.style.backgroundImage = 'url('+backgroundImageUrl+')';
            // Get the stylesheets
            var stylesheets = document.styleSheets;
            // Loop through each stylesheet
            for (var i = 0; i < stylesheets.length; i++) {
                var rules = stylesheets[i].cssRules || stylesheets[i].rules;

                // Loop through each rule in the stylesheet
                for (var j = 0; j < rules.length; j++) {
                    // Check if the rule is for #background::after
                    if (rules[j].selectorText === "#background::after") {
                        // Change the background image URL of ::after
                        rules[j].style.backgroundImage = 'url('+backgroundImageUrl+')';
                    }
                }
            }
        }
    }
    else{
        alert("error: couldn't load next level");
    }
}

function spawnObjects(spawnables){
    let x = gameArea.canvas.width;

    // Spawns an object based on if its spawnable.
    spawnables.forEach((object) => {
        switch (Objects[object]){
            case Objects.Column:
                // Needs implemented.
                break;
            case Objects.MovingSquare:
                objects.add(new MovingSquare(x, /*Math.random()*canvasHeight*/(canvasHeight/2)-(Math.random()*300), 120, 120, 0, speed/100+2, 1, "black"));
                break;
            case Objects.HealthPack:
                objects.add(new HealthPack(x, Math.random()*canvasHeight, 60, 60, 0, 0, 1, "green"));
                break;
            case Objects.Slow:
                objects.add(new Slow(x, Math.random()*canvasHeight, 60, 60, 0, 0, 1, "blue"));
                break;
            case Objects.Phase:
                objects.add(new Phase(x, Math.random()*canvasHeight, 60, 60, 0, 0, 5000, "white"));
                break;
            case Objects.Missile:
                objects.add(new Missile(x, Math.random()*(canvasHeight-200)+100, 70, 30, 0, 0, 1, 1, "red"));
                break;
            default:
                break;
        }
    });

    return;
}

// Broadcasts updates to collision, movement, and rendering to each object.
function updateObjects(){
    objects.forEach((object) => {
        if (object.x < (0 - object.width)){
            objects.delete(object);
        }
    });

    objects.forEach((object) => {
        if (player.isOverlapping(object)){
            switch (object.type){
                case Objects.Column:
                    object.collideWith(player);
                    objects.delete(object);
                    return;
                case Objects.MovingSquare:
                    object.collideWith(player);
                    objects.delete(object);
                    return;
                case Objects.HealthPack:
                    object.collect();
                    objects.delete(object);
                    break;
                case Objects.Slow:
                    object.collect();
                    objects.delete(object);
                    break;
                case Objects.Phase:
                    object.collect();
                    objects.delete(object);
                    break;
                case Objects.Missile:
                    object.interactWith(player);
                    objects.delete(object);
                    break;
            }
        }

        if (object.type == Objects.Missile){
            object.target(player);
        }

        object.speedX = -speed;
        object.move();
        object.clampToBounds();

        //setInterval(() => {
            object.render();
        //}, 0, 0);
    });

    return;
}

// Updates the game, is called every once per interval from the gameArea.
function updateGameArea(){
    // Fetches the level config.
    let config;
    for (let i = 0; i < levelConfig.length; i++){
        if (levelConfig[i].levelID == level){
            config = levelConfig[i];
        }
    }

    // Clears the frame to redraw the scene.
    gameArea.clear();
    gameArea.frameNumber += 1;

    // Updates distance based on number of frames passed.
    distance = Math.floor(gameArea.frameNumber / 10);

    // Updates time spent in the level.
    time = ((new Date().getTime() - startTime) / 1000).toFixed(2);  // Convert milliseconds to seconds

    // Sets game speed based on current level config.
    speed = config.baseSpeed;

    // Attempts to spawn objects every interval.
    if (gameArea.frameNumber % (frameRate / config.spawnFrequency) == 0.0){
        spawnObjects(findSpawnableObjects(config.objects));
    }

    // Updates all objects once per interval.
    updateObjects();

    // Updates the player.
    player.handleInput();
    player.move();
    player.clampToBounds();
    player.render();
    document.getElementById("statBox").textContent = "Level: " + level.toFixed(0) + " | Distance: " + distance.toFixed(0) + " | Time: " + time + " | Health: " + player.health.toFixed(0);
}
