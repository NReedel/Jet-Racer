function loadLevel(){
    var compBackgroundImage = window.getComputedStyle(background);
    var backgroundImageUrl = compBackgroundImage.backgroundImage.replace(/^url\(['"]?([^'"]*)['"]?\)$/, '$1');
    const hasZoneFiles = localStorage.getItem('zoneFiles') !== null;
    if (hasZoneFiles){
        let zoneFiles = JSON.parse(localStorage.getItem('zoneFiles'));
        let currentZone = zoneFiles[0]+ "/" + zoneFiles[1][0];
        let parts = backgroundImageUrl .split('/');
        let startingZone = parts[parts.length-2]+ "/" + parts[parts.length-1];
        if(currentZone !== startingZone){
            backgroundImageUrl = backgroundImageUrl.replace(startingZone,currentZone);
            console.log(backgroundImageUrl)
            background.style.backgroundImage = 'url('+backgroundImageUrl+')';
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
}

function startGame(){
    loadLevel();

    levelConfig[0] = [
        new ObjectConfig("HealthPack", 0.05),
        new ObjectConfig("Phase", 0.02),
        new ObjectConfig("MovingSquare", 0.05),
        new ObjectConfig("Missile", 0.15)
    ]

    levelConfig[1] = [
        new ObjectConfig("HealthPack", 0.04),
        new ObjectConfig("Phase", 0.02),
        new ObjectConfig("MovingSquare", 0.10),
        new ObjectConfig("Missile", 0.20)
    ]

    levelConfig[2] = [
        new ObjectConfig("HealthPack", 0.03),
        new ObjectConfig("Phase", 0.01),
        new ObjectConfig("MovingSquare", 0.15),
        new ObjectConfig("Missile", 0.25)
    ]

    levelConfig[3] = [
        new ObjectConfig("HealthPack", 0.02),
        new ObjectConfig("Phase", 0.01),
        new ObjectConfig("MovingSquare", 0.17),
        new ObjectConfig("Missile", 0.27)
    ]

    gameArea = new GameArea();
    player = new Player(30, 30, playerWidth, playerHeight, 0, 0, 3, 1, "white"); // player class
    gameArea.start();           
}
