function setup() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    createCanvas(width, height);

    // code written here will run only once
    console.log('setting up the stuff');
}
  

// define variables here
var x = 1;
var y;

function draw() {
    // code written here will run every frame
    console.log(x++);
}