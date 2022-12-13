import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';

import { OrbitControls } from "./OrbitControls.js";
import * as construction from "./construction.js";
import * as light from "./lighting.js";
import * as sun from "./sun.js";
import * as keyCommands from "./keycommands.js";
import * as objectController from "./object-controller.js";
import * as shadowVariation from "./shadow-variation.js";


const landmarkColor = 0xFFD700;
const hoverColor = 0x99FF00;
const selectedColor = 0xFF0000;

let selectableList = [];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x5D3FD3);

// Camera
const FOV = 20;
const ASPECT = window.innerWidth / window.innerHeight;
const NEAR = 0.1;
const FAR = 1000;
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
camera.position.set(-70, 30, -100);
camera.lookAt(0, 0, 0);

// Ground for the city
construction.buildPlane(25, 40, new THREE.Vector3(0,0,0), new THREE.MeshPhongMaterial({color: 0x747474}), scene, selectableList);

const park = construction.buildPlane(8, 15, new THREE.Vector3(0, 0.1, -3), new THREE.MeshPhongMaterial({color: 0xa5f245}), scene, selectableList);


// Complex buildings for the city
construction.createCityBlocks(scene, selectableList);

//Landmark for the city
construction.buildLandMark(6,8,4, new THREE.MeshPhongMaterial({color: landmarkColor}), scene, selectableList);


// Lighting
light.ambientLighting(0xFFFFFF, 0.5, scene);
//light.directionalLighting(0xFFFFFF, 0.7, new THREE.Vector3(10, 15, -30), scene);
//light.pointLighting(0xFFFFFF, 0.1, new THREE.Vector3(-30, 0, 0), scene);

// Render the scene
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Selection variables
let selectedObject = null;
let selectedPlanePoint = null;
let currentPointMarker = null;

// Create the sun
const mySun = new sun.Sun(false, scene, renderer, camera);

// Animate the sun
mySun.animateOrbit();

const shadowVar = new shadowVariation.ShadowVariation(park, mySun, scene);

// GUI
const gui = new GUI();
const obj = {
    translate: "'W''A''S''D'",
    rotate: "'Q''E'",
    scale: "'Z''X''R''F''C''V'",
    delete: "'DELETE''BACKSPACE'",
    insert: "'ENTER'",
    
    deleteBuilding: deleteBuilding,
    insertBuilding: insertBuilding,
    calculateShadow: shadowTest,
    deleteHeatmap: deleteHeatmap
    
};
const editFolder = gui.addFolder('Edit selected building');

gui.add(mySun, 'isCycling').onChange(value => {
    mySun.animateOrbit();
});
gui.add(obj, "calculateShadow");
gui.add(obj, "deleteHeatmap");



editFolder.add(obj, 'deleteBuilding');
editFolder.close();

const insertFolder = gui.addFolder('Insert new building');
insertFolder.add(obj, 'insertBuilding');
insertFolder.close();

const keyFolder = gui.addFolder('Key Bindings');
keyFolder.add(obj, 'translate');
keyFolder.add(obj, 'rotate');
keyFolder.add(obj, 'scale');
keyFolder.add(obj, 'delete');
keyFolder.add(obj, 'insert');
keyFolder.close();

// Controls for camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

function shadowTest() {
    shadowVar.createHeatMap();
}

function deleteHeatmap() {
    shadowVar.deleteHeatMap();
}

// Raycaster for mouse to world position.
const raycaster = new THREE.Raycaster();
// Mouse position
const mouse = new THREE.Vector2();

function deleteBuilding() {
    objectController.deleteObject(selectedObject, scene, selectableList)
}

function insertBuilding() {
    objectController.insertObjectOnPlane(selectedPlanePoint, scene, currentPointMarker, selectableList);
}

/**
 * Updates the position of mouse to the mouse cursor position.
 */
function onMouseMove(event) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

/**
 * If the raycaster hits a non-plane object, will save that object to selectedObjectvariable.
 * If the raycaster hits a PlaneGeometry object, it will save the intersection position on
 * the plane to the selectedPlanePoint variable. It will also create a point marker
 * at the position.
 */
function onClick() {
    raycaster.setFromCamera(mouse, camera);
    const intersectObjects = raycaster.intersectObjects(selectableList);
    if (currentPointMarker != null) {
        scene.remove(currentPointMarker);
    }
    // Checks to see if the ray has intersected with any object.
    if (intersectObjects.length <= 0) {
        selectedObject = null;
        selectedPlanePoint = null;
        return;
    }
    // Checks if the first intersect object is a sphere.
    // Avoids being able to select the sun.
    if (intersectObjects[0].object.geometry.type == 'SphereGeometry') {
        selectedObject = null;
        selectedPlanePoint = null;
        return;
    }
    if (intersectObjects[0].object.geometry.type != 'PlaneGeometry') {
        selectedPlanePoint = null;
        selectedObject = intersectObjects[0].object;
    } else {
        selectedObject = null;
        selectedPlanePoint = intersectObjects[0].point;
        currentPointMarker = construction.buildPointMarker(selectedPlanePoint, scene);
    }
}

/**
 * Resets the material. Currently only resets the landmark to its correct color,
 * the buildings are reset to a green color.
 */
function resetMaterials() {
    for (let i = 0; i < selectableList.length; i++) {
        if (selectableList[i].material && selectableList[i].geometry.type != 'PlaneGeometry') {
            if (selectableList[i] == selectedObject) {
                selectableList[i].material.color.set(selectedColor);
            } else if (selectableList[i].geometry.type == 'BoxGeometry') {
                selectableList[i].material.color.set(0xFFFFFF);
            } else {
                selectableList[i].material.color.set(landmarkColor);
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
	const intersectObjects = raycaster.intersectObjects(selectableList);
    if (intersectObjects.length > 0) {
        if (intersectObjects[0].object.geometry.type != 'PlaneGeometry' && intersectObjects[0].object != selectedObject
        && intersectObjects[0].object.geometry.type != 'SphereGeometry') {
	        intersectObjects[0].object.material.color.set(hoverColor);
        }
        //intersects[0].object.material.transparent = true;
        //intersects[0].object.material.opacity = 0.5;
    }
}

/**
 * Adjusts the renderer size according to the size of the browser window.
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Event listeners.
window.addEventListener('resize', onWindowResize);
window.addEventListener('click', onClick);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener("keydown", onDocumentKeyDown, false);

/**
 * Keyboard bindings.
 * @param {*} event 
 */
function onDocumentKeyDown(event) {
    let keyCode = event.which;
    if (selectedPlanePoint == null && selectedObject == null) {
        console.log("No object or point selected.");
    } else if (selectedPlanePoint != null && selectedObject != null) {
        console.log("Something went wrong, selectedPlanePoint and selectedObject were both " +
        "not null at the same time, which should not happen.");
    } else if (selectedPlanePoint != null) {

        keyCommands.pointSelectedKeyEvents(keyCode, selectedObject, selectedPlanePoint, scene, selectableList);

    } else if (selectedObject != null) {

        keyCommands.objectSelectedKeyEvents(keyCode, selectedObject, selectedPlanePoint, scene, currentPointMarker, selectableList);

    } 
}

function animate() {
    resetMaterials();
    hoverObject();
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);

}
animate();

