//Sun
import * as light from "./lighting.js";

// Represents a sun
export class Sun {
    constructor(isCycling, scene, renderer, camera) {
        this.isCycling = isCycling;
        this.curve = this.getCurve();
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.sun = this.createSun();
        this.sunLight = light.pointLighting();
        this.addSunToScene();
    }

    // Makes a sun mesh
    createSun(){
        const sunGeo = new THREE.SphereBufferGeometry(2, 12, 8);
        const sunMaterial = new THREE.MeshBasicMaterial({color: 0xFFB52E})
        const sunMesh = new THREE.Mesh(sunGeo, sunMaterial);
        sunMesh.position.set(-30, 0, 0);
        sunMesh.receiveShadow = false;
        sunMesh.castShadow = false;
        return sunMesh;
    }

    // Animates the sun going in orbit
    animateOrbit(){
        if (!this.isCycling) {
            this.setPosition();
            return;
        }

        const loopTime = 1;
        const sunOrbitSpeed = 0.0001;
        const time = sunOrbitSpeed * performance.now();
        const t = (time % loopTime) / loopTime;

        let p = this.curve.getPoint(t);
        console.log(p);

        this.sun.position.x = p.x;
        this.sun.position.y = p.y;
        this.sunLight.position.x = p.x;
        this.sunLight.position.y = p.y;

        requestAnimationFrame(() => this.animateOrbit());
        this.renderer.render(this.scene, this.camera);
    }

    // Adds the sun and sunlight to the scene.
    addSunToScene() {
        this.scene.add(this.sunLight);
        this.scene.add(this.sun);
    }

    // Creates the curve the sun and sunlight will follow.
    getCurve() {
        return new THREE.EllipseCurve(
            0,0,
            -30, 25,
            0, 2*Math.PI,
        );
    }

    // Sets the default position of the sun.
    setPosition() {
        let p = this.curve.getPoint(0.4);
        this.sun.position.x = p.x;
        this.sun.position.y = p.y;
        this.sunLight.position.x = p.x;
        this.sunLight.position.y = p.y;
    }
}
