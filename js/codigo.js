
var gameInfo = {

    variables: {
        lastMove: '',
        moveUp: false,
        moveDown: true,
        moveRight: true,
        moveLeft: false,
        clearBtnDown: '',
        clearBtnUP: '',
        clearBtnRight: '',
        clearBtnLeft: '',
        clearColision: '',
        taleCounter: 3,
        snakeLong: 2,
        score: 0
    },

    cubesInfo: {
        food: 315
    },

    snake: {
        body: {
            head: 56,
            tale1: 2,
            tale2: 29
        },
    },
};

function contextCanvas() {
    //Regresa el nodo DOM del elemento canvas.
    const canvas = document.getElementById('canvas');
    //Se accede al contexto del dibujo, en este caso es un contexto 2d dato: para un contexto 3d se usa webGL.
    var ctx = canvas.getContext('2d');

    return ctx;
}

function deleteSnake(x) {
    var snake = x;
    var gameVar = gameInfo.variables;
    var body = Object.values(snake).reverse();
    clearCube([snake.head]);

    for (let i = 0; i < gameVar.snakeLong; i++) {
        clearCube([body[i]]);
    }

}

function spawnFood() {
    var max = 809;
    var min = 76;

    var cubes = gameInfo.cubesInfo;
    var num = Math.floor(Math.random() * (max - min + 1)) + min;

    clearCube([cubes.food]);
    cubes.food = num;
    drawCube([cubes.food], 'red');
}

function foodErr() {
    var snake = gameInfo.snake.body;
    var gameVar = gameInfo.variables;
    var cubes = gameInfo.cubesInfo;
    var position = cubes['cube' + cubes.food];
    var body = Object.values(snake).reverse();

    for (let i = 0; i < gameVar.snakeLong; i++) {
        if (body[i] == cubes.food) {
            spawnFood();

        } else if (position.positionX == 0 || position.positionX == 520) {
            spawnFood();
        }
    }

}

function foodColision() {
    var head = gameInfo.snake.body.head;
    var food = gameInfo.cubesInfo.food;

    if (head == food) {
        spawnFood();
        addBodyPart();
        setScore();
    }
}

function borderColision() {
    var snake = gameInfo.snake.body;
    var headInfo = gameInfo.cubesInfo['cube' + snake.head];

    if (snake.head < 1 || snake.head > 810) {
        resetGame();
    }

    if (headInfo.positionX == 0 || headInfo.positionX == 520) {
        deleteSnake(snake);
        resetGame();
    }
}

function snakeColision() {
    var snake = gameInfo.snake.body;
    var gameVar = gameInfo.variables;
    var body = Object.values(snake).reverse();

    for (let i = 0; i < gameVar.snakeLong; i++) {
        if (snake.head == body[i]) {
            deleteSnake(snake);
            resetGame();
        }
    }

}

function gameColisions() {
    let clear = gameInfo.variables;
    clear.clearColision = setInterval(function () {
        foodErr();
        foodColision();
        borderColision();
        snakeColision();
    }, 1);
}

function drawSnake(x) {
    var snake = x;
    var color = 1;
    var gameVar = gameInfo.variables;
    var body = Object.values(snake).reverse();
    drawCube([snake.head], 'green3');

    for (let i = 0; i < gameVar.snakeLong; i++) {
        if(color == 1){
            drawCube([body[i]], 'green2');
            color = 0;
        }else{
            drawCube([body[i]], 'green');
            color = 1;
        }
    }
}

function addBodyPart() {
    var gameVar = gameInfo.variables;
    gameVar.snakeLong = gameVar.snakeLong + 1;
}

function drawTable() {
    var cube = contextCanvas();

    var tableInfo = {
        positionX: 0,
        positionY: 0,
        cubeCounter: 1,
        cubeColor: '',
        color: 0
    }

    for (let i = 1; i <= 30; i++) {
        for (let i = 1; i <= 27; i++) {
            if (tableInfo.positionX == 0 || tableInfo.positionX == 520) {
                tableInfo.cubeColor = 'rgb(128, 128, 128)';
                cube.fillStyle = tableInfo.cubeColor;

            } else if (tableInfo.color == 0) {

                tableInfo.cubeColor = 'rgb(200, 200, 200)';
                cube.fillStyle = tableInfo.cubeColor;
                tableInfo.color = 1

            } else if (tableInfo.color == 1) {

                tableInfo.cubeColor = 'rgb(250 ,250, 250)';
                cube.fillStyle = tableInfo.cubeColor;
                tableInfo.color = 0;

            }
            cube.fillRect(tableInfo.positionX, tableInfo.positionY, 20, 20);

            gameInfo.cubesInfo['cube' + tableInfo.cubeCounter] = {

                name: 'cube ' + tableInfo.cubeCounter,
                color: tableInfo.cubeColor,
                positionX: tableInfo.positionX,
                positionY: tableInfo.positionY,
                width: 20,
                height: 20
            }

            tableInfo.cubeCounter = tableInfo.cubeCounter + 1;
            tableInfo.positionX = tableInfo.positionX + 20;
        }

        tableInfo.positionX = 0;
        tableInfo.positionY = tableInfo.positionY + 20;
    }
}

function drawCube(a, b) {
    var canvas = contextCanvas();
    var arrayCubes = a;
    var lengthArray = arrayCubes.length;
    var colors = {
        red: 'rgb(140, 1, 1)',
        green: 'rgb(1, 150, 1)',
        green2: 'rgb(9, 133, 9)',
        green3: 'rgb(9, 110, 9)'
    }
    canvas.fillStyle = colors[b];

    for (let i = 0; i < lengthArray; i++) {
        var b = arrayCubes[i];
        var info = gameInfo.cubesInfo['cube' + b];
        canvas.fillRect(info.positionX, info.positionY, 20, 20);
    }

}

function clearCube(x) {
    var canvas = contextCanvas();
    var arrayCubes = x;
    var lengthArray = arrayCubes.length;

    for (let i = 0; i < lengthArray; i++) {
        var b = arrayCubes[i];
        var info = gameInfo.cubesInfo['cube' + b];
        canvas.fillStyle = info.color;
        canvas.fillRect(info.positionX, info.positionY, 20, 20);
    }
}

function setTale(x) {
    var setTale = gameInfo.snake.body;
    var gameVar = gameInfo.variables;

    setTale['tale' + gameVar.taleCounter] = x;
    gameVar.taleCounter = gameVar.taleCounter + 1;
}

function moveDown() {
    var snake = gameInfo.snake.body;
    var clear = gameInfo.variables;

    if (clear.moveDown) {

        clearInterval(clear.clearBtnUP);
        clearInterval(clear.clearBtnRight);
        clearInterval(clear.clearBtnLeft);

        clear.clearBtnDown = setInterval(function () {

            deleteSnake(gameInfo.snake.body);
            setTale(snake.head);
            snake.head = snake.head + 27;
            drawSnake(gameInfo.snake.body);

        }, 160);

        clear.moveDown = false;
        clear.moveUp = false;
        clear.moveRight = true;
        clear.moveLeft = true;
        clear.lastMove = 'down';
    }
}

function moveUp() {
    var snake = gameInfo.snake.body;
    var clear = gameInfo.variables;


    if (clear.moveUp) {

        clearInterval(clear.clearBtnDown);
        clearInterval(clear.clearBtnRight);
        clearInterval(clear.clearBtnLeft);

        clear.clearBtnUP = setInterval(function () {

            deleteSnake(gameInfo.snake.body);
            setTale(snake.head);
            snake.head = snake.head - 27;
            drawSnake(gameInfo.snake.body);

        }, 160);

        clear.moveUp = false;
        clear.moveDown = false;
        clear.moveRight = true;
        clear.moveLeft = true;
        clear.lastMove = 'up';
    }
}

function moveRight() {
    var snake = gameInfo.snake.body;
    var gameV = gameInfo.variables;

    if (gameV.moveRight) {

        clearInterval(gameV.clearBtnDown);
        clearInterval(gameV.clearBtnUP);
        clearInterval(gameV.clearBtnLeft);

        gameV.clearBtnRight = setInterval(function () {

            deleteSnake(gameInfo.snake.body);
            setTale(snake.head);
            snake.head = snake.head + 1;
            drawSnake(gameInfo.snake.body);

        }, 160);

        gameV.moveRight = false;
        gameV.moveLeft = false;
        gameV.moveDown = true;
        gameV.moveUp = true;
        gameV.lastMove = 'right';
    }
}

function moveLeft() {
    var snake = gameInfo.snake.body;
    var gameV = gameInfo.variables;

    if (gameV.moveLeft) {

        clearInterval(gameV.clearBtnDown);
        clearInterval(gameV.clearBtnUP);
        clearInterval(gameV.clearBtnRight);

        gameV.clearBtnLeft = setInterval(function () {

            deleteSnake(gameInfo.snake.body);
            setTale(snake.head);
            snake.head = snake.head - 1;
            drawSnake(gameInfo.snake.body);

        }, 160);

        gameV.moveLeft = false;
        gameV.moveRight = false;
        gameV.moveDown = true;
        gameV.moveUp = true;
        gameV.lastMove = 'left';
    }
}

function setScore() {
    const score = document.getElementById('score');
    var gameVar = gameInfo.variables;
    gameVar.score = gameVar.score + 1;
    score.innerHTML = 'Snake score: ' + gameVar.score;
}

function gamePause() {
    var gameV = gameInfo.variables;
    var btn = document.getElementById('pause');
    var alert = document.getElementById('alert');

    if (btn.value == '||') {
        clearInterval(gameV.clearBtnDown);
        clearInterval(gameV.clearBtnUP);
        clearInterval(gameV.clearBtnRight);
        clearInterval(gameV.clearBtnLeft);
        gameV.moveDown = false;
        gameV.moveUp = false;
        gameV.moveRight = false;
        gameV.moveLeft = false;
        alert.innerHTML = '-- Game Paused --';
        btn.value = '▷';

    } else {
        switch (gameV.lastMove) {
            case 'down':
                gameV.moveDown = true;
                setTimeout(() => moveDown(), 500);
                break;
            case 'up':
                gameV.moveUp = true;
                setTimeout(() => moveUp(), 500);
                break;
            case 'right':
                gameV.moveRight = true;
                setTimeout(() => moveRight(), 500);
                break;
            case 'left':
                gameV.moveLeft = true;
                setTimeout(() => moveLeft(), 500);
                break;
            default:
                gameV.moveUp = false;
                gameV.moveDown = true;
                gameV.moveRight = true;
                gameV.moveLeft = false;
                break;
        }
        btn.value = '||';
        alert.innerHTML = '';
    }
}

function gameListener() {

    const canvas = document.getElementById('canvas');
    const btnPause = document.getElementById('pause');
    const btnRes = document.getElementById('reset');
    let startX, startY, endX, endY;


    canvas.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    canvas.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;

        const X = endX - startX;
        const Y = endY - startY;

        if (Math.abs(X) > Math.abs(Y)) {
            if (X > 0) {
                moveRight();
            } else {
                moveLeft();
            }
        } else {
            if (Y > 0) {
                moveDown();
            } else {
                moveUp();
            }
        }

    });

    document.addEventListener('keyup', function (e) {
        e.preventDefault();
        var codigoTecla = e.KeyCode || e.which;

        if (codigoTecla == 83) {
            moveDown();
        } else if (codigoTecla == 87) {
            moveUp();
        } else if (codigoTecla == 68) {
            moveRight();
        } else if (codigoTecla == 65) {
            moveLeft();
        } else if (codigoTecla == 27) {
            gamePause();
        }else if(codigoTecla == 82){
            resetGame();
        }
    });


    btnPause.addEventListener('click', function (e) {
        e.preventDefault();
        gamePause();
    });

    btnRes.addEventListener('click', function(e){
        e.preventDefault();
        resetGame();
    });


}

function resetGame() {
    var gameV = gameInfo.variables;
    var alert = document.getElementById('alert');

    clearInterval(gameV.clearBtnDown);
    clearInterval(gameV.clearBtnUP);
    clearInterval(gameV.clearBtnRight);
    clearInterval(gameV.clearBtnLeft);
    clearInterval(gameV.clearColision);
    alert.innerHTML = '-- Game Over --';
    setTimeout(()=> location.reload(), 500);
}

function gameStart() {
    drawTable();
    gameListener();
    drawSnake(gameInfo.snake.body);
    spawnFood();
    gameColisions();
}

gameStart();







































