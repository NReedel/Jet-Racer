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
    fetch('../JSON/level_config.json')
        .then(response => response.json())
        .then(data => levelConfig = data)
        .then(() => {
            gameArea = new GameArea();
            player = new Player(30, 30, playerWidth, playerHeight, 0, 0, 3, 1, "white"); // player class
            gameArea.start();
        })
        .catch(error => console.error('Error fetching JSON:', error));             
}
