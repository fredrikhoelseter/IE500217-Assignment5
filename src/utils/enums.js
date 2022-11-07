// Enums are not supported by the running javascript version, hence this implementation.

// Move in x, y, or z direction.
const Move = {
    FORWARD: 0,
    BACKWARD: 1,
    UP: 2,
    DOWN: 3,
    LEFT: 4,
    RIGHT: 5
}

// Rotate around x, y, or z axis.
const Rotate = {
    POSITIVE_Z: 0,
    NEGATIVE_Z: 1,
    POSITIVE_Y: 2,
    NEGATIVE_Y: 3,
    POSITIVE_X: 4,
    NEGATIVE_X: 5,
}

// Scale in x, y, or z direction.
const Scale = {
    INCREASE_LENGTH: 0,
    DECREASE_LENGTH: 1,
    INCREASE_HEIGHT: 2,
    DECREASE_HEIGHT: 3,
    INCREASE_WIDTH: 4,
    DECREASE_WIDTH: 5,
    INCREASE_SCALE: 6,
    DECREASE_SCALE: 7
}