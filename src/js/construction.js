const hexColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
const CUBE_MAX_WIDTH = 2.5;
const CUBE_MIN_WIDTH = 1.5;
const CUBE_MAX_HEIGHT = 5;
const CUBE_MIN_HEIGHT = 1;
const CUBE_MAX_LENGTH = 2.5;
const CUBE_MIN_LENGTH = 1.5;

//Builds a city block
function buildBlock(length, space, origin, scene) {
    for (let j = 0; j < length * space; j += space) {
        let cubeWidth = (Math.random() * (CUBE_MAX_WIDTH - CUBE_MIN_WIDTH)) + CUBE_MIN_WIDTH;
        let cubeHeight = (Math.random() * (CUBE_MAX_HEIGHT - CUBE_MIN_HEIGHT)) + CUBE_MIN_HEIGHT;
        let cubeLength = (Math.random() * (CUBE_MAX_LENGTH - CUBE_MIN_LENGTH)) + CUBE_MIN_LENGTH;
        let height = cubeHeight / 2;
        const cubeGeo = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeLength);
        const cubeMaterial = new THREE.MeshPhongMaterial({color: hexColor()});
        const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
        cubeMesh.castShadow = true;
        cubeMesh.receiveShadow = true;
        cubeMesh.position.set(origin.x, origin.y + height, origin.z + j);
        scene.add(cubeMesh);
    }
}

//Plane
export function buildPlane(width, length, origin, material, scene){
    const planeGeo = new THREE.PlaneGeometry(width, length);
    const planeMesh = new THREE.Mesh(planeGeo, material);
    planeMesh.receiveShadow = true;
    planeMesh.castShadow = false;
    planeMesh.position.set(origin.x, origin.y, origin.z);
    planeMesh.rotation.x = Math.PI * -.5;
    scene.add(planeMesh);
}

//Square pyramid
export function buildLandMark(radius, height, segments, material, scene){
    const pyramidGeo = new THREE.ConeBufferGeometry(radius, height, segments);
    const pyramidMesh = new THREE.Mesh(pyramidGeo, material);
    pyramidMesh.rotation.y = 150;
    pyramidMesh.position.set(0,4,12);
    pyramidMesh.receiveShadow = true;
    pyramidMesh.castShadow = true;
    scene.add(pyramidMesh);
}

//Creates all city blocks
export function createCityBlocks(scene){
    buildBlock(9, 4, new THREE.Vector3(-10.5, 0, -18), scene);
    buildBlock(9, 4, new THREE.Vector3(10.5, 0, -18), scene);
    buildBlock(7, 4, new THREE.Vector3(-6.5, 0, -18), scene);
    buildBlock(7, 4, new THREE.Vector3(6.5, 0, -18), scene);
    buildBlock(2, 4, new THREE.Vector3(-2.5, 0, -18), scene);
    buildBlock(2, 4, new THREE.Vector3(2.5, 0, -18), scene);
}