function setup() {

  const canvas = document.querySelector("#glCanvas");
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  
  const gl = Initialize(canvas);
  requestAnimationFrame(() => render(gl));

}

var g = 9.8;
var y0 = 700;
var y = y0;
var x;
var v;
var v0 = 0;
var t = 0.3;
var dir = -1;
var bounce = 0.8;
var slider;
var size = 200;

function render(gl) {

  if (dir == -1) {
    if (y > 75) {
      t += 0.2;
      y = -0.5 * g * t * t + y0;
      v = g * t + v0;
    } else {
      dir = 1;
      v0 = bounce * v;
      y0 = y;
      t = 0.4
    }
  }

  if (dir == 1) {
    if (v < 0) {
      dir = -1;
      y0 = y;
      v0 = 0;
      t = 0.4
    } else {
      t += 0.2;
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

  requestAnimationFrame(() => render(gl))
}

window.onload = setup;