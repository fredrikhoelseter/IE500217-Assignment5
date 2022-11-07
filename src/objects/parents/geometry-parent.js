class GeometryParent {
    constructor(name, scale, translation, rotation) {
        this.name = name;
        this.scale = scale;
        this.translation = translation;
        this.rotation = rotation;

        this.color = ColorVector.randomColor();

        this.modelMatrix = new Matrix4();

        // Sets initial scale, translation, and rotation.
        this.resetObject();
    }

    setColor(color){
        this.color = color;
    }

    // Move object in the specified direction.
    moveObject(movement) {
        if (movement === Move.RIGHT) {
            this.modelMatrix.translate(0.1,0,0)
        }
        else if (movement === Move.LEFT) {
            this.modelMatrix.translate(-0.1,0,0)
        }
        else if (movement === Move.UP) {
            this.modelMatrix.translate(0,0.1,0)
        }
        else if (movement === Move.DOWN) {
            this.modelMatrix.translate(0,-0.1,0)
        }
        else if (movement === Move.FORWARD) {
            this.modelMatrix.translate(0,0,0.1)
        }
        else if (movement === Move.BACKWARD) {
            this.modelMatrix.translate(0,0,-0.1)
        }
        else {
            console.log("invalid movement");
        }
    }

    // Rotate object clockwise or counter-clockwise around x, y, or z axis.
    rotateObject(rotate){
        if (rotate === Rotate.POSITIVE_X) {
            this.modelMatrix.rotate(15,0.1,0,0)
        }
        else if (rotate === Rotate.NEGATIVE_X){
            this.modelMatrix.rotate(15,-0.1,0,0)
        }
        else if (rotate === Rotate.POSITIVE_Y) {
            this.modelMatrix.rotate(15,0,0.1,0)
        }
        else if (rotate === Rotate.NEGATIVE_Y) {
            this.modelMatrix.rotate(15,0,-0.1,0)
        }
        else if (rotate === Rotate.POSITIVE_Z){
            this.modelMatrix.rotate(15,0,0,0.1)
        }
        else if (rotate === Rotate.NEGATIVE_Z){
            this.modelMatrix.rotate(15,0,0,-0.1)
        }
        else {
            console.log("Invalid rotation");
        }
    }

    // Scale in the x, y, or z direction.
    scaleObject(scale){
        if (scale === Scale.INCREASE_WIDTH){
            this.modelMatrix.scale(1.1, 1, 1)
        }
        else if (scale === Scale.DECREASE_WIDTH){
            this.modelMatrix.scale(0.9, 1, 1)
        }
        else if (scale === Scale.INCREASE_HEIGHT){
            this.modelMatrix.scale(1, 1.1, 1)
        }
        else if (scale === Scale.DECREASE_HEIGHT){
            this.modelMatrix.scale(1, 0.9, 1)
        }
        else if (scale === Scale.INCREASE_LENGTH){
            this.modelMatrix.scale(1, 1, 1.1)
        }
        else if (scale === Scale.DECREASE_LENGTH){
            this.modelMatrix.scale(1, 1, 0.9)
        }
        else if (scale === Scale.INCREASE_SCALE) {
            // Uniformly increase the scale in all directions.
            this.modelMatrix.scale(1.1, 1.1, 1.1)
        }
        else if (scale === Scale.DECREASE_SCALE) {
            // Uniformly decrease the scale in all directions.
            this.modelMatrix.scale(0.9, 0.9, 0.9)
        }
        else {
            console.log("Invalid scaling");
        }
    }

    // Reset all transformations to initial values.
    resetObject(){
        this.modelMatrix.setTranslate(this.translation[0], this.translation[1], this.translation[2]);
        this.modelMatrix.scale(this.scale[0], this.scale[1], this.scale[2]);
        this.modelMatrix.rotate(this.rotation, 0, 0, 1);
    }

    // Create, write to, and bind buffers.
    setUpBuffers(gl, vertices, indices){

        // Create color array, then push color to each vertex.
        let colors = [];
        for (let i = 0; i < (vertices.length/3); i++) {
            colors.push(this.color.red, this.color.green, this.color.blue);
        }

        vertices = new Float32Array(vertices);
        colors = new Float32Array(colors);
        indices = new Uint8Array(indices);

        // Create buffers
        const vertexBuffer = gl.createBuffer();
        const colorBuffer = gl.createBuffer();
        const indexBuffer = gl.createBuffer();
        if (!vertexBuffer || !colorBuffer || !indexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        // Get a_Position and a_Color attribute variables
        const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        if(a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return -1;
        }
        const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
        if(a_Color < 0) {
            console.log('Failed to get the storage location of a_Color');
            return -1;
        }

        // Write the vertex coordinates to the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Assign the buffer object to a_Position and enable the assignment
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        // Write the vertex colors to the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

        // Assign the buffer object to a_Color and enable the assignment
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Color);

        // Write the indices to the buffer object
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        return indices.length;
    }
}