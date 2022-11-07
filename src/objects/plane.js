class Plane extends GeometryParent {
    constructor(name, scale, translation, rotation) {
        super(name, scale, translation, rotation);
    }

    initVertexBuffers(gl) {
        const vertices = [   // Vertex coordinates
            -1.0, 0,-1.0,   1.0,0,-1.0,   1.0, 0, 1.0,  -1.0, 0, 1.0
        ];

        const indices = [    // Indices of the vertices
            0, 1, 2,   0, 2, 3
        ];

        return this.setUpBuffers(gl, vertices, indices);
    }
}