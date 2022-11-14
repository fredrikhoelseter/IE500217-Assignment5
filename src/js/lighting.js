export function ambientLighting(color, intensity, scene){
    const ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
}

export function directionalLighting(color, intensity, position, scene){
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(position.x, position.y, position.z);
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.x = 2048;
    directionalLight.shadow.mapSize.y = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 1000;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    scene.add(directionalLight);
    scene.add(directionalLightHelper);
}