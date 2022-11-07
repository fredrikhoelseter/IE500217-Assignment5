// Represents an rgb color.
class ColorVector {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    // Returns a new color vector with random values between 0 and 1 for each attribute.
    static randomColor() {
        return new ColorVector(Math.random(), Math.random(), Math.random());
    }

    ///// Predefined colors //////

    static pink() {
        return new ColorVector(0.96, 0.66, 0.71);
    }

    static red() {
        return new ColorVector(0.72, 0.07, 0.14);
    }

    static orange() {
        return new ColorVector(0.93, 0.47, 0.26);
    }

    static yellow() {
        return new ColorVector(0.96,0.97, 0.46);
    }

    static green() {
        return new ColorVector(0.0, 1.0, 0.5);
    }

    static blue() {
        return new ColorVector(0.0, 0.70, 0.93);
    }

    static purple() {
        return new ColorVector(0.58, 0.44, 0.86);
    }
}