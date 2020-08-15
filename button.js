var intervalId = '';

function moveUp() {
    intervalId = setInterval(function () {
        player.y -= player.speed;
        player.pacdir = 96;
        if (player.y < 0) {
            player.y = canvas.height - 32;
        }
        switchMouth();
    }, 100);
}

function moveLeft() {
    intervalId = setInterval(function () {
        player.x -= player.speed;
        player.pacdir = 64;
        if (player.x < 0) {
            player.x = canvas.width - 32;
        }
        switchMouth();
    }, 100);
}

function moveRight() {
    intervalId = setInterval(function () {
        player.x += player.speed;
        player.pacdir = 0;
        if (player.x >= (canvas.width - 32)) {
            player.x = 0;
        }
        switchMouth();
    }, 100);
}

function moveDown() {
    intervalId = setInterval(function () {
        player.y += player.speed;
        player.pacdir = 32;
        if (player.y >= (canvas.height - 32)) {
            player.y = 0;
        }
        switchMouth();
    }, 100);
}

function switchMouth() {
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
    }
}

function out() {
    clearInterval(intervalId);
};
