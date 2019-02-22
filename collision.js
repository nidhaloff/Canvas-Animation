var c = document.querySelector('canvas'),
    cx = c.getContext('2d'),
    radius = 10;

c.height =  window.innerHeight;
c.width = window.innerWidth;
var particles = [];

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

function resolveCollision(particle, anotherParticle) {

    const dxDiff = particle.dx - anotherParticle.dx;
    const dyDiff = particle.dy - anotherParticle.dy;
    const xDist =  anotherParticle.x - particle.x;
    const yDist = anotherParticle.y - particle.y;

    // prevent accidental overlap of particles:
    if(dxDiff * xDist + dyDiff * yDist >= 0) {

        //Grab angle between the two colliding particles:
        const angle =  - Math.atan2(yDist, xDist);

        //store mass for better readability:
        const m1 = anotherParticle.mass;
        const m2 = particle.mass;

        //velocity before equation:
    
    }
}
function Particle (x, y, dx, dy, radius, color) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw =  function() {

        cx.beginPath();
        
        cx.strokeStyle = this.color;

        cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
       
        cx.stroke();
    }

    this.update = function() {

        if(this.x + this.radius > c.width || this.x - this.radius < 0 ) {
            this.dx = -this.dx;
        } 
        else if(this.y + this.radius < c.height || this.y - this.radius > 0) {
            this.dy = -this.dy;
        } 

        for(let i = 0; i<particles.length; i++) {
            if(this === particles[i]) continue;

            if(getDistance(this.x, particles[i].x, this.y, particles[i].y) < this.radius * 2) {

                resolveCollision(this,particles[i]);
            }
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      
    }

}

function getDistance(x1,x2,y1,y2) {

    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(xDistance**2 + yDistance**2);   
}

function initialize() {
    
   for(let i=0; i<11; i++) {
        let radius = 80;    
       var x = randomIntFromRange(radius, c.width-radius);
        
       var y = randomIntFromRange(radius,c.height - radius);
       var dx = randomIntFromRange(-0.5,0.5);
       var dy = randomIntFromRange(-0.5,0.5);
    
       var color = 'blue';
      if(i !==0){
        
       for(let j = 0; j<particles.length; j++) {
       
            if(getDistance(x,  particles[j].x, y, particles[j].y) < radius * 2) {
                x = randomIntFromRange(radius, c.width-radius);
                y = randomIntFromRange(radius,c.height - radius);
            
                j = -1;
            }
           
        }
       }

       particles.push(new Particle(x, y, dx, dy, radius, color));
   }

}

function animate() {

    requestAnimationFrame(animate);

    cx.clearRect(0, 0, c.width, c.height);
    
    particles.forEach( particle => {

        particle.update();
    })
}

initialize();
animate();
