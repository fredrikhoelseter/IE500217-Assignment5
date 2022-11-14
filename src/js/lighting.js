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
