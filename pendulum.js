const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let mouseX = width / 2;
let mouseY = height / 2;
const rectHeight = 20;
const rectWidth = 300;
let x = mouseX;
let y = mouseY; 
let xVelocity = 0;
let yVelocity = 0;
let xAcceleration = 0;
let yAcceleration = 0;
let angle = -1;
let angularVelocity = 0;
let angularAcceleration = 0;

const gravity = 1;


window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let prevXVelocity = xVelocity;
    xVelocity = mouseX - x;
    xAcceleration = xVelocity - prevXVelocity;
    x = mouseX;
    let prevYVelocity = yVelocity;
    yVelocity = mouseY - y;
    yAcceleration = yVelocity - prevYVelocity;
    y = mouseY;
    angularAcceleration = (gravity/rectWidth) * Math.cos(angle);  // Gravity
    angularAcceleration += xAcceleration/(rectWidth*1.5) * Math.sin(angle);
    angularAcceleration -= yAcceleration/(rectWidth*1.5) * Math.cos(angle);
    angularAcceleration -= angularVelocity * 0.01
    angularVelocity += angularAcceleration;
    //angularVelocity *= 0.99;

    angle += angularVelocity;

    // if (angularVelocity > 5){
    //     angularVelocity = 5;
    //     angularAcceleration = 0;
    // }
    // if (angularVelocity < -5){
    //     angularVelocity = -5;
    //     angularAcceleration = 0;
    // }

    ctx.save();                   // Save the current state
    ctx.translate(x, y);          // Move origin to mouse pos
    ctx.rotate(angle);            // Rotate canvas
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, -rectHeight/2, rectWidth, rectHeight);  // Draw rectangle from new origin
    ctx.restore();  
    requestAnimationFrame(draw);
}

draw();