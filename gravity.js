var canvas = document.querySelector('canvas'),
    cx = canvas.getContext('2d');
var b;
var friction = 0.9;
var ballArray ;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function getRandomColor() {

        var c = '#';
    
        var hex = "0123456789ABCDEF";
    
        for(let i = 0; i<6; i++){
           
            c+=hex[Math.floor(Math.random()*hex.length)];
        }
    
        return c;
    
}


function Ball (x, y,dx, dy, radius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = getRandomColor();
    
    this.draw = () => {

        cx.beginPath();
        cx.fillStyle = this.color;
        cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        cx.stroke();
        cx.fill();
    };

    this.update = () => {

        this.draw();

        if(this.y + radius + this.dy > canvas.height) {

            this.dy = -this.dy * friction;
        }
        else {

            this.dy += 1 ;
        }

        if(this.x + this.dx + radius > canvas.width || this.x - radius  <=0) {

            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
       
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

canvas.addEventListener('click', () => {

    init();
})

function randomIntFromRange(min, max) {

   return Math.floor(Math.random() * (max - min) + 1 + min);
}


function init() {
    ballArray = [];
    var radius = 40;

   for(let i=0; i<100; i++) {
        var x = randomIntFromRange(radius*2,canvas.width - radius) - radius;
        var y = randomIntFromRange(1, canvas.height) - radius;
        var dx = randomIntFromRange(-2,2);
        var dy = randomIntFromRange(-2,2);
        var b = new Ball(x, y,dx, dy, radius);
        ballArray.push(b);
   }
}
function animate() {

    requestAnimationFrame(animate);
    cx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<ballArray.length; i++) {

       ballArray[i].update();
       }
    //b.update();
   
}

init();
animate();

