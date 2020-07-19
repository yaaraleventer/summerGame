var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");

let board = [];

for (let i = 0; i < 7; i++) {
    board[i] = new Array(6);
}
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
        board[i][j] = 'white';

    }

}
function circle(xCircle, yCircle, color) {
    ctx.beginPath();
    ctx.arc(xCircle, yCircle, 30, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

}
function rect(xRect, yRect, widthRect, heightRect) {

    ctx.beginPath();
    ctx.rect(xRect, yRect, widthRect, heightRect);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.fill();
}
function drawBoard() {
    rect(200, 220, 700, 600);
    let x = 250;
    let y = 270;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {

            circle(x, y, board[i][j]);
             x = x + 100;
        }
        x = 250;
        y = y + 100;
    }
}
drawBoard()
circle(250, 170, "yellow");
document.addEventListener("keydown", keyDownHandler, false);
    let x = 250;
    let y = 170;
function keyDownHandler(event) {
    var makash = event.keyCode;
    circle(x, y, "yellow");
    if (makash == 39 && x<=820) {//right
        for (var i = 0; i < 5; i++) {
            x += 20;
            ctx.clearRect(0, 0, c.width, c.height);
            drawBoard();
            circle(x, y, "yellow");
        }   
    }
    if (makash == 37 && x>250) {//left
        for (var i = 0; i < 5; i++) {
            x -= 20;
            ctx.clearRect(0, 0, c.width, c.height);
            drawBoard();
            circle(x, y, "yellow");
        }
    }

}

