class CylinderParent extends GeometryParent{
    constructor(name, scale, translation, rotation, isCone, bottomY, topY) {
        super(name, scale, translation, rotation);
        this.topY = topY;
        this.bottomY = bottomY;
        this.isCone = isCone;
    }

    initVertexBuffers(gl) {
        const n = 30;
        const angleStep = 2 * Math.PI / n;
        let indiceOffset;

        let vertices = [];
        let indices = [];

        // Bottom
        vertices.push(0, this.bottomY, 0);
        for (let i = 0; i < n + 1; i++) {
            vertices.push(Math.cos(i * angleStep), this.bottomY, Math.sin(i * angleStep));
            if (i < n) {
                indices.push(0, i + 1, i + 2);
            }
        }

        // Top
        // Does not draw a filled in circle on top if the shape is a cone.
        if (!this.isCone) {
            indiceOffset = vertices.length / 3;
            vertices.push(0.0, this.topY, 0.0);
            for (let i = 0; i < n + 1; i++) {
                vertices.push(Math.cos(i * angleStep), this.topY, Math.sin(i * angleStep));
                if (i < n) {
                    indices.push(indiceOffset, indiceOffset + i + 1, indiceOffset + i + 2);
                }
            }
        }

        // Side
        indiceOffset = vertices.length / 3;
        for (let i = 0; i < n + 1; i++) {
            vertices.push(Math.cos(i * angleStep), this.bottomY, Math.sin(i * angleStep));
            if (!this.isCone) {
                vertices.push(Math.cos(i * angleStep), this.topY, Math.sin(i * angleStep));
            }
            else {
                // If the shape is a cone, draw between the bottom circle and a single point.
                vertices.push(0, this.topY, 0);
            }

            if (i < n) {
                indices.push(indiceOffset + 2 * i + 1, indiceOffset + 2 * i, indiceOffset + 2 * i + 3);
                indices.push(indiceOffset + 2 * i, indiceOffset + 2 * i + 2, indiceOffset + 2 * i + 3);
            }
        }

        return this.setUpBuffers(gl, vertices, indices);
    }
}