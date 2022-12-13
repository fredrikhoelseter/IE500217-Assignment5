import * as construction from './construction.js';

export function deleteObject(object, scene, selectableList) {
    if (object != null) {
        selectableList.splice(selectableList.indexOf(object), 1);
        scene.remove(object);
        
        object = null;
    } else {
        alert('No building selected');
    }
}

export function insertObjectOnPlane(pointOnPlane, scene, pointMarker, selectableList) {
    if (pointOnPlane != null) {
        construction.buildCube(pointOnPlane, new THREE.Vector3(1.5, 3, 1.5), scene, selectableList);
        pointOnPlane = null;
        if (pointMarker != null) {
            scene.remove(pointMarker);
        }
    } else {
        alert('No point on the plane selected');
    }
}

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