// Add selected shape to the scene.
function addShape(name, translation, scale, rotation, shapeToAdd) {
    if (shapeToAdd === "cube") {
        scene.addObject(new Cube(name, scale, translation, rotation));
    }
    else if (shapeToAdd === "square-pyramid") {
        scene.addObject(new SquarePyramid(name, scale, translation, rotation));
    }
    else if (shapeToAdd === "cylinder") {
        scene.addObject(new Cylinder(name, scale, translation, rotation));
    }
    else if (shapeToAdd === "cone") {
        scene.addObject(new Cone(name, scale, translation, rotation));
    }
    else if (shapeToAdd === "disk") {
        scene.addObject(new Disk(name, scale, translation, rotation));
    }
    else if (shapeToAdd === "plane") {
        scene.addObject(new Plane(name, scale, translation, rotation));
    } else {
        console.log("Shape not implemented")
        return; // Prevent unnecessary redrawing of the scene
    }

    scene.draw() // Redraw the scene
}

// Recolor the selected object
function colorObject() {
    let selectedObject = scene.findObject(objects.value);

    if (selectedObject === undefined) {
        error.innerText = "Error: No object selected!";
        return; // Exit early if no object is selected
    }

    error.innerText = "";

    let newColor;

    if (color.value === "pink") {
        newColor = ColorVector.pink();
    }
    else if (color.value === "red") {
        newColor = ColorVector.red();
    }
    else if (color.value === "orange") {
        newColor = ColorVector.orange();
    }
    else if (color.value === "yellow") {
        newColor = ColorVector.yellow();
    }
    else if (color.value === "green") {
        newColor = ColorVector.green();
    }
    else if (color.value === "blue") {
        newColor = ColorVector.blue();
    }
    else if (color.value === "purple") {
        newColor = ColorVector.purple();
    }
    else {
        console.log("Color not implemented");
        return; // Prevent unnecessary redrawing of the scene
    }

    selectedObject.setColor(newColor); // Apply selected color

    scene.draw(); // Redraw the scene
}

// Transform selected object using keyboard commands.
function keyCommands(key) {
    let selectedObject = scene.findObject(objects.value);

    if (selectedObject === undefined) {
        error.innerText = "Error: No object selected!";
        return; // Exit early if no object is selected
    }

    error.innerText = "";

    switch (key) {
        //////// Moving //////////
        case 'd':    // The "D" key was pressed
            selectedObject.moveObject(Move.RIGHT);
            break;
        case 'a':    // The "A" key was pressed
            selectedObject.moveObject(Move.LEFT);
            break;
        case 'w':    // The "W" key was pressed
            selectedObject.moveObject(Move.UP);
            break;
        case 's':    // The "S" key was pressed
            selectedObject.moveObject(Move.DOWN);
            break;
        case 'q':    // The "Q" key was pressed
            selectedObject.moveObject(Move.FORWARD);
            break;
        case 'e':    // The "E" key was pressed
            selectedObject.moveObject(Move.BACKWARD);
            break;

        ///////// Rotating //////////
        case 'h':    // The "H key was pressed
            selectedObject.rotateObject(Rotate.POSITIVE_X);
            break;
        case 'f':    // The "F" key was pressed
            selectedObject.rotateObject(Rotate.NEGATIVE_X);
            break;
        case 't':    // The "T" key was pressed
            selectedObject.rotateObject(Rotate.POSITIVE_Y);
            break;
        case 'g':    // The "G" key was pressed
            selectedObject.rotateObject(Rotate.NEGATIVE_Y);
            break;
        case 'r':    // The "R" key was pressed
            selectedObject.rotateObject(Rotate.NEGATIVE_Z);
            break;
        case 'y':    // The "Y" key was pressed
            selectedObject.rotateObject(Rotate.POSITIVE_Z);
            break;


        /////// Scaling /////////
        case 'l':    // The "L" key was pressed
            selectedObject.scaleObject(Scale.INCREASE_WIDTH);
            break;
        case 'j':    // The "J" key was pressed
            selectedObject.scaleObject(Scale.DECREASE_WIDTH);
            break;
        case 'i':    // The "I" key was pressed
            selectedObject.scaleObject(Scale.INCREASE_HEIGHT);
            break;
        case 'k':    // The "K" key was pressed
            selectedObject.scaleObject(Scale.DECREASE_HEIGHT);
            break;
        case 'u':    // The "U" key was pressed
            selectedObject.scaleObject(Scale.INCREASE_LENGTH);
            break;
        case 'o':    // The "O" key was pressed
            selectedObject.scaleObject(Scale.DECREASE_LENGTH);
            break;
        case 'x':    // The "X" key was pressed
            selectedObject.scaleObject(Scale.INCREASE_SCALE);
            break;
        case 'z':    // The "Z" key was pressed
            selectedObject.scaleObject(Scale.DECREASE_SCALE);
            break;


        ////// Reset transforms ///////
        case 'c':    // The "C" key was pressed
            selectedObject.resetObject();
            break;


        /////// Unknown key command ///////
        default:
            console.log("Unknown key command");
            return; // Prevent unnecessary redrawing
    }

    scene.draw(); // Redraw the scene
}