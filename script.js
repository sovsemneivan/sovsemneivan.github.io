
        var gameobject;//это куб
        var myObstacles = [];// это столбы
        var myScore;// это счет

        function startGame() { // начало скрипта
            gameobject = new component(15, 15, "circle.png", 10, 120, "image"); // введение ключевого объекта
            gameobject.gravity = 0.2; // то, как быстро объект падает вниз сначала
            myScore = new component("30px", "Consolas", "black", 280, 40, "text"); // окно счета
            myGameArea.start(); // старт
        }

        var myGameArea = { // подключение канваса
            canvas: document.createElement("canvas"),
            start: function() {
                this.canvas.width = 700;////this это способ подключения к объекту
                this.canvas.height = 700;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]); ////childNodes это элементы апи(програмного интерфейса)
                this.frameNo = 0;
                this.interval = setInterval(updateGameArea, 20);//очистка пространства для столбов
            },
            clear: function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }

        function component(width, height, color, x, y, type) { //функция width, height, color, x, y, type и их свойства
            this.type = type;
            this.score = 0;
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.gravity = 0.5;
            this.gravitySpeed = 0;
            this.update = function() {
                context = myGameArea.context;
                if (this.type == "text") {
                   context.font = this.width + " " + this.height;
                    context.fillStyle = color;
                    context.fillText(this.text, this.x, this.y);
                } else {
                    context.fillStyle = color;
                    context.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            this.newPos = function() {/// действия, если объект каасется дна
                this.gravitySpeed += this.gravity;
                this.x += this.speedX;
                this.y += this.speedY + this.gravitySpeed;
                this.hitBottom();
            }
            this.hitBottom = function() {
                var rockbottom = myGameArea.canvas.height - this.height;
                if (this.y > rockbottom) {
                    this.y = rockbottom;
                    this.gravitySpeed = -5;
                }
            }
            this.crashWith = function(otherobj) {
                var myleft = this.x;
                var myright = this.x + (this.width);
                var mytop = this.y;
                var mybottom = this.y + (this.height);
                var otherleft = otherobj.x;
                var otherright = otherobj.x + (otherobj.width);
                var othertop = otherobj.y;
                var otherbottom = otherobj.y + (otherobj.height);
                var crash = true;
                if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                    crash = false;
                }
                return crash;
            }
            function updateGameArea() {
    if (gameobject.crashWith(myObstacle)) {
        gameobject.stop();
    } else {
        myGameArea.clear();
        myObstacle.update();
        gameobject.newPos(); 
        gameobject.update();
    }
}
        }

        function updateGameArea() {
            var x, height, gap, minHeight, maxHeight, minGap, maxGap;
            for (i = 0; i < myObstacles.length; i += 1) {
                if (gameobject.crashWith(myObstacles[i])) {
                    return;
                }
            }
            myGameArea.clear();
            myGameArea.frameNo += 1;
            if (myGameArea.frameNo == 1 || everyinterval(150)) {
                x = myGameArea.canvas.width;
                minHeight = 20;
                maxHeight = 200;
                height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
                minGap = 70;
                maxGap = 200;
                gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
                myObstacles.push(new component(10, height, "green", x, 0));
                myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
            }
            for (i = 0; i < myObstacles.length; i += 1) {
                myObstacles[i].x += -1;
                myObstacles[i].update();
            }
            myScore.text = "СЧЕТ: " + myGameArea.frameNo;
            myScore.update();
            gameobject.newPos();
            gameobject.update();
        }

        function everyinterval(n) {
            if ((myGameArea.frameNo / n) % 1 == 0) {
                return true;
            }
            return false;
        }

        function accelerate(n) {
           gameobject.gravity = n;
        }

startGame();
   