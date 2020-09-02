function main() {

  const canvas = document.querySelector("#glCanvas");
  const gl = Initialize(canvas);

  // Triangle(
  //   gl,
  //   {x1: 0, y1: 0},
  //   {x2: 50, y2: 150},
  //   {x3: 150, y3: 50},
  //   {r: 200, g: 100, b: 20}
  // );

  // Rectangle(gl,
  //   {startX: 20, startY: 20, width: 150, height: 150},
  //   {r: 200, g: 100, b: 20}
  // );

  // Rectangle(gl,
  //   {startX: 40, startY: 40, width: 150, height: 150},
  //   {r: 0, g: 100, b: 20}
  // );

  // Rectangle(gl,
  //   {startX: 60, startY: 60, width: 150, height: 150},
  //   {r: 50, g: 50, b: 50}
  // );

  Line(
    gl,
    {x1: 50, y1: 50},
    {x2: 550, y2: 250},
    3,
    {r: 50, g: 50, b: 50}
  )

}

window.onload = main;