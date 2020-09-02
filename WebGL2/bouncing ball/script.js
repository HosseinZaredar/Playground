function setup() {

  const canvas = document.querySelector("#glCanvas");
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  
  const gl = Initialize(canvas, width, height);
  requestAnimationFrame((now) => render(now, gl));

}

var g = 9.8;
var y0 = 700;
var y = y0;
var x;
var v;
var v0 = 0;
var t = 0;
var dir = -1;
var bounce = 0.8;
var slider;
var size = 200;

var then = 0;

function render(now, gl) {

  now *= 0.001;
  var deltaTime = now - then; // frame rate independent delta time

  if (dir == -1) {
    if (y > 75) {
      t += 10 * deltaTime;
      y = -0.5 * g * t * t + y0;
      v = g * t + v0;
    } else {
      dir = 1;
      v0 = bounce * v;
      y0 = y;
      t = 0
    }
  }

  if (dir == 1) {
    if (v < 0) {
      dir = -1;
      y0 = y;
      v0 = 0;
      t = 0
    } else {
      t += 10 * deltaTime;
      y = -0.5 * g * t * t + v0 * t + y0;
      v = -g * t + v0;
    }
  }

  if (!x)
    x =  window.innerWidth / 2;

  Circle(gl,
    x, y,
    150,
    {r: 200, g: 100, b: 20}
  );

  then = now;

  requestAnimationFrame((now) => render(now, gl))
}

window.onload = setup;