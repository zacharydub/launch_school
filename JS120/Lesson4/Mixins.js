// //how can you use the Speed object as a mix-in to make them goFast? How can you check whether your Car or Truck can now go fast?
// const Speed = {
//   goFast() {
//     console.log(`I'm a ${this.constructor.name} and going super fast!`);
//   }
// };

// class Car {
//   goSlow() {
//     console.log(`I'm safe and driving slow.`);
//   }
// }
// //my code
// Object.assign(Car.prototype, Speed)
// let car1 = new Car()
// car1.goFast()
// //

// class Truck {
//   goVerySlow() {
//     console.log(`I'm a heavy truck and like going very slow.`);
//   }
// }
// //my code
// Object.assign(Truck.prototype, Speed)
// let truck1 = new Truck()
// truck1.goFast()
// //

// //can also use the 'in' operator
// 'goFast' in car1;  // => true
// 'goFast' in truck1; // => true

// #2
//In the last question, we used a mix-in named Speed that contained a goFast method. We included the mix-in in the Car class and then called the goFast method from an instance of the Car class. You may have noticed that the string printed when we call goFast includes the name of the type of vehicle we are using. How is that done?

//A:
//We used this.constructor.name to determine the name. It works like this:
// Within goFast, this refers to the object that invoked the method. In this case, we used Car and Truck objects.
// The constructor property of goFast references the class that the object belongs to, i.e., Car or Truck.
// Constructors have a name property  that merely contains the name of the class as a string, and that's what we output in goFast.

// #3
const Moveable = {
  range() {
    return this.fuelCap * this.fuelEfficiency;
  },
}

class WheeledVehicle {
  constructor(tirePressure,) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }

  //moved to mix-in object
  // range() {
  //   return this.fuelCap *  this.fuelEfficiency;
  // }
}
//my code
Object.assign(WheeledVehicle.prototype, fuelRange)

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30, 30, 32, 32], 50, 25.0);
  }
}


class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20, 20], 80, 8.0);
  }
}
// Their boss now wants them to incorporate a new type of vehicle: a Catamaran:
class Catamaran {
  constructor(propellerCount, hullCount,) {
    // catamaran specific logic
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}
//my code
Object.assign(Catamaran.prototype, fuelRange)
//Q -This new class doesn't fit well with our existing class hierarchy: Catamarans don't have tires, and aren't wheeled vehicles. However, we still want to share the code for tracking *fuel efficiency* and *range*. Modify the class definitions and move code into a mix-in, as needed, to share code between the Catamaran and the wheeled vehicle classes.

//A - We've moved the code shared by Catamaran and WheeledVehicles to the Moveable mix-in. The definitions of Auto and Motorcycle remain unchanged since they both inherit from WheeledVehicle.

