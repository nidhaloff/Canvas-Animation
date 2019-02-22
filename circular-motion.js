var c = document.querySelector('canvas'),
    cx = c.getContext('2d'),
    mouse = {
    x : 100,
    y : 100
},
    particles = [];

c.height = window.innerHeight;
c.width = window.innerWidth;

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

function randomIntFromRange(min, max) {

    return Math.floor(Math.random() * (max - min) + 1 + min);
 }
function Particle (x,y,radius) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = getRandomColor();
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.09;
    this.distanceFromOrigin = randomIntFromRange(50,120);
    this.lastMousePosition = { x : x, y : y};
    this.draw =  function(lastPoint) {

        cx.beginPath();
        cx.strokeStyle = this.color;
        cx.lineWidth = this.radius;
        cx.moveTo(lastPoint.x, lastPoint.y);
        cx.lineTo(this.x, this.y);
        cx.stroke();
        cx.closePath();
    }

    this.update = function() {
        this.lastMousePosition.x += (mouse.x - this.lastMousePosition.x) * 0.05;
        this.lastMousePosition.y += (mouse.y - this.lastMousePosition.y) * 0.05;
        var lastPoint = {x: this.x, y: this.y};
        this.radians += this.velocity;  
        this.x = this.lastMousePosition.x + Math.cos(this.radians) * this.distanceFromOrigin;
        this.y = this.lastMousePosition.y + Math.sin(this.radians) * this.distanceFromOrigin;
        this.draw(lastPoint);
      
    }

}

function initialize() {
    
    for(let i = 0; i<60; i++) {
       
       /*  var x = Math.random() * (c.width - maxRadius) + maxRadius; 
        var y = Math.random() * (c.height - maxRadius) + maxRadius; */
       
        particles.push( new Particle(c.width/2, c.height/2, randomIntFromRange(1,3) ));

    }
}
window.addEventListener('resize', function() {

    c.height = window.innerHeight;
    c.width = window.innerWidth;
    //initialize();
});



function animate() {

     requestAnimationFrame(animate);
     //cx.clearRect(0,0,c.width, c.height);
     cx.fillStyle = 'rgba(255,255,255,0.05)';
     cx.fillRect(0, 0, c.width, c.height);
     for(let i = 0; i<particles.length; i++) {
       
        particles[i].update();
     }
 
}

initialize();
animate();