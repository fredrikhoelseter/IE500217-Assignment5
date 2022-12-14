import * as materials from './material.js';

const CUBE_MAX_WIDTH = 2.5;
const CUBE_MIN_WIDTH = 1.5;
const CUBE_MAX_HEIGHT = 5;
const CUBE_MIN_HEIGHT = 1;
const CUBE_MAX_LENGTH = 2.5;
const CUBE_MIN_LENGTH = 1.5;

// Builds a single building/cube.
export function buildCube(position, scale, scene, selectableList) {
    let height = scale.y / 2;
    const cubeGeo = new THREE.BoxGeometry(scale.x, scale.y, scale.z);
    const cubeMaterial = materials.randomMaterial();
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
    cubeMesh.position.set(position.x, position.y + height, position.z);
    cubeMesh.castShadow = true;
    cubeMesh.receiveShadow = true;
    scene.add(cubeMesh);
    selectableList.push(cubeMesh);
    return cubeMesh;
}

// Builds a plane.
export function buildPlane(width, length, position, material, scene, selectableList) {
    const planeGeo = new THREE.PlaneGeometry(width, length);
    const planeMesh = new THREE.Mesh(planeGeo, material);
    planeMesh.receiveShadow = true;
    planeMesh.castShadow = false;
    planeMesh.position.set(position.x, position.y, position.z);
    planeMesh.rotation.x = Math.PI * -.5;
    scene.add(planeMesh);
    if (selectableList != null) {
        selectableList.push(planeMesh);
    }
    return planeMesh;
}

// Builds a square pyramid.
export function buildLandMark(radius, height, segments, material, scene, selectableList) {
    const pyramidGeo = new THREE.ConeBufferGeometry(radius, height, segments);
    const pyramidMesh = new THREE.Mesh(pyramidGeo, material);
    pyramidMesh.rotation.y = 150;
    pyramidMesh.position.set(0, 4, 12);
    pyramidMesh.receiveShadow = true;
    pyramidMesh.castShadow = true;
    scene.add(pyramidMesh);
    selectableList.push(pyramidMesh);
}

// Builds a light marker.
export function buildLightMarker(position, scene) {
    let cubeWidth = 0.5;
    let cubeHeight = 10;
    let cubeLength = 0.5;
    let height = cubeHeight / 2;
    const cubeGeo = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeLength);
    const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
    cubeMesh.castShadow = false;
    cubeMesh.receiveShadow = false;
    cubeMesh.position.set(position.x, position.y + height, position.z);
    scene.add(cubeMesh);
    return cubeMesh;
}

// Builds the point marker.
export function buildPointMarker(position, scene) {
    const sphereGeo = new THREE.SphereGeometry(0.2, 16, 8);
    const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000});
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMaterial);
    sphereMesh.position.set(position.x, position.y, position.z);
    sphereMesh.castShadow = false;
    sphereMesh.receiveShadow = false;
    scene.add(sphereMesh);
    return sphereMesh;
}

// Builds a city block.
function buildBlock(length, space, origin, scene, selectableList) {
    for (let j = 0; j < length * space; j += space) {
        let cubeWidth = (Math.random() * (CUBE_MAX_WIDTH - CUBE_MIN_WIDTH)) + CUBE_MIN_WIDTH;
        let cubeHeight = (Math.random() * (CUBE_MAX_HEIGHT - CUBE_MIN_HEIGHT)) + CUBE_MIN_HEIGHT;
        let cubeLength = (Math.random() * (CUBE_MAX_LENGTH - CUBE_MIN_LENGTH)) + CUBE_MIN_LENGTH;
        let height = cubeHeight / 2;
        const cubeGeo = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeLength);
        const cubeMaterial = materials.randomMaterial();
        const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
        cubeMesh.castShadow = true;
        cubeMesh.receiveShadow = true;
        cubeMesh.position.set(origin.x, origin.y + height, origin.z + j);
        scene.add(cubeMesh);
        selectableList.push(cubeMesh);
    }
}

// Builds all city blocks.
export function createCityBlocks(scene, selectableList) {
    buildBlock(9, 4, new THREE.Vector3(-10.5, 0, -18), scene, selectableList);
    buildBlock(9, 4, new THREE.Vector3(10.5, 0, -18), scene, selectableList);
    buildBlock(7, 4, new THREE.Vector3(-6.5, 0, -18), scene, selectableList);
    buildBlock(7, 4, new THREE.Vector3(6.5, 0, -18), scene, selectableList);
    buildBlock(2, 4, new THREE.Vector3(-2.5, 0, -18), scene, selectableList);
    buildBlock(2, 4, new THREE.Vector3(2.5, 0, -18), scene, selectableList);
}