//#1 - triangle
// Determine if a triangle is equilateral, isosceles, or scalene. || An equilateral triangle has all three sides the same length. || An isosceles triangle has at least two sides the same length. (It is sometimes specified as having exactly two sides the same length, but for the purposes of this exercise we'll say at least two.) || A scalene triangle has all sides of different lengths.
//Note: For a shape to be a triangle at all, all sides have to be of length > 0, and the sum of the lengths of any two sides must be greater than or equal to the length of the third side.

class Triangle {
    constructor(side1, side2, side3) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
        //this.sides = [side1,side2,side3]
    }
    kind() {
        this.validity()
        this.sides()
        return this.types()
    }
    validity() {
        // let [side1,side2,side3] = this.sides

        if (this.side1 <= 0 || this.side2 <= 0 || this.side3 <= 0) {
            throw new Error('no zero or negative sides')
        }
    }
    sides() {
        // let [side1,side2,side3] = this.sides

        if ((this.side1 + this.side2 < this.side3)
            ||
            (this.side1 + this.side3 < this.side2)
            ||
            (this.side2 + this.side3 < this.side1)) {
            throw new Error('2 sides must be greater than 3rd')
        }
    }
    types() {
        // let [side1,side2,side3] = this.sides

        if (this.side1 === this.side2 && this.side1 === this.side3) {
            return 'equilateral'
        } else if ((this.side1 === this.side2 && this.side1 !== this.side3)
            ||
            (this.side1 === this.side3 && this.side1 !== this.side2)
            ||
            (this.side2 === this.side3 && this.side2 !== this.side1)) {
            return 'isosceles'
        } else {
            return 'scalene'
        }
    }

}
module.exports = Triangle