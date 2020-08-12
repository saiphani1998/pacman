var score = 0;
var gscore = 0;
var ghost = false;
var ghost2 = false;
var countBlink = 10
var player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32,
    speed: 5,
}

var enemy = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghostEat: false,
}

var enemy2 = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghostEat: false,
}

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
    move(keyClick);
}, false);

document.addEventListener("keyup", function (event) {
    delete keyClick[event.keyCode];
}, false);

// Move actions
function move(keyClick) {
    // Capture the key value
    if (37 in keyClick) {
        player.x -= player.speed;
        player.pacdir = 64;
    }
    if (38 in keyClick) {
        player.y -= player.speed;
        player.pacdir = 96;
    }
    if (39 in keyClick) {
        player.x += player.speed;
        player.pacdir = 0;
    }
    if (40 in keyClick) {
        player.y += player.speed;
        player.pacdir = 32;
    }
    // Prevent run off-screen
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    }
    if (player.y >= (canvas.height - 32)) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = canvas.width - 32;
    }
    if (player.y < 0) {
        player.y = canvas.height - 32;
    }
    // Open/Close pacman mouth
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
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
    if (!ghost) {
        enemy.ghostNum = myNum(5) * 64;
        enemy.x = myNum(450);
        enemy.y = myNum(250) + 30;
        ghost = true;
    }

    // Check if ghost2 is on screen
    if (!ghost2) {
        enemy2.ghostNum = myNum(5) * 64;
        enemy2.x = myNum(450);
        enemy2.y = myNum(250) + 30;
        ghost2 = true;
    }

    // Move enemy
    if (enemy.moving < 0) {
        enemy.moving = (myNum(20) * 3) + myNum(1);
        enemy.speed = myNum(2) + 1;
        enemy.dirx = 0;
        enemy.diry = 0;
        if (powerDot.ghostEat) {
            enemy.speed *= -1;
        }
        if ((enemy.moving % 2) == 0) {
            if (player.x < enemy.x) {
                enemy.dirx = -enemy.speed;
            } else {
                enemy.dirx = enemy.speed;
            }
        } else {
            if (player.y < enemy.y) {
                enemy.diry = -enemy.speed;
            } else {
                enemy.diry = enemy.speed;
            }
        }
    }

    enemy.moving--;
    enemy.x += enemy.dirx;
    enemy.y += enemy.diry;

    // Prevent ghost run off-screen
    if (enemy.x >= (canvas.width - 32)) {
        enemy.x = 0;
    }
    if (enemy.y >= (canvas.height - 32)) {
        enemy.y = 0;
    }
    if (enemy.x < 0) {
        enemy.x = canvas.width - 32;
    }
    if (enemy.y < 0) {
        enemy.y = canvas.height - 32;
    }

    // Move enemy2
    if (enemy2.moving < 0) {
        enemy2.moving = (myNum(20) * 3) + myNum(1);
        enemy2.speed = myNum(2) + 1;
        enemy2.dirx = 0;
        enemy2.diry = 0;
        if (powerDot.ghostEat) {
            enemy2.speed *= -1;
        }
        if ((enemy2.moving % 2) == 0) {
            if (player.x < enemy2.x) {
                enemy2.dirx = -enemy2.speed;
            } else {
                enemy2.dirx = enemy2.speed;
            }
        } else {
            if (player.y < enemy2.y) {
                enemy2.diry = -enemy2.speed;
            } else {
                enemy2.diry = enemy2.speed;
            }
        }
    }

    enemy2.moving--;
    enemy2.x += enemy2.dirx;
    enemy2.y += enemy2.diry;

    // Prevent run off-screen
    if (enemy2.x >= (canvas.width - 32)) {
        enemy2.x = 0;
    }
    if (enemy2.y >= (canvas.height - 32)) {
        enemy2.y = 0;
    }
    if (enemy2.x < 0) {
        enemy2.x = canvas.width - 32;
    }
    if (enemy2.y < 0) {
        enemy2.y = canvas.height - 32;
    }

    // Collision Detection with ghost1
    if (player.x <= (enemy.x + 26) &&
        enemy.x <= (player.x + 26) &&
        player.y <= (enemy.y + 26) &&
        enemy.y <= (player.y + 32)) {
        console.log('GHOST!');
        if (powerDot.ghostEat) {
            score++;
        } else {
            gscore++
        }
        player.x = 10;
        player.y = 100;
        enemy.x = 300;
        enemy.y = 200;
        powerDot.pCountDown = 0;
    }

    // Collision Detection with ghost2
    if (player.x <= (enemy2.x + 26) &&
        enemy2.x <= (player.x + 26) &&
        player.y <= (enemy2.y + 26) &&
        enemy2.y <= (player.y + 32)) {
        console.log('GHOST!');
        if (powerDot.ghostEat) {
            score++;
        } else {
            gscore++
        }
        player.x = 10;
        player.y = 100;
        enemy2.x = 300;
        enemy2.y = 200;
        powerDot.pCountDown = 0;
    }

    // Collision Detection with powerDot
    if (player.x <= (powerDot.x) &&
        powerDot.x <= (player.x + 32) &&
        player.y <= (powerDot.y) &&
        powerDot.y <= (player.y + 32)) {
        console.log('HIT!');
        powerDot.powerup = false;
        powerDot.pCountDown = 500;
        powerDot.ghostNum = enemy.ghostNum;
        powerDot.ghostNum2 = enemy2.ghostNum;
        enemy.ghostNum = 384;
        enemy2.ghostNum = 384;
        powerDot.x = 0;
        powerDot.y = 0;
        powerDot.ghostEat = true;
        player.speed = 10;
    }

    // PowerUp countdown
    if (powerDot.ghostEat) {
        powerDot.pCountDown--;
        if (powerDot.pCountDown <= 0) {
            powerDot.ghostEat = false;
            enemy.ghostNum = powerDot.ghostNum;
            enemy2.ghostNum = powerDot.ghostNum;
            player.speed = 5;
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

    // Enemy Blinking
    if (countBlink > 0) {
        countBlink--;
    } else {
        countBlink = 20;
        if (enemy.flash == 0) {
            enemy.flash = 32;
            enemy2.flash = 32;
        } else {
            enemy.flash = 0;
            enemy2.flash = 0;
        }
    }

    // Score Panel
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Pacman: " + score + " vs Ghost: " + gscore, 2, 18)

    // Draw Characters
    context.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 32, 32);
    context.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 32, 32);
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, player.psize, player.psize);
}
