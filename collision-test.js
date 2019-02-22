var c = document.querySelector('canvas'),
    cx = c.getContext('2d')
    mouse = {
        x : c.width/2,
        y : c.height/2
    },
    radius = 150;

c.height =  window.innerHeight;
c.width = window.innerWidth;
let circle1;
let circle2;


c.addEventListener('mousemove', (event) => {

    mouse.x = event.x;
    mouse.y = event.y;
    
});

function getRandomColor() {

    var c = '#';

    var hex = "0123456789ABCDEF";

    for(let i = 0; i<6; i++){
       
        c+=hex[Math.floor(Math.random()*hex.length)];
    }

    return c;

}

function Circle (x,y,radius,color) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw =  function() {

        cx.beginPath();
        
        cx.fillStyle = this.color;

        cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
       
        cx.fill();

        cx.closePath();
    }

    this.update = function() {

        this.draw();
      
    }

}

function initialize() {
    
   circle1 = new Circle(c.width/2, c.height/2, radius, 'black');

   circle2 = new Circle(undefined, undefined, 30, 'red');

}

// function to get Distance using the Pythagor Theory
function getDistance(x1,x2,y1,y2) {

    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(xDistance**2 + yDistance**2);   
}
function animate() {

    requestAnimationFrame(animate);
    
    cx.clearRect(0, 0, c.width, c.height);
    
    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();
    
    if(getDistance(circle2.x, circle1.x, circle2.y, circle1.y) <= circle1.radius + circle2.radius ) {
       
        circle1.color = 'red';

        circle2.color = 'black';
    }
    else {
        console.log(getDistance(circle2.x, circle1.x, circle2.y, circle1.y));
     
        circle1.color = 'black';

        circle2.color = 'red';
    }
}

initialize();
animate();