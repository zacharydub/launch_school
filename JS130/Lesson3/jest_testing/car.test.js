const Car = require("./car");

describe("The Car class", () => {
    test("has four wheels", () => {
        let car = new Car();
        expect(car.wheels).toBe(4);
    });
    ////failed test case:
    // test("bad wheels", () => {
    //     let car = new Car();
    //     expect(car.wheels).toBe(3);
    // });
    ////skipped test case
    // test.skip('smells like', () => {
    //     let car = new Car('royal');
    //     expect(car.smell).toBe('royal')
    // })
    ////skipped test case
    xtest('smells like', () => { // 'xtest' is alias for test.skip
        let car = new Car('royal');
        expect(car.smell).toBe('royal')
    })
    test('smells & flavor', () => {
        let car = new Car('royal', 'lemon');
        expect(car.smell).toBe('royal')
        expect(car.flavor).toBe('lemon')
    })
    ////toEqual matcher - compares the properties of one object with those of the other. If they have the same number of properties with the same values, they're considered equal. The test would fail if you used toBe instead of toEqual. On the other hand, a test that passes with toBe will also pass with toEqual.
    test('two new cars are equal objects', () => {
        let car1 = new Car();
        let car2 = new Car();
        expect(car1).toEqual(car2);
    });
    ////toBeUndefined matcher
    test('does not have doors', () => {
        let car = new Car();
        //no doors prop defined on class
        expect(car.doors).toBeUndefined();
    });
    ////toThrow matcher
    test('raises an error when called drive on it', () => {
        let car = new Car();
        ////no drive method defined - wrapped the car.drive() invocation in a function. Otherwise, calling car.drive() directly will raise an exception before toThrow gets an opportunity to detect it.
        expect(() => car.drive()).toThrow();
    });
    test('raises a TypeError when called drive on it', () => {
        let car = new Car();
        expect(() => car.drive()).toThrow(TypeError);
    });
    ////toBeNull
    test('a new car has no mileage info', () => {
        let car = new Car();
        expect(car.mileageInfo).toBeNull();
    });
    ////toBeTruthy
    test('wheels is truthy', () => {
        let car = new Car();
        expect(car.wheels).toBeTruthy();
    });
    ////toContain
    test('array contains car', () => {
        let car = new Car();
        let arr = [1, 2, 3];
        arr.push(car);

        expect(arr).toContain(car);
    });
    ////invert any Matcher with 'not' prop
    test('car has wheels', () => {
        let car = new Car();
        expect(car.wheels).not.toBeUndefined();
    });
});