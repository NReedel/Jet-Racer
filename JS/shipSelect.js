
const back = document.getElementById("back");
const playerAvatar = document.getElementById("playerAvatar");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const characters = ["jet_logo.png", "sunfish.png","galactic_fleet_ship.png","modern_UFO.png"];
let file = "";

window.addEventListener('load',function(){
	const hasShipFile = localStorage.getItem('shipFile') !== null;
	if (hasShipFile == true){
		const shipFile = localStorage.getItem('shipFile');
		let parts = playerAvatar.src.split('/');
		// 
		let currentShip = parts[parts.length-1];
		file = currentShip; 
		if(currentShip !== shipFile){
			playerAvatar.src= playerAvatar.src.replace(currentShip,shipFile);
			file = shipFile;
		}
		localStorage.removeItem('shipFile');
	}
});

function index(name){
	return characters.indexOf(name);
}

back.addEventListener("click", function(){
	let targetLocation = location.href.replace("HTML/shipSelect.html","index.html");
	localStorage.setItem('shipFile',file);
	location.href=targetLocation;
});

prev.addEventListener("click",function(){
	let parts = playerAvatar.src.split('/');
	file = parts[parts.length-1];
	let prevIndex = index(file)-1;
	if (prevIndex == -1){ 
		prevIndex = characters.length-1;
	}
	playerAvatar.src= playerAvatar.src.replace(file,characters[prevIndex]);
	file = characters[prevIndex];
});

next.addEventListener("click",function(){
	let parts = playerAvatar.src.split('/');
	file = parts[parts.length-1];
	let nextIndex = index(file)+1;
	if (nextIndex == characters.length){ 
		nextIndex = 0;
	}
	playerAvatar.src= playerAvatar.src.replace(file,characters[nextIndex]);
	file = characters[nextIndex];
});

let audio = new Audio('/Jet-Racer/AUDIO/ship_select_music.wav');
document.addEventListener("click", () =>{
    audio.volume = 0.5;
    audio.play();
    audio.loop = true;
});
