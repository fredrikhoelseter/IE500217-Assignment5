const textureLoader = new THREE.TextureLoader();

const glazedTexture = textureLoader.load('resources/images/glazed.png');

const waveTexture = textureLoader.load('resources/images/wave.png');

const blackTexture = textureLoader.load('resources/images/black.png');

const orientalTexture = textureLoader.load('resources/images/oriental.png');

const pinkTexture = textureLoader.load('resources/images/pink.png');


export function randomMaterial(){
    if(Math.random() < 0.20){
        return new THREE.MeshStandardMaterial({map: glazedTexture});
    } else if(Math.random() < 0.40){
        return new THREE.MeshStandardMaterial({map: waveTexture});
    } else if(Math.random() < 0.60){
        return new THREE.MeshStandardMaterial({map: blackTexture});
    }else if(Math.random() < 0.70){
        return new THREE.MeshStandardMaterial({map: orientalTexture});
    } else{
        return new THREE.MeshStandardMaterial({map: pinkTexture});
    }
}