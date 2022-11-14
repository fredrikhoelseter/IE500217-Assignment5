import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';

import { OrbitControls } from "./OrbitControls.js";
import * as construction from "./construction.js"
import * as light from "./lighting.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x5D3FD3);

//Camera
const FOV = 20;
const ASPECT = 2;
const NEAR = 0.1;
const FAR = 1000;
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
+ camera.position.set(-70, 30, -100);

//Ground for the city
construction.buildPlane(25, 40, new THREE.Vector3(0,0,0), new THREE.MeshPhongMaterial({color: 0x747474}), scene);

construction.buildPlane(8, 15, new THREE.Vector3(0, 0.1, -3), new THREE.MeshPhongMaterial({color: 0x008013}), scene);

//Complex buildings for the city
construction.createCityBlocks(scene);

//Landmark for the city
construction.buildLandMark(6,8,4, new THREE.MeshPhongMaterial({color: 0xFFD700}), scene);

//Lighting
light.ambientLighting(0xFFFFFF, 0.5, scene);
light.directionalLighting(0xFFFFFF, 0.7, new THREE.Vector3(10, 15, -30), scene);

//Render the scene
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

/// GUI
const gui = new GUI();


//Controls for camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();