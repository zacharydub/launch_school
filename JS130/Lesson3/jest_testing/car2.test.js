const Car = require('./car');

describe('The Car class', () => {
    let car; // declare the variable car outside the beforeEach callback, then assign it inside the callback. Otherwise, our test callbacks won't have access to the variable because of lexical scoping
    beforeEach(() => { //callback is called before running each test. Since we have 9 tests, beforeEach will run 9 times.
        car = new Car();
    });

    test('has four wheels', () => {
        expect(car.wheels).toBe(4);
    });

    test('two newly created cars are object equal', () => {
        let car2 = new Car();

        expect(car).toEqual(car2);
    });

    test('a newly created car does not have doors', () => {
        expect(car.doors).toBeUndefined();
    });

    test('raises an error when called drive on it', () => {
        expect(() => car.drive()).toThrow();
    });

    test('raises a TypeError when called drive on it', () => {
        expect(() => car.drive()).toThrow(TypeError);
    });

    test('a new car has no mileage info', () => {
        expect(car.mileageInfo).toBeNull();
    });

    test('wheels is truthy', () => {
        expect(car.wheels).toBeTruthy();
    });

    test('array contains car', () => {
        let arr = [1, 2, 3];
        arr.push(car);

        expect(arr).toContain(car);
    });

    test('car has wheels', () => {
        expect(car.wheels).not.toBeUndefined();
    });
});

//the 'afterEach' callback, if present -- we don't have one -- is called after running each test. We don't have any need for a teardown, so don't need the callback. In other cases, we may need a teardown to clean up files, log some information, or close a database connection.

//You might argue that we don't need beforeEach to instantiate a new Car object. We could, for instance, initialize the car variable at the top of the describe callback and assign it a new Car object. That would work here. However, in most cases, you need to make changes to your object and experiment with it. If you don't use the beforeEach callback, the car object won't get reset for each test. It's better to create a new object for each test so that you have one with a known state.

////experiment with 'make changes to object'