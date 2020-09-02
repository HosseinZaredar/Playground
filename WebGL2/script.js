function setup() {

  const canvas = document.querySelector("#glCanvas");
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  
  const gl = Initialize(canvas);
  requestAnimationFrame(() => render(gl));

}

var x = 0;
var y = 0;

function render(gl) {
  Rectangle(gl,
    {startX: x, startY: y, width: 150, height: 150},
    {r: 200, g: 100, b: 20}
  );
  
  x++;

  requestAnimationFrame(() => render(gl))
}

window.onload = setup;