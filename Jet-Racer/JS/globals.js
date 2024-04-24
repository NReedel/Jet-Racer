var gameArea;
var player;
var objects = new Set();

var time = 0;
var speed = 0;
var distance = 0;
var level = 1;

var levelConfig;
var frameRate = 200;

var stats;
var statBox;
var statBoxHeight = document.querySelector("#statBox").clientHeight;

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const playerWidth = 70;
const playerHeight = 70;
