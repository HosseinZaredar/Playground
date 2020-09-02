function Initialize(canvas) {
  var gl = canvas.getContext("webgl2");
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  return gl;
}

function Rec(gl, {startX, startY, width, height}, {r, g, b}) {

    // vertex shader
    var vertexShaderSource = `#version 300 es
 
    in vec2 a_position;
    uniform vec2 u_resolution;

    void main() {
        vec2 zeroToOne = a_position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace, 0, 1);
    }
    `;
    
    // fragment shader
    var fragmentShaderSource = `#version 300 es
    
    precision highp float;
    uniform vec4 u_color;
    out vec4 outColor;
    
    void main() {
        outColor = u_color;
    }
    `;

    // a function to compile a shader
    function createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success)
            return shader;
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    // a function to create a program from vertex and fragment shader
    function createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success)
            return program;
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    // checking if Browser supports WebGL2
    if (gl === null) {
        alert("Unable to initialize WebGL2. Your browser or machine may not support it.");
        return;
    }

    // creating shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // creating the program
    var program = createProgram(gl, vertexShader, fragmentShader);

    // creating vertx shader input buffer and filling it with proper data
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var positions = [
        startX, startY,
        startX + width, startY,
        startX, startY + height,
        startX + width, startY,
        startX, startY + height,
        startX + width, startY + height
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // creating Vertex Array Object
    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // setting a_position using attribute
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    // setting the gl program
    gl.useProgram(program);

    // setting u_resolution in vertex shader
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // setting u_color in fragment shader
    var colorLocation = gl.getUniformLocation(program, "u_color");
    gl.uniform4f(colorLocation, r / 256, g / 256, b / 256, 1);

    // and finally, running out program
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);

}