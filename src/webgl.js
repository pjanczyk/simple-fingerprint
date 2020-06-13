export function getWebglRenderer() {
  let canvas = document.createElement("canvas");
  let gl = canvas.getContext("webgl");
  if (!gl) return null;

  let debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  return [
    gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
    gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
  ].join(", ");
}

export function getWebglRender() {
  let canvas = document.createElement("canvas");
  canvas.width = 50;
  canvas.height = 50;

  let gl = canvas.getContext("webgl");
  if (!gl) return null;

  let vertices = [
    [-0.1, 0.8, 0.0],
    [-0.8, -0.8, 0.0],
    [0.8, -0.7, 0.0],
  ].flat();
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  let indices = [0, 1, 2];
  let indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  let vertCode = `
    attribute vec3 coordinates;
    void main(void) {
      gl_Position = vec4(coordinates, 1.0);
    }
   `;
  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertCode);
  gl.compileShader(vertexShader);

  let fragCode = `
    void main(void) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
    }
  `;
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragCode);
  gl.compileShader(fragmentShader);

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  let coordinatesAttribute = gl.getAttribLocation(program, "coordinates");

  gl.vertexAttribPointer(coordinatesAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coordinatesAttribute);

  gl.clearColor(1, 1, 1, 1);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  return canvas.toDataURL();
}
