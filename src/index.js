const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");
const colorButton = document.getElementById("apply-color");
const color = document.getElementById("color");
const shape = document.getElementById("shape");
const scaleX = document.getElementById("scale-x");
const scaleY = document.getElementById("scale-y");
const scaleZ = document.getElementById("scale-z");
const translationX = document.getElementById("translation-x");
const translationY = document.getElementById("translation-y");
const translationZ = document.getElementById("translation-z");
const rotationZ = document.getElementById("rotation-z");
const objects = document.getElementById("objects");
const error = document.getElementById("error");

const scene = new Scene();

// Gets the position, scale, rotation, and shape from the HTML input fields. Adds a new object
// based on the inputs in the fields.
addButton.onclick = function() {
    const name = 'object_'.concat(shape.value).concat(String(Date.now()));
    const translation = [Number(translationX.value), Number(translationY.value), Number(translationZ.value)];
    const scale = [Number(scaleX.value), Number(scaleY.value), Number(scaleZ.value)];
    const rotation = Number(rotationZ.value);
    const shapeToAdd = shape.value;

    addShape(name, translation, scale, rotation, shapeToAdd);

    updateObjectList();
};

// Removes the selected object from the scene.
removeButton.onclick = function() {
    scene.removeObject(objects.value);
    scene.draw();

    updateObjectList();
};

// Applies selected color to the selected object.
colorButton.onclick = function() {
    colorObject();
};

// Updates the displayed object list.
function updateObjectList() {
    console.log("Updated object list");

    objects.innerHTML = "";

    for (let object of scene.objects) {
        const option = document.createElement("option");
        option.innerHTML = object.name;
        objects.appendChild(option);
    }
}

// Transform selected object using keyboard buttons/commands.
document.onkeydown = function(event) {
    keyCommands(event.key);
};