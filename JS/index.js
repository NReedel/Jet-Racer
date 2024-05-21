const startEndlessBtn = document.getElementById("startEndlessBtn");
const statShipSelect = document.getElementById("startShipSelect"); 
const playarAvatar = document.getElementById("playerAvatar");

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}   

startEndlessBtn.addEventListener("click", function(){
    localStorage.setItem("avatar",playerAvatar.src);
    document.getElementsByTagName("img")[1].style.animationName = "JetTakeOffAnimation";
    document.getElementsByTagName("img")[0].style.animationDuration = "2s";
    sleep(1090).then(()=>{location.href = "./HTML/game.html";});
});

startShipSelect.addEventListener("click",function(){ 
    location.href="./HTML/shipSelect.html"
});

startZoneSelect.addEventListener("click",function(){ 
    location.href="./HTML/zoneSelect.html"
});

const hasShipFile = localStorage.getItem('shipFile') !== null;
if (hasShipFile){
    const shipFile = localStorage.getItem('shipFile');
    let parts = playerAvatar.src.split('/');
	let currentShip= parts[parts.length-1];
    if(currentShip !== shipFile)
        playerAvatar.src= playerAvatar.src.replace(currentShip,shipFile);
}

const hasZoneFiles = localStorage.getItem('zoneFiles') !== null;
if (!hasZoneFiles){
    let zones = new Map();
    zones.set("Zone_1",["airport.PNG", "city.jpeg","cloud.jpg","space.jpg"]);
    // zones.set("Zone_2",["Planet2.jpg","Planets.jpg","Planets_2.png","Shooting Star.jpg"]);
    // zones.set("Zone_3",["Astronaut-Moon.png","Pluto.png","Rocket-Planets.png","Space-Planets.png"]);
    // zones.set("Zone_4",["Orbs.png","Saturn.png","UFO_Orb.png","Venus.png"]);
    // zones.set("Zone_5",["Level_1_MoonBase35.png","Level_2_DuneZone.png","Level_3_Flooded_Forrest.png","Level_4_Lithomen_Domain.png"]);
    let zoneEntries = Array.from(zones.entries());
	// set defualt zone
    const selectedZone = zoneEntries[0];
	localStorage.setItem('zoneFiles',JSON.stringify(selectedZone));
}


