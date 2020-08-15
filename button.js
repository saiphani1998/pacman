// var intervalId = '';

// function moveUp() {
//     intervalId = setInterval(function () {
//     pacman.y -= pacman.speed;
//     pacman.pacdir = 96;
//     if (pacman.y < 0) {
//         pacman.y = canvas.height - 32;
//     }
//     switchMouth();
//     }, 100);
// }

function moveUp() {
    pacman.y -= pacman.speed;
    pacman.pacdir = 96;
    if (pacman.y < 0) {
        pacman.y = canvas.height - 32;
    }
    switchMouth();
}

function moveLeft() {
    pacman.x -= pacman.speed;
    pacman.pacdir = 64;
    if (pacman.x < 0) {
        pacman.x = canvas.width - 32;
    }
    switchMouth();
}

function moveRight() {
    pacman.x += pacman.speed;
    pacman.pacdir = 0;
    if (pacman.x >= (canvas.width - 32)) {
        pacman.x = 0;
    }
    switchMouth();
}

function moveDown() {
    pacman.y += pacman.speed;
    pacman.pacdir = 32;
    if (pacman.y >= (canvas.height - 32)) {
        pacman.y = 0;
    }
    switchMouth();
}

function switchMouth() {
    if (pacman.pacmouth == 320) {
        pacman.pacmouth = 352;
    } else {
        pacman.pacmouth = 320;
    }
}

// function out() {
//     clearInterval(intervalId);
// };
