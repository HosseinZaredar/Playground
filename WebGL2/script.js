function main() {

  const canvas = document.querySelector("#glCanvas");
  const gl = Initialize(canvas);

  Rec(gl,
    {startX: 20, startY: 20, width: 150, height: 150},
    {r: 200, g: 100, b: 20}
  );

  Rec(gl,
    {startX: 40, startY: 40, width: 150, height: 150},
    {r: 0, g: 100, b: 20}
  );

  Rec(gl,
    {startX: 60, startY: 60, width: 150, height: 150},
    {r: 50, g: 50, b: 50}
  );

}

window.onload = main;