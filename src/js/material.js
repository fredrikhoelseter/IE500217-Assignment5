const textureLoader = new THREE.TextureLoader();

const glazedTexture = textureLoader.load('resources/images/glazed.png');
const glazedMaterial = new THREE.MeshStandardMaterial({map: glazedTexture});

const waveTexture = textureLoader.load('resources/images/wave.png');
const waveMaterial = new THREE.MeshStandardMaterial({map: waveTexture});

const blackTexture = textureLoader.load('resources/images/black.png');
const blackMaterial = new THREE.MeshStandardMaterial({map: blackTexture});

const orientalTexture = textureLoader.load('resources/images/oriental.png');
const orientalMaterial = new THREE.MeshStandardMaterial({map: orientalTexture});

const pinkTexture = textureLoader.load('resources/images/pink.png');
const pinkMaterial = new THREE.MeshStandardMaterial({map: pinkTexture});

export const materials = [glazedMaterial, waveMaterial, blackMaterial, orientalMaterial, pinkMaterial];

export function randomMaterial(){
    if(Math.random() < 0.20){
        return materials[0];
    } else if(Math.random() < 0.40){
        return materials[1];
    } else if(Math.random() < 0.60){
        return materials[2];
    }else if(Math.random() < 0.70){
        return materials[3];
    } else{
        return materials[4];
    }
}