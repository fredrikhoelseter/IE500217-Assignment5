import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';

import { OrbitControls } from "./OrbitControls.js";
import * as construction from "./construction.js"
import * as light from "./lighting.js";


const landmarkColor = 0xFFD700;
const hoverColor = 0xFF9900;
const selectedColor = 0xFF0000;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x5D3FD3);

//Camera
const FOV = 20;
const ASPECT = window.innerWidth / window.innerHeight;
const NEAR = 0.1;
const FAR = 1000;
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
camera.position.set(-70, 30, -100);
camera.lookAt(0, 0, 0);

//Ground for the city
construction.buildPlane(25, 40, new THREE.Vector3(0,0,0), new THREE.MeshPhongMaterial({color: 0x747474}), scene);

construction.buildPlane(8, 15, new THREE.Vector3(0, 0.1, -3), new THREE.MeshPhongMaterial({color: 0x008013}), scene);

//Complex buildings for the city
construction.createCityBlocks(scene);

//Landmark for the city
construction.buildLandMark(6,8,4, new THREE.MeshPhongMaterial({color: landmarkColor}), scene);

//Lighting
light.ambientLighting(0xFFFFFF, 0.5, scene);
light.directionalLighting(0xFFFFFF, 0.7, new THREE.Vector3(10, 15, -30), scene);

//Render the scene
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/// GUI
const gui = new GUI();

//Controls for camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

// Raycaster for mouse to world position.
const raycaster = new THREE.Raycaster();
// Mouse position
const mouse = new THREE.Vector2();

/**
 * Updates the position of mouse to the mouse cursor position.
 */
function onMouseMove(event) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}


let selectedObject = null;

function onClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersectObjects = raycaster.intersectObjects(scene.children);
    if (intersectObjects.length > 0) {
        selectedObject = intersectObjects[0].object;
    } else {
        selectedObject = null;
    }
}

/**
 * Resets the material. Currently only resets the landmark to its correct color,
 * the buildings are reset to a green color.
 */
function resetMaterials() {
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].material && scene.children[i].geometry.type != 'PlaneGeometry') {
            if (scene.children[i] == selectedObject) {
                scene.children[i].material.color.set(selectedColor);
            } else if (scene.children[i].geometry.type == 'BoxGeometry') {
                scene.children[i].material.color.set(0x00ff00);
            } else {
                scene.children[i].material.color.set(landmarkColor);
            }
            
            //scene.children[i].material.transparent = false;
        }
    }
}

/**
 * Changes the color of the object hovered over by the mouse cursor.
 */
function hoverObject() {
    // update the picking ray with the camera and pointer position
	raycaster.setFromCamera(mouse, camera);

	// calculate objects intersecting the picking ray
	const intersectObjects = raycaster.intersectObjects(scene.children);
    if (intersectObjects.length > 0) {
        if (intersectObjects[0].object.geometry.type != 'PlaneGeometry') {
            if (intersectObjects[0].object == selectedObject) {
                intersectObjects[0].object.material.color.set(selectedColor);
            } else {
	            intersectObjects[0].object.material.color.set(hoverColor);
            }
        }
        //intersects[0].object.material.transparent = true;
        //intersects[0].object.material.opacity = 0.5;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('click', onClick);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    let keyCode = event.which;
    
    if (selectedObject == null) {
        console.log("No object selected");
    } else {
        switch (keyCode) {
            // Backspace
            case 8:    
                scene.remove(selectedObject);
                break;
            // Delete
            case 46:
                scene.remove(selectedObject);
                break;

            default:
                return;
        }
    };
}

function animate() {
    resetMaterials();
    hoverObject();
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);

}
animate();

