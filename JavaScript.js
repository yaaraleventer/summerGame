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
function biggerCircle(xCircle, yCircle, color) {
    ctx.beginPath();
    ctx.arc(xCircle, yCircle, 35, 0, 2 * Math.PI);
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
let counter = 0;
let column = [];//מערך של הטורים 
for (let i = 0; i <= 7; i++) {
    column[i] = 5;
}
function freeSpace(colNum, colorCircle) { // פונקציה שבודקת מה המקום הפנוי הנמוך ביותר ומורידה את הדיסקית לאותו מקום ומקבלת את מספר הטור שאליו הורידו עיגול
    counter = 0;
    if (column[colNum-1] <= -1) {
        alert('column is full');
    }
    else {
        drawCircle(170, colorCircle, counter, colNum);
    }
}


//(5-rows[rowNum-1])*20+20      מספר הפעמים שהאינטרוול יפעל בקפיצות של חמש

freeSpace(3, 'yellow');
function drawCircle(y, colorCircle, i, colNum) {
    let x = (colNum + 1) * 100 + 50;
    if (i != 0) {
        circle(x, y - 100, 'white');
    }
    if (i == 1) {
        biggerCircle(x, 170, 'white');
    }
    circle(x, y, colorCircle);
    if (i <= column[colNum - 1]+1) {
        setTimeout(function () {
            drawCircle(y + 100, colorCircle, i, colNum);
        }, 400)
        i++;
    }
    else {
        board[column[colNum - 1]][colNum - 1] = colorCircle;//משנים את צבע התא במקום של הטור שנבחר והשורה האחרונה שפנויה       
        ctx.clearRect(0, 0, 1100, 860);
        drawBoard();
        column[colNum - 1] = column[colNum - 1] - 1;
    }
}
