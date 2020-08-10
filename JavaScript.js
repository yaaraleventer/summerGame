var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");

ctx.font = "70px Arial";
ctx.fillText("PRESS SPACE TO START", 100, 380); //יש ללחוץ על מקש הרווח כדי להתחיל את המשחק
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(event) {
    var x = event.keyCode;
    if (x == 32) {
        ctx.clearRect(0, 0, 1100, 860);
        let board = [];
        let inDropping = false;

        for (let i = 0; i < 7; i++) {
            board[i] = new Array(6);
        }
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
                board[i][j] = 'white';
            }
        }
        function circle(xCircle, yCircle, color) {
            /* הפעולה מציירת עיגול
             פרמטרים:
             xCircle - מיקום האיקס של מרכז המעגל
            yCircle - מיקום הווי של מרכז המעגל
            color - הצבע של העיגול
            הפעולה לא מחזירה ערך*/
            ctx.beginPath();
            ctx.arc(xCircle, yCircle, 30, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }

        function biggerCircle(xCircle, yCircle, color) {
            /* הפעולה מציירת עיגול גדול יותר מאשר העיגול שמצוייר בפעולה הקודמת, על מנת לכסות את המסגרת של העיגול שנשארת
             פרמטרים:
             xCircle - מיקום האיקס של מרכז המעגל
            yCircle - מיקום הווי של מרכז המעגל
            color - הצבע של העיגול
            הפעולה לא מחזירה ערך*/
            ctx.beginPath();
            ctx.arc(xCircle, yCircle, 35, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }

        function rect(xRect, yRect, widthRect, heightRect) {
            /*הפעולה מציירת מלבן
             פרמטרים: 
             xRect- האיקס של הקודקוד השמאלי למעלה של המלבן
             yRect- הווי של הקודקוד השמאלי למעלה של המלבן 
             widthRect- רוחב המלבן 
             heightRect - גובה המלבן
             הפעולה לא מחזירה ערך*/

            ctx.beginPath();
            ctx.rect(xRect, yRect, widthRect, heightRect);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.fillStyle = 'blue';
            ctx.fill();
        }

        function drawBoard() {
            /* הפעולה מציירת את הלוח של המשחק
             היא לא מקבלת ערכים ולא מחזירה ערכים*/
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
            if (column[colNum - 1] <= -1) {
                alert('column is full');
                circle(550, 170, color);
                inDropping = false;
            }
            else {
                drawCircle(170, colorCircle, counter, colNum);
            }
        }

        function drawCircle(y, colorCircle, i, colNum) {
            let x = (colNum + 1) * 100 + 50;
            if (i != 0) {
                circle(x, y - 100, 'white');
            }
            if (i == 1) {
                biggerCircle(x, 170, 'white');
            }
            circle(x, y, colorCircle);
            if (i <= column[colNum - 1] + 1) {
                setTimeout(function () {
                    drawCircle(y + 100, colorCircle, i, colNum);
                }, 200)
                i++;
            }
            else {
                changeColorInBoard(colNum, colorCircle);
                color = changeColor(color);
                circle(550, 170, color);
                inDropping = false;
                ctx.font = "60px Arial";
                ctx.fillText("The " + color + " player turn", 270, 50);
                check_win(colNum, column[colNum - 1] + 1, color);
            }
        }

        function changeColorInBoard(colNum, colorCircle) {
            board[column[colNum - 1]][colNum - 1] = colorCircle;
            ctx.clearRect(0, 0, 1100, 860);
            drawBoard();
            column[colNum - 1] = column[colNum - 1] - 1;
        }

        function changeColor(color) {
            if (color == 'yellow') {
                color = 'red';
            }
            else {
                color = 'yellow';
            }
            return color;
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
                return true;
            }
            if (x > 250 && x <= 820) {
                for (var i = 0; i < 5; i++) {
                    if (makash == 37) {//left
                        x -= 20;
                    }
                    if (makash == 39) {//right
                        x += 20;
                    }
                    ctx.clearRect(0, 0, c.width, c.height);
                    drawBoard();
                    circle(x, y, color);
                }
            }
            ctx.font = "60px Arial";
            ctx.fillText("The " + color + " player turn", 270, 50);
            if (makash == 13) {
                inDropping = true;
                circle(x, y, "white");
                freeSpace(((x - 50) / 100 - 1), color);
                x = 550;
            }
            if (makash != 13 && makash != 37 && makash != 39 && makash != 32) {
                alert('wrong key! check the instructions to find the right key')
            }
        }
        function check_win(colNum, rowNum, color) {
            //בדיקת ניצחון טור - בדיקה של רצף בטור הנוכחי
            let isWin = false;
            if (rowNum <= 2) {
                if (((board[rowNum][colNum - 1]) == (board[rowNum + 1][colNum - 1])) && ((board[rowNum][colNum - 1]) == (board[rowNum + 2][colNum - 1])) && ((board[rowNum][colNum - 1]) == (board[rowNum + 3][colNum - 1]))) {
                    isWin = true;
                }
            }
            //בדיקת ניצחון שורה - בדיקה של שורה נוכחית אם היא מלאה

            color = changeColor(color);
            for (let i = 0; i < 4; i++) {
                if (((board[rowNum][i]) == color) && ((board[rowNum][i + 1]) == color) && ((board[rowNum][i + 2]) == color) && ((board[rowNum][i + 3]) == color)) {
                    isWin = true;
                }
            }
            //\בדיקת ניצחון אלכסון - אלכסון משמאל לימין, על פי הרביע השני
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 4; j++) {
                    if (((board[i][j]) == color) && ((board[i + 1][j + 1]) == color) && ((board[i + 2][j + 2]) == color) && ((board[i + 3][j + 3]) == color)) {
                        isWin = true;
                    }
                }
            }
            ///בדיקת ניצחון אלכסון - אלכסון משמאל לימין, על פי הרביע הראשון
            for (var i = 0; i < 3; i++) {
                for (var j = 3; j < 7; j++) {
                    if (((board[i][j]) == color) && ((board[i + 1][j - 1]) == color) && ((board[i + 2][j - 2]) == color) && ((board[i + 3][j - 3]) == color)) {
                        isWin = true;
                    }
                }
            }
            if (isWin) {
                ctx.clearRect(0, 0, 1100, 860);
                ctx.font = "80px Arial";
                ctx.fillStyle = color;
                ctx.fillText("The " + color + " player won", 150, 390);
                ctx.font = "60px Arial";
                ctx.fillText("Press space to start again", 200, 470);
                document.addEventListener("keydown", keyDownHandler, false);
                function keyDownHandler(event) {
                    var x = event.keyCode;
                    if (x == 32) {
                        for (var i = 0; i < 6; i++) {
                            for (var j = 0; j < 7; j++) {
                                board[i][j] = 'white';
                            }
                        }
                        counter = 0;
                        for (let i = 0; i <= 7; i++) {
                            column[i] = 5;
                        }
                        color = 'yellow';
                        ctx.font = "60px Arial";
                        ctx.fillText("The " + color + " player turn", 270, 50);
                        drawBoard()
                    }
                }
            }
        }

    }
}