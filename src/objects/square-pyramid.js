class SquarePyramid extends GeometryParent {
    constructor(name, scale, translation, rotation) {
        super(name, scale, translation, rotation);
    }

    initVertexBuffers(gl) {
        const vertices = [   // Vertex coordinates
            -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0,    // v0-v1-v2-v3 base
            -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 0.0, 1.0, 0.0,                        // v0-v1-v4 front
            -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 0.0, 1.0, 0.0,                      // v3-v0-v4 left
            1.0, -1.0, -1.0, 0.0, 1.0, 0.0, 1.0, -1.0, 1.0,                        // v2-v4-v1 right
            0.0, 1.0, 0.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0,                      // v4-v2-v3 back
        ];

        const indices = [       // Indices of the vertices
            0, 1, 2, 0, 2, 3,   // base
            4, 5, 6,            // front
            7, 8, 9,            // left
            10, 11, 12,         // right
            13, 14, 15,         // back
        ];

        return this.setUpBuffers(gl, vertices, indices);
    }
}