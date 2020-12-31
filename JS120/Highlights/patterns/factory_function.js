
//factory function AKA object factory
//functions that return objects - reusing code to automate the process of creating objects of the same 'type,' meaning they will have the same props. But cant determine whether an object was created by a factory function, and so certaintly cant inspect which factory function created it, or in other words where does it inherit its props from AKA what is its prototype. Also, as every newly created object will have a copy of all the methods, this is wasteful on memory. ALso, once objects are created with their own method copies, if we want to change how a certain method works we would have to manually change each inidivudal object, instead of just changing the method behavior in some central location that affects all methods of a given name.
function createGarment(type, size, count, brand = 'Gap') {
    return {
        type: type,//'initializer' to the right of the two dots, which gets dropped in shorthand when prop name === param name
        size,
        count,
        brand,
        wanted: false,
        sell: function () {
            this.count--;
        },
        stock() {
            this.count++;
        },
        want() {
            this.wanted = true;
        },
        isWanted() {
            return `This shirt ${this.wanted ? 'is' : 'is not'} wanted.`;
        }
    }
}
// let garment1 = createGarment('shirt', 'Large', 5)
// console.log(garment1)
// console.log(garment1.wanted)
// console.log(garment1.isWanted())
// console.log(garment1.want())
// console.log(garment1.wanted)
// console.log(garment1.isWanted())


function createGarment1(args) {
    return {
        type: args.type,//'initializer' to the right of the two dots, which gets dropped in shorthand when prop name === param name
        size: args.size,
        count: args.count,
        brand: 'Gap',
        wanted: false,
    }
}

// let props = {
//     type:'pants',
//     size:'medium',
//     count:10
// }
// let garment2 = createGarment1(props)
// console.log(garment2)


//advantage of object factory over other creation patterns: lets us create objcts with private state