// Light attenuation (distance is not squared in this case because three.js attenuation is linear by default)
export function calculateLightSensor(sensor, sun) {
    let attLight = 1 / sensor.position.distanceTo(sun.position);

    let cubeColor;
    if (attLight < 0.03) cubeColor = 0x2F77E7;
    else if (attLight < 0.04) cubeColor = 0xEEAF29;
    else cubeColor = 0xF1225F;

    sensor.material.color.set(cubeColor);
}