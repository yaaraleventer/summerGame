var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");

let board = [];

for (let i = 0; i < 7; i++) {
    board[i] = new Array(6);
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
            board[i][j] = 'white';
            circle(x, y, 'white');
             x = x + 100;
        }
        x = 250;
        y = y + 100;
    }
}
drawBoard()