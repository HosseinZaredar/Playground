function setup() {

  const canvas = document.querySelector("#glCanvas");
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  const gl = Initialize(canvas, width, height);

  Grid(gl, 140);

}

window.onload = setup;