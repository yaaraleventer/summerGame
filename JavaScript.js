var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");

let board = [];
let inDropping = false;
let xText = 270;


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
        circle(550, 170, color);
        inDropping = false;
    }
    else {
        drawCircle(170, colorCircle, counter, colNum);
    }
}


//(5-rows[rowNum-1])*20+20      מספר הפעמים שהאינטרוול יפעל בקפיצות של חמש


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
        }, 200)
        i++;
    }
    else {
        board[column[colNum - 1]][colNum - 1] = colorCircle;//משנים את צבע התא במקום של הטור שנבחר והשורה האחרונה שפנויה       
        ctx.clearRect(0, 0, 1100, 860);
        drawBoard();
        column[colNum - 1] = column[colNum - 1] - 1;
        if (color == 'yellow') {
            color = 'red';
            xText = 300;
        }
        else {
            color = 'yellow';
            xText = 270;
        }
        circle(550, 170, color);
        inDropping = false;
        ctx.font = "60px Arial";
        ctx.fillText("The " + color + " player turn" , xText, 50);
    }
}

circle(550, 170, "yellow");
ctx.font = "60px Arial";
ctx.fillText("The yellow player turn", 270, 50);
document.addEventListener("keydown", keyDownHandler, false);
let x = 550;
let y = 170;
let color = 'yellow';
function keyDownHandler(event) {
    var makash = event.keyCode;
    if (inDropping) {
        return;
    }
    //circle(x, y, color);
    if (makash == 39 && x <= 820) {//right
        for (var i = 0; i < 5; i++) {
            x += 20;
            ctx.clearRect(0, 0, c.width, c.height);
            drawBoard();
            circle(x, y, color);
        }
        ctx.font = "60px Arial";
        ctx.fillText("The " + color + " player turn", xText, 50);
    }
    if (makash == 37 && x > 250) {//left
        for (var i = 0; i < 5; i++) {
            x -= 20;
            ctx.clearRect(0, 0, c.width, c.height);
            drawBoard();
            circle(x, y, color);
            ctx.font = "60px Arial";
            ctx.fillText("The " + color + " player turn", xText, 50);
        }
    }
    if (makash == 13) {
        inDropping = true;
        circle(x, y, "white");
        freeSpace(((x - 50) / 100 - 1), color);
        x = 550;
    }
}

   

