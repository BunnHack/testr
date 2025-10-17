import { ShaderProgram } from '../graphics/ShaderProgram.js';

export class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl2');
        if (!this.gl) {
            console.error('WebGL 2 not supported');
            return;
        }

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    async start() {
        await this.init();
        this.render();
    }

    async init() {
        const vertexShaderSource = await fetch('src/shaders/vertex.glsl').then(res => res.text());
        const fragmentShaderSource = await fetch('src/shaders/fragment.glsl').then(res => res.text());
        this.shaderProgram = new ShaderProgram(this.gl, vertexShaderSource, fragmentShaderSource);

        const positions = [
            -0.5, -0.5,
             0.5, -0.5,
             0.0,  0.5,
        ];

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);

        const positionAttributeLocation = this.gl.getAttribLocation(this.shaderProgram.program, 'a_position');
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    render() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.shaderProgram.use();
        this.gl.bindVertexArray(this.vao);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        requestAnimationFrame(() => this.render());
    }
}
