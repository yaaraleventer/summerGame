<%@ Page Language="C#" AutoEventWireup="true" CodeFile="game.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server" >
    <title></title>
</head>
<body dir="rtl" lang="he">

        <div>
            <h1 > 4 בשורה</h1> 
            <h2>מטרת המשחק: ליצור רצף של ארבעה עיגולים בצבע שלך בטור, בשורה או באלכסון.</h2>
                <br />
                <b>חוקים:
                </b>
                <br />
                <ul>
                    <li> השחקן הצהוב מתחיל</li>
                    <li> כל שחקן מזיז בתורו את העיגול למעלה על ידי המקשים ימינה ושמאלה. כשירצה להוריד את העיגול למקום המתאים ילחץ על אנטר. 
                    </li>
                    <li> שחקן שהשיג 4 עיגולים בצבע שלו ברצף במאוזן, מאונך או באלכסון - ניצח</li>
                </ul>
            <b> מקשים אפשריים:</b>
            <ul>
                <li> רווח - כדי להתחיל את משחק חדש</li>
                <li> ימינה - כדי להזיז את העיגול טור ימינה</li>
                <li> שמאלה - כדי להזיז את העיגול טור שמאלה</li>
                <li> אנטר - כדי לשלשל את העיגול ללוח</li>
                <li style="list-style:square"> אם תלחץ על מקש לא נכון, תקבל הודעה שלחץ על מקש לא אפשרי</li>
            </ul>
               <canvas id="mycanvas" height="860" width="1100" style="border:dashed" dir="ltr"></canvas>
            <script src="JavaScript.js"></script>
        </div>

</body>
</html>
