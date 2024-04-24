/*______Hierachy________
Object
	Text
	Statbox
	MoveableObject < Has x and y speed >
		Obstacle
			column
			MovingSquare
			crushSquares # incomplete
		Collectable
			Healthpack # incomplete
			Slow # incomplete
		LivingObject < Has health and damage >
			Player
			Enemy
				missile # incomplete
				bug # incomplete
				turret # incomplete
________________________*/

// This enum should be expanded upon with every new usable child of an Object.
const Objects = {
	// Visual enums.
	Text: Symbol("Text"),
	StatBox: Symbol("StatBox"),

	// Obstacle enums.
	Column: Symbol("Column"),
	MovingSquare: Symbol("MovingSquare"),

	// Collectable enums.
	HealthPack: Symbol("HealthPack"),
	Slow: Symbol("Slow"),
	Phase: Symbol("Phase"),

	// Enemy enums.
	Missile: Symbol("Missile"),

	// Player enum.
	Player: Symbol("Player")
}

// Base class for all objects. 
// Instances should not be created.
class Object{
	constructor(type, x, y, width, height, color){
		this.type = type;
        this.x = x;
        this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.avatar = null;
	}
	
	// All objects have the ability to be rendered.
	render(){
		let ctx = gameArea.context;

		// Rendering functionality differs based on if the object has an avatar (image).
		if (this.avatar != null){
			let image = new Image();
			image.src = this.avatar;

			ctx.drawImage(image, this.x, this.y, this.width, this.height);
		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
}

class StatBox extends Object{
	constructor(x, y, width, height, color){
    	super(Objects.StatBox, x, y, width, height, color);
	}
}

// Base class for all movable objects. 
// Instances should not be created.
// Objects of this class are able to move.
class MovableObject extends Object{
	constructor(type, x, y, width, height, speedX, speedY, color){
		super(type, x, y, width, height, color);
		this.speedX = speedX;
		this.speedY = speedY;
		this.avatar = null;
	}

	// All movable objects have the ability to change their x and y position based on their speed.
	move(){
		this.x += this.speedX;
		this.y += this.speedY;
	}

	// Clamps the object to be within the y-dimension bounds of the playable area.
	clampToBounds(){
		if ((this.y + this.height) > canvasHeight){
			this.y = canvasHeight - this.height;
			this.speedY = 0;
		} else if ((this.y - statBoxHeight) < 0){
			this.y = statBoxHeight;
			this.speedY = 0;
		}
	}
}

// Base class for all obstacles. 
// Instances should not be created.
// Objects of this class have the ability to move and collide with other objects.
class Obstacle extends MovableObject{
	constructor(type, x, y, width, height, speedX, speedY, damage, color){
		super(type, x, y, width, height, speedX, speedY, color);
		this.damage = damage;
	}
	
	// Called when the player overlaps with this object.
	collideWith(obj){
		obj.takeDamage(this.damage);
	}
}

// Column obstacle.
class Column extends Obstacle{
	constructor(x, y, width, height, speedX, speedY, damage, color){ 
		super(Objects.Column, x, y, width, height, speedX, speedY, damage, color);
	}
}

// Moving square obstacle.
class MovingSquare extends Obstacle{
	constructor(x, y, width, height, speedX, speedY, damage, color){ 
		super(Objects.MovingSquare, x, y, width, height, speedX, speedY, damage, color);
		this.avatar = "../IMGS/Characters/Enemies/MovingSquare.png";

		// Random chance to start moving in a downward motion.
		this.down = Math.floor(Math.random()*(1-0+1)+0);
	}

	// Move function is overriden from parent class.
	// Obstacle moves until it hits a bound, in which case it switches vertical direction.
	move(){
		this.x += this.speedX;

		if (this.down == true){
			this.y = this.y + this.speedY;

			if (this.y + this.height >= canvasHeight){
				this.y -= (this.speedY + 1);
				this.down = false;
			}
		} else {
			this.y = this.y - this.speedY;

			if (statBoxHeight >= this.y){
				this.y += this.speedY + 1;
				this.down = true;
			}
		}
	}
}

// Base class for all collectables. 
// Instances should not be created.
// Objects of this class have the ability to move and to be collected by the player.
class Collectable extends MovableObject{
	constructor(type, x, y, width, height, speedX, speedY, color){
		super(type, x, y, width, height, speedX, speedY, color);
	}

	// Base function to be overriden in child classes.
	collect(){}
}

// Health pack collectable.
class HealthPack extends Collectable{
	constructor(x, y, width, height, speedX, speedY, healValue, color){
		super(Objects.HealthPack, x, y, width, height, speedX, speedY, color);
		this.healValue = healValue;
		this.avatar = "../IMGS/Collectables/HealthPack.png";
	}

	// Upon being collected, heals the player a specified amount.
	collect(){
		player.heal(this.healValue);
	}
}

// Slow collectable.
class Slow extends Collectable{
	constructor(x, y, width, height, speedX, speedY, slowValue, color){
		super(Objects.Slow, x, y, width, height, speedX, speedY, color);
		this.slowValue = slowValue;
	}

	// Upon being collected, slows down the game world for a period of time.
	collect(){
		//speedMod -= this.slowValue;

		setTimeout(() => {
			//speedMod += this.slowValue;
		}, 1000);
	}
}

class Phase extends Collectable{
	constructor(x, y, width, height, speedX, speedY, duration, color){
		super(Objects.Phase, x, y, width, height, speedX, speedY, color);
		this.duration = duration;
		this.avatar = "../IMGS/Collectables/Phase.png";
	}

	collect(){
		player.immune = true;

		var flash = setInterval(function(){
			player.avatar = null;

			setTimeout(() => {
				player.avatar = localStorage.getItem("avatar");
			}, 100);
		}, 250);

		setTimeout(() => {
			clearInterval(flash);
			player.immune = false;
		}, this.duration);
	}
}

// Base class for all living objects. 
// Instances should not be created.
// Objects of this class have the ability to move and are able to take and output damage.
class LivingObject extends MovableObject{
	constructor(type, x, y, width, height, speedX, speedY, maxHealth, damage, color){
		super(type, x, y, width, height, speedX, speedY, color);
		this.health = maxHealth;
		this.maxHealth = maxHealth;
		this.damage = damage;
	}

	// Restores a specified amount of health and clamps the value to max health.
	heal(health){
		this.health += health;

		if (this.health > this.maxHealth){
			this.health = this.maxHealth;
		}
	}

	// Takes a specified amount of damage and allows death results.
	takeDamage(damage){
		this.health -= damage;

		if (this.health <= 0){
			let deathMenu = new DeathMenu();
			deathMenu.OpenDeathMenu();
			gameArea.stop(); // Death
		}
	}

	// Forces an object to take a certain amount of damage.
	attack(obj){
		obj.takeDamage(this.damage);
	}
}

// Player class.
// This class has the ability to move, take and output damage, and receive input.
class Player extends LivingObject{
	constructor(x, y, width, height, speedX, speedY, maxHealth, damage, color){ 
		super(Objects.Player, x, y, width, height, speedX, speedY, maxHealth, damage, color);
		this.powerUps = [];
		this.immune = false;
		this.avatar = localStorage.getItem("avatar");
	}

	// Handles player input.
	handleInput(){ 
		if (keys['w'] || keys['W']){
		  	this.speedY -= 0.1;
		} else if (keys['s'] || keys['S']){
			this.speedY += 0.1;
		} else if (keys["Escape"]){
            let item = new PauseMenu();
            item.OpenPauseMenu();
		} else {
			// Applies deceleration to the player after input is released.
			if (this.speedY > 0.1){
				this.speedY -= 0.1;
			} else if (this.speedY < -0.1){
				this.speedY += 0.1;
			} else {
				this.speedY = 0;
			}
		}
	}

	// Determines if a specific object is within the rectangular bounds of this object.
	isOverlapping(obj){
		if (this.immune == true && !(obj.constructor.prototype instanceof Collectable)){
			return false;
		}

		let left = this.x;
		let right = this.x + this.width;
		let top = this.y;
		let bottom = this.y + this.height;
		let otherLeft = obj.x;
		let otherRight = obj.x + obj.width;
		let otherTop = obj.y;
		let otherBottom = obj.y + obj.height;

		let overlap = true;
		if ((bottom < otherTop) ||
		   (top > otherBottom) ||
		   (right < otherLeft) ||
		   (left > otherRight)){
			overlap = false;
		}

		return overlap;
	}
}

// Base class for all enemies. 
// Instances should not be created.
// Objects of this class have the ability to move and are able to take and output damage.
class Enemy extends LivingObject{
	constructor(type, x, y, width, height, speedX, speedY, maxHealth, damage, color){
		super(type, x, y, width, height, speedX, speedY, maxHealth, damage, color);
	}

	// Base interaction function for enemies to interact with objects.
	interactWith(obj){}
}

// Missile class.
// Chases the player and explodes upon impact.
class Missile extends Enemy{
	constructor(x, y, width, height, speedX, speedY, maxHealth, damage, color){
		super(Objects.Missile, x, y, width, height, speedX, speedY, maxHealth, damage, color);
		this.avatar = "../IMGS/Characters/Enemies/Missile.png";
	}

	// WORK IN PROGRESS
	move(){
		let dist = this.x - player.x;
		
		if (dist >= 1000){
			this.speedX = -2;
		} else {
			this.speedX = -4;
		}

		super.move();
	}

	// Loosely follows the target objects' y position.
	target(obj){
		if (obj.y > this.y){
			this.speedY += 0.01;
		} else if (obj.y < this.y){
			this.speedY -= 0.01;
		}

		if (this.speedY >= 2){
			this.speedY = 2;
		} else if (this.speedY <= -2){
			this.speedY = -2;
		}
	}

	// Called during collision with the player.
	interactWith(obj){
		obj.takeDamage(this.damage);
	}
}