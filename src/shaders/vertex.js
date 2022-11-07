const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_VpMatrix;
    varying vec4 v_Color;

    void main() {
        v_Color = a_Color;
        gl_Position = u_VpMatrix * u_ModelMatrix * a_Position;
    }`;