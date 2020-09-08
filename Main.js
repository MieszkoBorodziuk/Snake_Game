const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');


let score = 0;
canv.width = 1000;
canv.height = 500;
let eat = {
    x: 200,
    y: 300
};
let way = "right";
const snakeSize = 10;
let snake = [];
snake[0] = {
    x: 500,
    y: 250
};
snake[1] = {
    x: 490,
    y: 250
};
snake[2] = {
    x: 470,
    y: 250
};


topcanvas = canv.offsetTop;


function crateSnake() {

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);

    }


}

function collisionWall(newHead) {

    if (newHead.x <= -10 || newHead.x >= 1000 || newHead.y <= -10 || newHead.y >= 500) {
        way = "";

    }
}

function collisionBody(newHead) {

    for (let i = 1; i < snake.length; i++)
        if (newHead.x === snake[i].x && newHead.y === snake[i].y)
            alert("Ups!")

}

function takeEat(newHead) {
    if (eat.x === newHead.x && eat.y === newHead.y) {
        eat.x = Math.floor(Math.random() * 101) * 10;
        eat.y = Math.floor(Math.random() * 51) * 10;


        ShowBonus();
        score ++;
        snake.push(newHead.x, newHead.y);
        document.getElementById("Score").innerHTML = "Score: "+ score;
    }

}


function snakeMove(e) {
    if ((e.key === 'ArrowLeft') && (way !== "right")) {
        way = "left";
    }
    if ((e.key === 'ArrowRight') && (way !== "left")) {
        way = "right";
    }
    if ((e.key === 'ArrowUp') && (way !== "down")) {
        way = "up";
    }
    if ((e.key === 'ArrowDown') && (way !== "up")) {
        way = "down";
    }
}

function ShowBonus() {

    ctx.fillStyle = "white";
    ctx.fillRect(eat.x, eat.y, 10, 10);


}

function box() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1000, 500)
}

function game() {

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (way === "left") {
        snakeX -= 10;
    }
    if (way === "right") {
        snakeX += 10;
    }
    if (way === "up") {
        snakeY -= 10;
    }
    if (way === "down") {
        snakeY += 10;
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    };
    collisionWall(newHead);

    if (way !== "") {
        snake.unshift(newHead);
        snake.pop();
    }
    box();
    crateSnake();
    ShowBonus();
    takeEat(newHead);
    collisionBody(newHead);


}

window.addEventListener('keydown', snakeMove);
setInterval(game, 150);


