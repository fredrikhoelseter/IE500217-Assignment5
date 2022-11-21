import * as objectController from "./object-controller.js";
import * as construction from "./construction.js";

export function pointSelectedKeyEvents(keyCode, selectedObject, selectedPlanePoint, scene) {
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
}

export function objectSelectedKeyEvents(keyCode, selectedObject, pointOnPlane, scene, pointMarker) {
    const moveStep = 0.25;
    const rotationStep = Math.PI/32;
    const scaleStep = 0.1;
    switch (keyCode) {
        /////////    DELETE SELECTED OBJECT    /////////
        // Backspace
        case 8:    
            objectController.deleteObject(selectedObject, scene)
            break;
        // Delete
        case 46:
            objectController.insertObjectOnPlane(selectedObject, pointOnPlane, scene, pointMarker);
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
            objectController.scaleObjectY(selectedObject, scaleStep, true);
            break;
        // F
        case 70:
            // Scale down y.
            objectController.scaleObjectY(selectedObject, scaleStep, false);
            break;
        /////////    SCALE SELECTED OBJECT    /////////

        default:
            return;
    }
}