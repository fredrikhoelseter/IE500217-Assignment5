import * as construction from './construction.js';

export function deleteObject(object, scene) {
    if (object != null) {
        scene.remove(object);
        object = null;
    } else {
        alert('No building selected');
    }
}

export function insertObjectOnPlane(object, pointOnPlane, scene, pointMarker) {
    if (pointOnPlane != null) {
        object = construction.buildCube(pointOnPlane, new THREE.Vector3(1.5, 3, 1.5), scene);
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