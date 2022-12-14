import * as buildings from './buildings.js';

// Deletes an object from the scene, and removes it from the selectable list.
export function deleteObject(object, scene, selectableList) {
    if (object != null) {
        selectableList.splice(selectableList.indexOf(object), 1);
        scene.remove(object);
        
        object = null;
    } else {
        alert('No building selected');
    }
}

// Adds an object to the scene at the pointOnPlane position.
// Adds the object to the selectableList.
export function insertObjectOnPlane(pointOnPlane, scene, pointMarker, selectableList) {
    if (pointOnPlane != null) {
        buildings.buildCube(pointOnPlane, new THREE.Vector3(1.5, 3, 1.5), scene, selectableList);
        pointOnPlane = null;
        if (pointMarker != null) {
            scene.remove(pointMarker);
        }
    } else {
        alert('No point on the plane selected');
    }
}

// Scales the object along y-axis. Adjusts the objects position,
// so the bottom vertices dont change position.
export function scaleObjectY(object, scaleStep, isPositive) {
    let scale = -scaleStep;
    if (isPositive) {
        scale = scaleStep;
    } 
    object.scale.y += scale;
    
    const geometry = object.geometry;
    geometry.computeBoundingBox();
    const bb = geometry.boundingBox;
    const object3DHeight = bb.max.y - bb.min.y;

    object.position.y += object3DHeight*scale/2;
}