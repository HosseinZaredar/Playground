function setup() {

  const canvas = document.querySelector("#glCanvas");
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  
  const gl = Initialize(canvas);
  
  Circle(gl, 500, 500, 150, {r: 200, g: 100, b: 20});

}

window.onload = setup;