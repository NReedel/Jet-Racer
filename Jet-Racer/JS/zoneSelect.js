
const back = document.getElementById("back");
const zone = document.getElementById("zone");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let zones = new Map();
zones.set("Zone_1",["airport.PNG", "city.jpeg","cloud.jpg","space.jpg"]);
zones.set("Zone_2",["Planet2.jpg","Planets_2.png","Planets.jpg","Shooting_Star.jpg"]);
zones.set("Zone_3",["Astronaut-Moon.png","Pluto.png","Rocket-Planets.png","Space-Planets.png"]);
zones.set("Zone_4",["Orbs.png","Saturn.png","UFO_Orb.png","Venus.png"]);
zones.set("Zone_5",["Level_1_MoonBase35.png","Level_2_DuneZone.png","Level_3_Flooded_Forrest.png","Level_4_Lithomen_Domain.png"]);
let parts = zone.src.split('/');
let file = "";

// Convert the Map to a 2d array of entries
const zoneEntries = Array.from(zones.entries());

window.addEventListener('load',function(){	const hasZoneFiles = localStorage.getItem('zoneFiles') !== null;
	if (hasZoneFiles){
		const zoneFiles = JSON.parse(localStorage.getItem('zoneFiles'));
		let currentZone = zoneFiles[0]+ "/" + zoneFiles[1][0];
		let parts = zone.src.split('/');
		let startingZone = parts[parts.length-2]+ "/" + parts[parts.length-1];
		if(currentZone !== startingZone){
			file = zoneFiles[0];
			zone.src= zone.src.replace(startingZone,currentZone);
		}
		localStorage.removeItem('zoneFiles'); //edit
	}
	zone.style.display = 'block';
});

function getKeyIndex(mp, key) {
	let index = 0;
	for (let mapKey of mp.keys()) {
		if (mapKey === key) {
			return index;
		}
		index++;
	}
	// If the key is not found, return -1
	return -1;
}

back.addEventListener("click", function(){
	const selectedZone = zoneEntries[getKeyIndex(zones,file)];
	localStorage.setItem('zoneFiles',JSON.stringify(selectedZone));
	let targetLocation = location.href.replace("HTML/zoneSelect.html","index.html");
	location.href=targetLocation;
});

prev.addEventListener("click",function(){
	let parts = zone.src.split('/');
	file = parts[parts.length-2];
	let prevIndex = getKeyIndex(zones,file)-1;
	console.log(prevIndex);
	if (prevIndex == -1){ 
		prevIndex = zones.size-1;
	}
	// add level to zone
	file = parts[parts.length-2] + "/" + parts[parts.length-1];
	let prevFile = zoneEntries[prevIndex][0]+"/"+zoneEntries[prevIndex][1][0];
	zone.src= zone.src.replace(file,prevFile);
	file = zoneEntries[prevIndex][0];
});

next.addEventListener("click",function(){
	let parts = zone.src.split('/');
	file = parts[parts.length-2];
	let nextIndex = getKeyIndex(zones,file)+1;
	if (nextIndex == zones.size){ 
		nextIndex = 0;
	}
	file = parts[parts.length-2] + "/" + parts[parts.length-1];
	let nextFile = zoneEntries[nextIndex][0]+"/"+zoneEntries[nextIndex][1][0];
	zone.src= zone.src.replace(file,nextFile);
	file = zoneEntries[nextIndex][0];
});

// let audio = new Audio('/Jet-Racer/AUDIO/zoneSelect_music.wav');
// document.addEventListener("click", () =>{
//     audio.volume = getMusicVolume();
//     audio.play();
//     audio.loop = true;
// });
