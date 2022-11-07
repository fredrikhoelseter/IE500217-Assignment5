class Scene {
    constructor() {
        // Retrieve <canvas> element
        const canvas = document.getElementById('canvas');

        // Get the rendering context for WebGL
        this.gl = getWebGLContext(canvas);
        if (!this.gl) {
            console.log('Failed to get the rendering context for WebGL');
        }

        // Initialize shaders
        if (!initShaders(this.gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
            console.log('Failed to initialize shaders.');
        }

        // Set clear color and enable hidden surface removal
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Get the storage location of u_ModelMatrix and u_VpMatrix
        this.uModelMatrix = this.gl.getUniformLocation(this.gl.program, 'u_ModelMatrix');
        this.uVpMatrix = this.gl.getUniformLocation(this.gl.program, 'u_VpMatrix');
        if(this.uModelMatrix < 0 || this.uVpMatrix < 0) {
            console.log('Failed to get the storage location of u_ModelMatrix or u_VpMatrix');
        }

        // Set the eye point, look-at point, and up vector.
        this.viewProjMatrix = new Matrix4();
        this.viewProjMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
        this.viewProjMatrix.lookAt(2.06, 2.6, 20, 0, 0, -2, 0, 1, 0);

        // Init object list
        this.objects = [];
    }

    // Adds a new object to the scene.
    addObject(object) {
        this.objects.push(object);
    }

    // Finds an object in the scene and returns it.
    findObject(objectName){
        for (let i = 0; i < this.objects.length; i++){
            if (this.objects[i].name === objectName){
                return this.objects[i];
            }
        }
    }

    // Removes an object from the scene.
    removeObject(objectName) {
        for (let i = 0; i < this.objects.length; i++){
            if (this.objects[i].name === objectName){
                this.objects.splice(i,1);
            }
        }
    }

    draw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        for (let object of this.objects) {
            const numberOfVertices = object.initVertexBuffers(this.gl);
            if (numberOfVertices < 0) {
                console.log('Failed to set the vertex information');
            }
        
            this.gl.uniformMatrix4fv(this.uModelMatrix, false, object.modelMatrix.elements);
            this.gl.uniformMatrix4fv(this.uVpMatrix, false, this.viewProjMatrix.elements);

            this.gl.drawElements(this.gl.TRIANGLES, numberOfVertices, this.gl.UNSIGNED_BYTE, 0);
        }
    }
}