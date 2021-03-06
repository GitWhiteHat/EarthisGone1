var ship, shipImage, wall, wallAnim, asteroid, asteroidImage0, laserImage, asteroidGroup, laserGroup;
var speed = 5;
var x = 400;
var whichLaser = 0;
var laserPos = -11;
var score = 0;
var font;
var fuel = 100;
var fuelState = 0;
function preload() {
    shipImage = loadImage("Sprites/SpaceShip.png");
    wallAnim = loadAnimation("Sprites/Wall/AlienWall01.png", "Sprites/Wall/AlienWall01.png", "Sprites/Wall/AlienWall02.png", "Sprites/Wall/AlienWall02.png");
    asteroidImage0 = loadImage("Sprites/Asteroids/Asteroid0.png");
    laserImage = loadImage("Sprites/Laser.png");
    font = loadFont("Fonts/alarm clock.ttf");
}

function setup() {
  createCanvas(400,200);
    ship = createSprite(70, height / 2, 16, 16);
    ship.addImage(shipImage);
    ship.scale = 0.5;
    wall = createSprite(16, height / 2, 32, 200);
    wall.addAnimation("wall", wallAnim);
    wall.scale = 0.5;
    wall.depth = 4;
    asteroidGroup = createGroup();
    laserGroup = createGroup();
    
}

function draw() {
    background(0);
    ship.y = mouseY;
    spawnAsteroids();
    if (frameCount % 5 === 0) {
        score+=10;
    }
    if (asteroidGroup.isTouching(laserGroup)) {
        for (let i = 0; i < asteroidGroup.length; i++) {
            for (let j = 0; j < laserGroup.length; j++) {
                if (laserGroup[j].isTouching(asteroidGroup) && asteroidGroup[i].isTouching(laserGroup)) {
                    laserGroup[j].destroy();
                    asteroidGroup[i].destroy();
                }
            }
        }

        score += 100;
    }
    reFill();
    textFont(font);
    fill(255);
    textSize(20);
    textAlign(CENTER);
    drawSprites();
    text("SCORE: " + score, 200, 20);
    text("FUEL: " + fuel, 200, 180);
}

function spawnAsteroids() {
    if (frameCount % 60 === 0) {
        asteroid = createSprite(width, random(10,190), 16, 16);
        asteroid.addImage(asteroidImage0);
        asteroid.scale = 0.5;
        asteroid.depth = 2;
        asteroid.setCollider("circle", 0, 0, 32);
        asteroid.debug = false;
        asteroid.lifetime = 200;
        asteroid.velocityX = random(-2, -4);
        asteroidGroup.add(asteroid);
    }
}

function keyPressed(score) {
    if (key === " " && fuel > 0 && fuelState === 0 ) {
        if (whichLaser === 0) {
            laserPos = -11
            whichLaser = 1;
        }
        else {
            laserPos = 11;
            whichLaser = 0;
        }
        laser = createSprite(75, ship.y + laserPos, 15, 2);
        laser.velocityX = 6;
        laser.addImage(laserImage);
        laser.scale = 0.5;
        laser.lifetime = 100;
        laserGroup.add(laser);
        fuel-= 20;
    }

    if (key === "r") {
        fuelState = 1;
    }
}

function reFill() {

    if (fuel <= 99 && fuelState === 1) {
        fuel++;
    }
    if (fuel === 100) {
        fuelState = 0;
    }
}