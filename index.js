var score = 0;
var ghostScore = 0;
var countBlink = 10
var pacman = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    size: 32,
    speed: 5,
}
class Ghost {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.moving = 0;
        this.dirx = 0;
        this.diry = 0;
        this.flash = 0;
        this.ghostEat = false;
        this.present = false;
        this.size = 32;
    }
}
var ghost1 = new Ghost(150, 200);
var ghost2 = new Ghost(350, 350);

var powerDot = {
    x: 10,
    y: 10,
    powerup: false,
    pCountDown: 0,
    ghostNum: 0,
    ghostNum2: 0,
}

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;

// Import image
var mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "pac.png";

var keyClick = {};
document.addEventListener("keydown", function (event) {
    keyClick[event.keyCode] = true;
    movePlayer(keyClick);
}, false);

document.addEventListener("keyup", function (event) {
    delete keyClick[event.keyCode];
}, false);

// Move actions
function movePlayer(keyClick) {
    // Capture the key value
    if (37 in keyClick) {
        pacman.x -= pacman.speed;
        pacman.pacdir = 64;
    }
    if (38 in keyClick) {
        pacman.y -= pacman.speed;
        pacman.pacdir = 96;
    }
    if (39 in keyClick) {
        pacman.x += pacman.speed;
        pacman.pacdir = 0;
    }
    if (40 in keyClick) {
        pacman.y += pacman.speed;
        pacman.pacdir = 32;
    }
    // Prevent run off-screen
    if (pacman.x >= (canvas.width - 32)) {
        pacman.x = 0;
    }
    if (pacman.y >= (canvas.height - 32)) {
        pacman.y = 0;
    }
    if (pacman.x < 0) {
        pacman.x = canvas.width - 32;
    }
    if (pacman.y < 0) {
        pacman.y = canvas.height - 32;
    }
    // Open/Close pacman mouth
    if (pacman.pacmouth == 320) {
        pacman.pacmouth = 352;
    } else {
        pacman.pacmouth = 320;
    }
    render();
}

// Once image is ready
function checkReady() {
    this.ready = true;
    playGame();
}

// Game play on loop
function playGame() {
    render();
    requestAnimationFrame(playGame);
}

// Random number function with defined limits
function myNum(n) {
    return Math.floor(Math.random() * n);
}

// Draw on camvas
function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Check if powerup dot is on screen
    if (!powerDot.powerup && powerDot.pCountDown < 5) {
        powerDot.x = myNum(420) + 30;
        powerDot.y = myNum(250) + 30;
        powerDot.powerup = true;
    }

    // Check if ghost is on screen
    if (!ghost1.present) {
        ghost1.ghostNum = myNum(5) * 64;
        ghost1.x = myNum(450);
        ghost1.y = myNum(250) + 30;
        ghost1.present = true;
    }

    // Check if ghost2 is on screen
    if (!ghost2.present) {
        ghost2.ghostNum = myNum(5) * 64;
        ghost2.x = myNum(450);
        ghost2.y = myNum(250) + 30;
        ghost2.present = true;
    }

    // Move ghost1
    function moveEnemy(ghost) {
        if (ghost.moving < 0) {
            ghost.moving = (myNum(20) * 3) + myNum(1);
            ghost.speed = myNum(1) + 1;
            ghost.dirx = 0;
            ghost.diry = 0;
            if (powerDot.ghostEat) {
                ghost.speed *= -1;
            }
            if ((ghost.moving % 2) == 0) {
                if (pacman.x < ghost.x) {
                    ghost.dirx = -ghost.speed;
                } else {
                    ghost.dirx = ghost.speed;
                }
            } else {
                if (pacman.y < ghost.y) {
                    ghost.diry = -ghost.speed;
                } else {
                    ghost.diry = ghost.speed;
                }
            }
        }

        ghost.moving--;
        ghost.x += ghost.dirx;
        ghost.y += ghost.diry;

        // Prevent ghost run off-screen
        if (ghost.x >= (canvas.width - 32)) {
            ghost.x = 0;
        }
        if (ghost.y >= (canvas.height - 32)) {
            ghost.y = 0;
        }
        if (ghost.x < 0) {
            ghost.x = canvas.width - 32;
        }
        if (ghost.y < 0) {
            ghost.y = canvas.height - 32;
        }
        // Ghost Blinking
        if (countBlink > 0) {
            countBlink--;
        } else {
            countBlink = 20;
            if (ghost.flash == 0) {
                ghost.flash = 32;
            } else {
                ghost.flash = 0;
            }
        }
    }
    moveEnemy(ghost1);
    moveEnemy(ghost2);

    // Collision Detection with Ghost
    function detectGhostCollision(ghost) {
        if (pacman.x <= (ghost.x + 26) &&
            ghost.x <= (pacman.x + 26) &&
            pacman.y <= (ghost.y + 26) &&
            ghost.y <= (pacman.y + 32)) {
            console.log('GHOST!');
            if (powerDot.ghostEat) {
                score++;
            } else {
                ghostScore++
            }
            pacman.x = 10;
            pacman.y = 100;
            ghost.x = 300;
            ghost.y = 200;
            powerDot.pCountDown = 0;
        }
    }
    detectGhostCollision(ghost1);
    detectGhostCollision(ghost2);

    // Collision Detection with powerDot
    if (pacman.x <= (powerDot.x) &&
        powerDot.x <= (pacman.x + 32) &&
        pacman.y <= (powerDot.y) &&
        powerDot.y <= (pacman.y + 32)) {
        console.log('HIT!');
        powerDot.powerup = false;
        powerDot.pCountDown = 500;
        powerDot.ghostNum = ghost1.ghostNum;
        powerDot.ghostNum2 = ghost2.ghostNum;
        ghost1.ghostNum = 384;
        ghost2.ghostNum = 384;
        powerDot.x = 0;
        powerDot.y = 0;
        powerDot.ghostEat = true;
        pacman.speed = 10;
    }

    // PowerUp countdown
    if (powerDot.ghostEat) {
        powerDot.pCountDown--;
        if (powerDot.pCountDown <= 0) {
            powerDot.ghostEat = false;
            ghost1.ghostNum = powerDot.ghostNum;
            ghost2.ghostNum = powerDot.ghostNum2;
            pacman.speed = 5;
        }
    }

    // Draw powerup dot
    if (powerDot.powerup) {
        context.fillStyle = "#ffff00";
        context.beginPath();
        context.arc(powerDot.x, powerDot.y, 10, 0, 2 * Math.PI)
        context.closePath();
        context.fill();
    }

    // Score Panel
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Pacman: " + score + " vs Ghost: " + ghostScore, 2, 18)

    // Draw Characters
    function drawGhost(ghost) {
        context.drawImage(mainImage, ghost.ghostNum, ghost.flash, 32, 32, ghost.x, ghost.y, ghost.size, ghost.size);
    }
    drawGhost(ghost1);
    drawGhost(ghost2);
    context.drawImage(mainImage, pacman.pacmouth, pacman.pacdir, 32, 32, pacman.x, pacman.y, pacman.size, pacman.size);
}
