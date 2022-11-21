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

let selectedObject = null;
let selectedPlanePoint = null;
let currentPointMarker = null;
let updatePosX = 0;
let updatePosY = 0;
let updatePosZ = 0;


/// GUI
const gui = new GUI();
const obj = {
    translate: "'W''A''S''D'",
    rotate: "'Q''E'",
    scale: "'Z''X''R''F''C''V'",
    delete: "'DELETE''BACKSPACE'",
    insert: "'ENTER'",
    
    posX: updatePosX,
    posY: updatePosY,
    posX: updatePosZ,
    updateBuilding: updateBuilding,
    
    deleteBuilding: deleteBuilding,
    insertBuilding: insertBuilding
    
};
const editFolder = gui.addFolder('Edit selected building');/*
editFolder.add(obj, 'posX').onChange(value => {
    alert(value);
    updatePosX = value;
});

editFolder.add(obj, 'posY').onChange(value => {
    //updatePosition.y = value;
});
editFolder.add(obj, 'posZ').onChange(value => {
    //updatePosition.z = value;
});

editFolder.add(obj, 'updateBuilding');
*/

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

//Controls for camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

// Raycaster for mouse to world position.
const raycaster = new THREE.Raycaster();
// Mouse position
const mouse = new THREE.Vector2();

function updateBuilding() {
    if (selectedObject != null) {
        selectedObject.position.set(updatePosX, updatePosY, upd);
    } else {
        alert('No building selected');
    }
}

function deleteBuilding() {
    if (selectedObject != null) {
        scene.remove(selectedObject);
        selectedObject = null;
    } else {
        alert('No building selected');
    }
}

function insertBuilding() {
    if (selectedPlanePoint != null) {
        selectedObject = construction.buildCube(selectedPlanePoint, new THREE.Vector3(1.5, 3, 1.5), scene);
        selectedPlanePoint = null;
        if (currentPointMarker != null) {
            scene.remove(currentPointMarker);
        }
    } else {
        alert('No point on the plane selected');
    }
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
    const intersectObjects = raycaster.intersectObjects(scene.children);
    if (currentPointMarker != null) {
        scene.remove(currentPointMarker);
    }
    if (intersectObjects.length > 0) {
        if (intersectObjects[0].object.geometry.type != 'PlaneGeometry') {
            selectedPlanePoint = null;
            selectedObject = intersectObjects[0].object;
        } else {
            selectedObject = null;
            selectedPlanePoint = intersectObjects[0].point;
            currentPointMarker = construction.buildPointMarker(selectedPlanePoint, scene);
        }
    } else {
        selectedObject = null;
        selectedPlanePoint = null;
    }
}

/**
 * Resets the material. Currently only resets the landmark to its correct color,
 * the buildings are reset to a green color.
 */
function resetMaterials() {
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].material && scene.children[i].geometry.type != 'PlaneGeometry' 
        && scene.children[i].geometry.type != 'SphereGeometry') {
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
    const moveStep = 0.25;
    const rotationStep = Math.PI/32;
    const scaleStep = 0.1;
    if (selectedPlanePoint == null && selectedObject == null) {
        console.log("No object or point selected.");
    } else if (selectedPlanePoint != null && selectedObject != null) {
        console.log("Something went wrong, selectedPlanePoint and selectedObject were both " +
        "not null at the same time, which should not happen.");
    } else if (selectedPlanePoint != null) {
        switch (keyCode) {
            /////////    INSERT NEW CUBE OBJECT    /////////
            // Enter
            case 13:
                // Insert a new cube to the scene and assign the selectedObject to it.
                selectedObject = construction.buildCube(selectedPlanePoint, new THREE.Vector3(1.5, 3, 1.5), scene);
                selectedPlanePoint = null;
                if (currentPointMarker != null) {
                    scene.remove(currentPointMarker);
                }
                break;
            /////////    INSERT NEW CUBE OBJECT    /////////

            default:
                return;
        }
    } else if (selectedObject != null) {
        switch (keyCode) {
            /////////    DELETE SELECTED OBJECT    /////////
            // Backspace
            case 8:    
                deleteBuilding();
                break;
            // Delete
            case 46:
                deleteBuilding();
                break;
            /////////    DELETE SELECTED OBJECT    /////////

        

            /////////    MOVE SELECTED OBJECT    /////////
            // A
            case 65:
                // Move selectedObject in positive x-direction.
                selectedObject.position.x += moveStep
                break;
            // D
            case 68:
                // Move selectedObject in negative x-direction.
                selectedObject.position.x -= moveStep
                break;
            // W
            case 87:
                // Move selectedObject in positive z-direction.
                selectedObject.position.z += moveStep
                break;
            // S
            case 83:
                // Move selectedObject in negative z-direction.
                selectedObject.position.z -= moveStep
                break;
            /////////    MOVE SELECTED OBJECT    /////////



            /////////    ROTATE SELECTED OBJECT    /////////
            // Q
            case 81:
                // Rotate selected object clockwise around y-axis.
                selectedObject.rotation.y -= rotationStep;
                break;
            // E
            case 69:
                // Rotate selected object counter-clockwise around y-axis.
                selectedObject.rotation.y += rotationStep;
                break;
            /////////    ROTATE SELECTED OBJECT    /////////



            /////////    SCALE SELECTED OBJECT    /////////
            // Z
            case 90:
                // Scale up x.
                selectedObject.scale.x += scaleStep;
                break;
            // X
            case 88:
                // Scale down x.
                selectedObject.scale.x -= scaleStep;
                break;
            // C
            case 67:
                // Scale up z.
                selectedObject.scale.z += scaleStep;
                break;
            // V
            case 86:
                // Scale down z.
                selectedObject.scale.z -= scaleStep;
                break;
            // R
            case 82:
                // Scale up y.
                selectedObject.scale.y += scaleStep;
                // TODO: Adjust y position so the object only scales "upwards"
                break;
            // F
            case 70:
                // Scale down y.
                selectedObject.scale.y -= scaleStep;
                // TODO: Adjust y position so the object only downscales "upwards"
                break;
            /////////    SCALE SELECTED OBJECT    /////////

            default:
                return;
        }
    } 
}

function animate() {
    resetMaterials();
    hoverObject();
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);

}
animate();

