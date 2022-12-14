import * as buildings from "./buildings.js";
 

export class ShadowVariation {
    constructor(plane, sun, scene, selectableList) {
        this.plane = plane;
        this.sun = sun;
        this.scene = scene;
        this.selectableList = selectableList;
        
        this.samplesX = 32;
        this.samplesY = 60;
        this.planeSamples = this.resetPlaneSamples();
        this.meshes = [];
        this.planePoints = [];
    }

    createHeatMap() {
        this.deleteHeatMap();
        this.scene.remove(this.sun.sun)
        for (let x = 0; x <= 0.5; x += 0.005) {
            this.calculateFrameShadow(false, x);
        }
        this.calculateFrameShadow(true, 0);
        this.scene.add(this.sun.sun);
        this.resetPlaneSamples();
    }

    deleteHeatMap() {
        for (let index = 0; index < this.meshes.length; index++) {
            this.scene.remove(this.meshes[index]);
        }
        this.meshes = [];
    }

    resetPlaneSamples() {
        this.planeSamples = new Uint16Array(this.samplesX*this.samplesY);
        for (let x = 0; x < this.samplesX * this.samplesY; x++) {
            this.planeSamples[x] = 0;
        }
        return this.planeSamples;
    }

    calculateFrameShadow(createHeatMap, sunAt) {
        const curvePoint = this.sun.curve.getPoint(sunAt);
        const sunPosition = new THREE.Vector3(curvePoint.x, curvePoint.y, 0);
        const geometry = this.plane.geometry;
        let direction = new THREE.Vector3();
        let far = new THREE.Vector3();
        const raycaster = new THREE.Raycaster();
        geometry.computeBoundingBox();
        const bb = geometry.boundingBox;
        const object3DHeight = bb.max.y - bb.min.y;
        const object3DWidth = bb.max.x - bb.min.x;
        let count = 0;
        
    
        for (let x = -(object3DWidth / 2)+(object3DWidth/this.samplesX)/2; x <= object3DWidth / 2; x += object3DWidth/this.samplesX)
            {
                 for (let z = -(object3DHeight / 2)+(object3DHeight/this.samplesY)/2; z <= object3DHeight / 2; z += object3DHeight/this.samplesY)
                 {
                     
                     count++;
                     const position = new THREE.Vector3(this.plane.position.x + x, this.plane.position.y, this.plane.position.z + z);
                     if (createHeatMap) {
                        position.y += 0.05;
                        const material = new THREE.MeshPhongMaterial({color: 0xFF0000});
                        material.transparent = true;
                        material.opacity = (this.planeSamples[count-1]*20)/(this.samplesX*this.samplesY);
                        let mesh = buildings.buildPlane(object3DWidth/this.samplesX, object3DHeight/this.samplesY, position, material, this.scene, null);
                        mesh.receiveShadow = false;
                        this.meshes.push(mesh);
                     } 
                     else 
                     {
                        raycaster.set(position, direction.subVectors(sunPosition, position).normalize());
                        raycaster.far = far.subVectors(sunPosition, position).length();
                        const intersects = raycaster.intersectObjects(this.scene.children);
                        if (intersects.length > 0) {
                            this.planeSamples[count-1] += 1;
                        }
                     } 
                     
                 }
            }
    }
}



