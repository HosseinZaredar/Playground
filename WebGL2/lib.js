// Global Variables
var width;
var height;

function Initialize(canvas, w, h) {
    var gl = canvas.getContext("webgl2");
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    width = w;
    height = h;

    return gl;
}

function Clear(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function ToClipX(x) {
    return 2 * x / width - 1;
}

function ToClip(y) {
    return 2 * y / height - 1;
}

function Triangle(gl, {x1, y1}, {x2, y2}, {x3, y3}, {r, g, b}) {

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
        x1, y1,
        x2, y2,
        x3, y3,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // creating Vertex Array Object
    // var vao = gl.createVertexArray();
    // gl.bindVertexArray(vao);

    // setting a_position using attribute
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
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
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);

}

function Rectangle(gl, {startX, startY, width, height}, {r, g, b}) {

    // drawing it with 2 triangles
    Triangle(
        gl,
        {x1: startX, y1: startY},
        {x2: startX + width, y2: startY},
        {x3: startX, y3: startY + height},
        {r, g, b}
    );

    Triangle(
        gl,
        {x1: startX + width, y1: startY},
        {x2: startX, y2: startY + height},
        {x3: startX + width, y3: startY + height},
        {r, g, b}
    );

}

function Line(gl, {x1, y1}, {x2, y2}, thickness, {r, g, b}) {

    var deltaX = x2 - x1
    var deltaY = y2 - y1
    var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    dx = (thickness * deltaY) / (length * 2)
    dy = (thickness * deltaX) / (length * 2)

    // drawing it with 2 triangles
    Triangle(
        gl,
        {x1: x1 + dx, y1: y1 - dy},
        {x2: x2 - dx, y2: y2 + dy},
        {x3: x2 + dx, y3: y2 - dy},
        {r, g, b}
    );

    Triangle(
        gl,
        {x1: x1 + dx, y1: y1 - dy},
        {x2: x2 - dx, y2: y2 + dy},
        {x3: x1 - dx, y3: y1 + dy},
        {r, g, b}
    );
}

function Circle(gl, x, y, radius, {r, g, b}) {

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
        x, y,
    ];

    var n = 60;
    var degree = 2 * Math.PI / n;
    var sin = Math.sin(degree)
    var cos = Math.cos(degree)
    var prev_x = 1;
    var prev_y = 0;

    for (var i = 0; i <= n; i++) {
        var current_x = cos * prev_x - sin * prev_y;
        var current_y = sin * prev_x + cos * prev_y;
        positions.push(x + radius * current_x, y + radius * current_y);
        prev_x = current_x;
        prev_y = current_y;
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // creating Vertex Array Object
    // var vao = gl.createVertexArray();
    // gl.bindVertexArray(vao);

    // setting a_position using attribute
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
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
    var primitiveType = gl.TRIANGLE_FAN;
    var offset = 0;
    var count = n + 2;
    gl.drawArrays(primitiveType, offset, count);
}

function Grid(gl, delta) {

    var yn = height / (delta * 2);
    var xn = width / (delta * 2);

    // half grid lines
    for (var i = 0; i < 2 * yn; i++) {
        Line(
            gl,
            {x1: 0, y1: height / 2 + i * delta / 2},
            {x2: width, y2: height / 2 + i * delta / 2},
            1,
            {r: 180, g: 180, b: 180}
        );
        Line(
            gl,
            {x1: 0, y1: height / 2 - i * delta / 2},
            {x2: width, y2: height / 2 - i * delta / 2},
            1,
            {r: 180, g: 180, b: 180}
        );
    }

    for (var i = 0; i < 2 * xn; i++) {
        Line(
            gl,
            {x1: width / 2 + i * delta / 2, y1: 0},
            {x2: width / 2 + i * delta / 2, y2: height},
            1,
            {r: 180, g: 180, b: 180}
        );
        Line(
            gl,
            {x1: width / 2 - i * delta / 2, y1: 0},
            {x2: width / 2 - i * delta / 2, y2: height},
            1,
            {r: 180, g: 180, b: 180}
        );
    }

    // integer grid lines
    for (var i = 0; i < yn; i++) {
        Line(
            gl,
            {x1: 0, y1: height / 2 + i * delta},
            {x2: width, y2: height / 2 + i * delta},
            1,
            {r: 90, g: 90, b: 90}
        );

        Line(
            gl,
            {x1: 0, y1: height / 2 - i * delta},
            {x2: width, y2: height / 2 - i * delta},
            1,
            {r: 90, g: 90, b: 90}
        );
    }

    for (var i = 0; i < xn; i++) {
        Line(
            gl,
            {x1: width / 2 + i * delta, y1: 0},
            {x2: width / 2 + i * delta, y2: height},
            1,
            {r: 90, g: 90, b: 90}
        );
        Line(
            gl,
            {x1: width / 2 - i * delta, y1: 0},
            {x2: width / 2 - i * delta, y2: height},
            1,
            {r: 90, g: 90, b: 90}
        );
    }

    // center grid lines
    Line(
        gl,
        {x1: 0, y1: height / 2},
        {x2: width, y2: height / 2},
        2,
        {r: 0, g: 0, b: 0}
    );
    Line(
        gl,
        {x1: width / 2, y1: 0},
        {x2: width / 2, y2: height},
        2,
        {r: 0, g: 0, b: 0}
    );

}