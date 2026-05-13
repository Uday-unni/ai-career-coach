import { useEffect, useRef } from "react";

export default function Aurora({
  colorStops = ["#C8FF00", "#7B61FF", "#00FFD1"],
  amplitude = 1.0,
  blend = 0.5,
  speed = 0.5,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vs = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      uniform vec3 color0;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float amplitude;
      uniform float blend;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        float wave1 = sin(uv.x * 3.0 + time * 0.5) * amplitude * 0.3;
        float wave2 = sin(uv.x * 2.0 - time * 0.3 + 1.5) * amplitude * 0.2;
        float wave3 = sin(uv.x * 4.0 + time * 0.4 + 3.0) * amplitude * 0.15;
        float y1 = 0.4 + wave1;
        float y2 = 0.6 + wave2;
        float g1 = exp(-pow((uv.y - y1) * 6.0, 2.0));
        float g2 = exp(-pow((uv.y - y2) * 5.0, 2.0));
        float g3 = exp(-pow((uv.y - 0.5 + wave3) * 7.0, 2.0));
        vec3 col = color0 * g1 + color1 * g2 + color2 * g3;
        col = mix(vec3(0.02), col, blend);
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf;
    const start = performance.now();

    const render = () => {
      const t = ((performance.now() - start) / 1000) * speed;
      gl.uniform1f(gl.getUniformLocation(prog, "time"), t);
      gl.uniform2f(
        gl.getUniformLocation(prog, "resolution"),
        canvas.width,
        canvas.height
      );
      gl.uniform1f(gl.getUniformLocation(prog, "amplitude"), amplitude);
      gl.uniform1f(gl.getUniformLocation(prog, "blend"), blend);
      const [r0, g0, b0] = hexToRgb(colorStops[0]);
      const [r1, g1, b1] = hexToRgb(colorStops[1]);
      const [r2, g2, b2] = hexToRgb(colorStops[2]);
      gl.uniform3f(gl.getUniformLocation(prog, "color0"), r0, g0, b0);
      gl.uniform3f(gl.getUniformLocation(prog, "color1"), r1, g1, b1);
      gl.uniform3f(gl.getUniformLocation(prog, "color2"), r2, g2, b2);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}