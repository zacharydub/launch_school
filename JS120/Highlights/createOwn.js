//instanceof
function isInstanceOf(obj, constructorFunction) {
    while (obj) {
        obj = Object.getPrototypeOf(obj);
        if (obj === constructorFunction.prototype) return true;
    }

    return false;
}

// See if an object contains a property as one of its own -> create your own hasOwnProperty
// Return all the property names of an object -> create your own Object.getOwnPropertyNames
// Copy all properties from one object to another -> create your own Object.assign

//reproduce behavior of call/bind