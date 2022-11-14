//Sun
export function sun(){
    const sunGeo = new THREE.SphereBufferGeometry(2, 12, 8);
    const sunMaterial = new THREE.MeshBasicMaterial({color: 0xFFB52E})
    const sunMesh = new THREE.Mesh(sunGeo, sunMaterial);
    sunMesh.position.set(-30, 0, 0);
    sunMesh.receiveShadow = false;
    sunMesh.castShadow = false;
    return sunMesh;
}
