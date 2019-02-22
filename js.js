var c = document.querySelector('canvas'),
    cx = c.getContext('2d'),
    maxRadius = 40,
    minRadius = 3,
    mouse = {
    x : undefined,
    y : undefined
},
    circleArray = [];

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


function Circle (x,y,dx,dy,radius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = getRandomColor();

    this.draw =  function() {

        cx.beginPath();
        
        cx.fillStyle = this.color;

        cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
       
        cx.fill();
    }

    this.update = function() {
      
        if(this.x + this.radius >= c.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        } 
        if(this.y + this.radius >= c.height || this.y - this.radius <= 0){
            this.dy = -this.dy;
        }
        
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50  && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
                if(this.radius <= maxRadius)
                    this.radius+=1;
        }
        else if(this.radius>minRadius ) this.radius-=1;
    
        this.x += this.dx;
        this.y+= this.dy;

        this.draw();
      
    }

}

function initialize() {
    circleArray = [];
    for(let i = 0; i<1000; i++) {
       
        var x = Math.random() * (c.width - maxRadius) + maxRadius; 
        var y = Math.random() * (c.height - maxRadius) + maxRadius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        circleArray.push( new Circle(x, y, dx , dy, maxRadius));

    }
}
window.addEventListener('resize', function() {

    c.height = window.innerHeight;
    c.width = window.innerWidth;
    initialize();
});



function animate() {

     requestAnimationFrame(animate);
     cx.clearRect(0, 0, c.width, c.height);
     for(let i = 0; i<circleArray.length; i++) {
       
        circleArray[i].update();
     }
 
}

initialize();
animate();




