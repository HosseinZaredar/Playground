function setup() {
    const width = window.innerWidth;
    const height = window.innerHeight - 70;
    createCanvas(width, height);
}
  
var g = 9.8;
var y0 = 100;
var y = y0;
var x;
var v;
var v0 = 0;
var t = 0.3;
var dir = 1;
var bounce = 0.8;
var slider;
var size = 200;

function draw() {
    if (!slider)
        slider = document.getElementById("range");

    g = slider.value;
    console.log(slider.value)

    if (mouseIsPressed &&
        mouseX < x + size / 2 && mouseX > x - size / 2 &&
        mouseY < y + size / 2 && mouseY > y - size / 2) {
        clear();
        t = 0.3;
        x = mouseX;
        y = mouseY;
        y0 = mouseY;
        v0 = 0;
        dir = 1;
        console.log('here!')

    } else {
        if (dir == 1) {

            if (y < window.innerHeight - 171) {
                clear();
                t += 0.2;
                y = 0.5 * g * t * t + y0;
                v = g * t + v0;
            } else {
                clear();
                dir = -1;
                v0 = bounce * v;
                y0 = y;
                t = 0.4
            }
        }
    
        if (dir == -1) {
            if (v < 0) {
                dir = 1;
                y0 = y;
                v0 = 0;
                t = 0.4
            } else {
                clear();
                t += 0.2;
                y = 0.5 * g * t * t - v0 * t + y0;
                v = -g * t + v0;
            }
        }
    }

    if (!x)
        x =  window.innerWidth / 2;

    ellipse(x, y, size, size);
}