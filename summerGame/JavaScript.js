var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
let color = "yellow";
let board = [];
let xText = 150;
let cleanMove = true; //בודק איזה מסך מופיע וחוסם אפשרות לחוץ על מקשים
let inDropping = false; //בודק אם מתבצעת נפילה על מנת למנוע מהשחקן להוריד דיסקיות בו זמנית

for (let i = 0; i < 7; i++) {
    board[i] = new Array(6);
}
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
        board[i][j] = 'white';
    }
}

drawBoard(color);
let counter = 0;
let column = [];//מערך של הטורים 
for (let i = 0; i <= 7; i++) { //מילוי המערך של הטורים
    column[i] = 5;
}

circle(550, 170, color);
ctx.font = "60px Arial";
document.addEventListener("keydown", keyDownHandler, false);
let x = 550;
let y = 170;

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

function drawBoard(color) {
    /*ומודיעה תור מי הפעולה מציירת את הלוח של המשחק
     color : הצבע של השחקן הנוכחי, מחרוזת
     לא מחזירה דבר*/
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
    ctx.font = "60px Arial";
    ctx.fillStyle = color;
    ctx.fillText("The " + color + " player turn", 270, 50);
}

function freeSpace(colNum, colorCircle) {
    /*פונקציה שבודקת מה המקום הפנוי הנמוך ביותר ומורידה את הדיסקית לאותו מקום 
     * colNum : מספר הטור שאליו מורידים דיסקית
     * colorCircle: הצבע הנוכחי של הדיסקית*/
    if (column[colNum - 1] <= -1) {
        alert('column is full');
        circle(550, 170, color);
        inDropping = false; 
    }
    else {
        drawCircle(170, colorCircle, 0, colNum);
    }
}

function drawCircle(y, colorCircle, i, colNum) {
    /* פונקציה המורה על ציור העיגול בהתאם למיקום והצבע הנדרשים
    פרמטרים : 
    y: גובה הדיסקית 
    i : משתנה שבודק את מספר הפעמים שקראו לפונקציה
    colorcircle: צבע הדיסקית הנוכחית 
    colNum: הטור הנוכחי של הדיסקית*/
    let x = (colNum + 1) * 100 + 50;
    if (i != 0) {
        circle(x, y - 100, 'white');
    }
    if (i == 1) { //לכסות  מסגרת שנשארת
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
        ctx.clearRect(0, 0, c.width, c.height);
        drawBoard(color);
        circle(550, 170, color);
        inDropping = false;
        ctx.font = "60px Arial";
        check_win(colNum, column[colNum - 1] + 1, color);
    }
}

function changeColorInBoard(colNum, colorCircle) {
    /*מטרת הפעולה היא לשנות את הצבע בלוח במיקום המתאים בהתאם לתור
    פרמטרים: 
    colNum: מספר הטור הנוכחי 
    colorCircle: צבע הדיסקית הנוכחית
    לא מחזירה ערך*/
    board[column[colNum - 1]][colNum - 1] = colorCircle;
    ctx.clearRect(0, 0, 1100, 860);
    drawBoard(color);
    column[colNum - 1] = column[colNum - 1] - 1;
}

function changeColor(color) {
    /*הפונקציה משנה את הצבע שנשלח לה לשני (מאדום לצהוב ומצהוב לאדום)
     פרמטרים:
     color: הצבע הנוכחי שיש לשנות
     הפונקציה מחזירה את הצבע החדש (color)
     */
    if (color == 'yellow') {
        color = 'red';
        xText = 205;
    }
    else {
        color = 'yellow';
        xText = 150;
    }
    return color;
}

function keyDownHandler(event) {
    /*הפונקציה הזו מחליטה מה הפעולות הנחוצות בהתאם למקש שנלחץ
    פרמטרים: 
    event : המקש שנלחץ
    במידה ונלחצו אחד ממקשי החצים ימינה או שמאלה תנוע הדיסקית בהתאמה. 
    חישבנו את המרחק המקסימלי לשני הכיוונים כך שהדיסקית לא תחרוג מתחום הלוח 
    לא מוחר ערך*/
    var makash = event.keyCode; //המקש שנלחץ
    if (inDropping) {
        return true;
    }
    if ((x > 250 && makash == 37) || (x < 850 && makash == 39) && cleanMove) { //גבולות התחום
        for (var i = 0; i < 5; i++) {
            if (makash == 37) {//left
                x -= 20;
            }
            if (makash == 39) {//right
                x += 20;
            }
            ctx.clearRect(0, 0, c.width, c.height);
            drawBoard(color);
            circle(x, y, color);
        }
    }
    if (makash == 13 && cleanMove) {
        inDropping = true;
        circle(x, y, "white");
        freeSpace(((x - 50) / 100 - 1), color);
        x = 550;
    }
    if (makash != 13 && makash != 37 && makash != 39 && cleanMove) { //במידה והמקש אינו חוקי תקפוץ הודעה למשתמש
        alert('wrong key! check the instructions to find the right key')
    }
}

function check_win(colNum, rowNum, color) {
    /*פונקציה הבודקת האם התקיים ניצחון של אחד השחקנים
    ישנן שלוש בדיקות: בדיקת הטור, בדיקת השורה ושני האלכסונים ומודיעה ניצחון.
    פרמטרים: 
    colNum: מספר הטור בו שמו את הדיסקית בתור הנוכחי, מספר
    rowNum: מספר השורה בה שמו את הדיסקית בתור הנוכחי, מספר
    color: צבע הדיסקית שהושמה בתור הנוכחי, מחרוזת
    לא מחזיר ערך*/
    color = changeColor(color);
    if (checkDiagonal(color) || checkRow(color, rowNum) || checkCol(rowNum, colNum)) {
        ctx.clearRect(0, 0, 1100, 860);
        ctx.font = "80px Arial";
        ctx.fillStyle = color;
        ctx.fillText("The " + color + " player won", xText, 390);
        ctx.font = "60px Arial";
        ctx.fillText("Press space to start again", 200, 470);
        cleanMove = false;
        whenWin();
    }
    else {
        tie();
    }
}

function checkRow(color, rowNum) {
        /*בודקת האם מתקיימת שורה של אותו הצבע
    פרמטרים :
    color: הצבע של השחקן
    rowNum: מספר השורה הנוכחית
    מחזירה אמת במידה והתקיים ניצחון*/
        //בדיקת ניצחון שורה - בדיקה של שורה נוכחית אם היא מלאה
        for (let i = 0; i < 4; i++) {
            if (((board[rowNum][i]) == color) && ((board[rowNum][i + 1]) == color) && ((board[rowNum][i + 2]) == color) && ((board[rowNum][i + 3]) == color)) {
                return true;
            }   
        }
    return false;
} 

function checkCol(rowNum, colNum) {
        /*בודקת האם מתקיים טור של אותו הצבע
    פרמטרים:
    rowNum: מספר השורה
    colNum: מספר הטור
    מחזירה אמת במידה והתקיים ניצחון*/
        //בדיקת ניצחון טור - בדיקה של רצף בטור הנוכחי
    if (rowNum <= 2) {
        if (((board[rowNum][colNum - 1]) == (board[rowNum + 1][colNum - 1])) && ((board[rowNum][colNum - 1]) == (board[rowNum + 2][colNum - 1])) && ((board[rowNum][colNum - 1]) == (board[rowNum + 3][colNum - 1]))) {
            return true;
        }
    }
    return false;  
}

function checkDiagonal(color) {
    /*בודקת האם מתקיים אלכסון של אותו הצבע
     פרמטרים:
     color: הצבע של השחקן
     מחזירה אמת במידה והתקיים ניצחון*/
    //\בדיקת ניצחון אלכסון - אלכסון משמאל לימין, על פי הרביע השני
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (((board[i][j]) == color) && ((board[i + 1][j + 1]) == color) && ((board[i + 2][j + 2]) == color) && ((board[i + 3][j + 3]) == color)) {
                return true;
            }
        }
    }
    ///בדיקת ניצחון אלכסון - אלכסון משמאל לימין, על פי הרביע הראשון
    for (var i = 0; i < 3; i++) {
        for (var j = 3; j < 7; j++) {
            if (((board[i][j]) == color) && ((board[i + 1][j - 1]) == color) && ((board[i + 2][j - 2]) == color) && ((board[i + 3][j - 3]) == color)) {
                return true;
            }
        }
    }
    return false;
}

function whenWin() {
        /*הפונקציה עורכת שינויים ומאפסת את המשחק בלחיצה על המקש 
        הפונקציה לא מקבלת ולא מחזירה ערכים*/
        document.addEventListener("keydown", keyDownHandler2, false);
        function keyDownHandler2(event) {
            var key = event.keyCode;
            if (key == 32 && !cleanMove) {
                cleanMove = true;
                resetGame();
            }
            else {
                if (!cleanMove) {
                    alert("wrong key");
                }
                
            }
        }
}

function resetGame() {
    /*מאתחל את המשחק ומאפס את הלוח
     לא מקבלת ומחזירה ערכים*/
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            board[i][j] = 'white';
        }
    }
    counter = 0;
    for (var i = 0; i <= 7; i++) {
        column[i] = 5;
    }
    color = changeColor(color);
    ctx.clearRect(0, 0, 1100, 860);
    drawBoard(color);
    circle(550, 170, color);
}

function tie() {
    /* פונקציה שבודקת אם התקיים תיקו, וכן מה הפעולות הנדרשות במקרה כזה
    הפונקציה לא מחזירה דבר וגם לא מקבלת פרמטרים*/
    if ((column[0] == -1) && (column[1] == -1) && (column[2] == -1) && (column[3] == -1) && (column[4] == -1) && (column[5] == -1) && (column[6] == -1)) {
        ctx.clearRect(0, 0, 1100, 860);
        ctx.font = "80px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Game over. No one won", 130, 390);
        ctx.font = "60px Arial";
        ctx.fillText("Press space to start again", 200, 470);
        cleanMove = false;
        whenWin();
    }
}