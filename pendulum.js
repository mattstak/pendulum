const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');

const pencilImg = new Image();
pencilImg.src = 'pencil.jpg';

let mouseX = 0;
let mouseY = 0;
let scale;
let rectHeight;
let rectWidth;
let x = mouseX;
let y = mouseY; 
let xVelocity = 0;
let yVelocity = 0;
let xAcceleration = 0;
let yAcceleration = 0;
let angle = 1;
let angularVelocity = 0;
let angularAcceleration = 0;    
let gravity;
let lastTimestamp = performance.now();


window.addEventListener('resize', () => {
    rescale();
});

function rescale() {    
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    scale = Math.min(windowWidth, windowHeight);
    rectWidth = scale * 0.5;
    rectHeight = scale * 0.02;
    gravity = scale/13.33;

}

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


function draw(timestamp) {
    requestAnimationFrame(draw);

    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, windowWidth, windowHeight);

    let prevXVelocity = xVelocity;
    xVelocity = (mouseX - x) * deltaTime * 60;
    xAcceleration = (xVelocity - prevXVelocity) * deltaTime * 60;
    x = mouseX;
    let prevYVelocity = yVelocity;
    yVelocity = (mouseY - y) * deltaTime * 60;
    yAcceleration = (yVelocity - prevYVelocity) * deltaTime * 60;
    y = mouseY;

    angularAcceleration = (gravity/rectWidth) * Math.cos(angle) * deltaTime;  // Gravity
    angularAcceleration += xAcceleration/(rectWidth*2.2) * Math.sin(angle);
    angularAcceleration -= yAcceleration/(rectWidth*2.2) * Math.cos(angle);
    angularAcceleration -= angularVelocity * 0.01;
    angularVelocity += angularAcceleration * deltaTime * 60;
    //angularVelocity *= 0.99;

    angle += angularVelocity * deltaTime * 60;

    if (angularVelocity > 5){
        angularVelocity = 5;
        angularAcceleration = 0;
    }
    if (angularVelocity < -5){
        angularVelocity = -5;
        angularAcceleration = 0;
    }

    ctx.save();                   // Save the current state
    ctx.translate(x, y);          // Move origin to mouse pos
    ctx.rotate(angle);            // Rotate canvas

    ctx.drawImage(pencilImg, 0, -rectHeight/2, rectWidth, rectHeight)
    ctx.restore();  
}

rescale();
requestAnimationFrame(draw);