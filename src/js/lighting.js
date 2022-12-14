// Adds ambient lighting to the scene.
export function ambientLighting(color, intensity, scene){
    const ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
}

// Adds a point light to the scene.
export function pointLighting(){
    const pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(-30, 0,0);
    pointLight.castShadow = true;
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.x = 2048;
    pointLight.shadow.mapSize.y = 2048;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 1000;
    pointLight.shadow.camera.left = -50;
    pointLight.shadow.camera.right = 50;
    pointLight.shadow.camera.top = 50;
    pointLight.shadow.camera.bottom = -50;
    return pointLight;
}
