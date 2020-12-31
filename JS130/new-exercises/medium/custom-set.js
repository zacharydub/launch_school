'use strict'

class CustomSet {
    constructor(elements = []) {
        this.elements = elements;
    }

    empty() {
        return this.elements.length === 0;
    }
    contains(num) {
        return this.elements.includes(num);
    }
    subset(newObj) {
        // for (let i = 0; i < this.elements.length; i++) {
        //     if (!newObj.contains(this.elements[i])) return false;
        // }
        // return true;
        return this.elements.every(elem => otherSet.contains(elem));
    }
    disjoint(newObj) {
        return !this.elements.some(elm => newObj.contains(elm))
        //return this.elements.every(elem => !otherSet.contains(elem));
    }
    eql(newObj) {
        if (this.elements.length === 0 && newObj.elements.length === 0) return true;
        if (this.elements.length !== newObj.elements.length) return false;

        for (let i = 0; i < this.elements.length; i++) {
            if (!newObj.contains(this.elements[i])) {
                return false;
            }
        }
        return true;
        // if (this.elements.length !== otherSet.elements.length) {
        //     return false;
        //   }
        //   return this.subset(otherSet);
    }
    add(elm) {
        if (!this.contains(elm)) {
            this.elements.push(elm)
        }
        // return new CustomSet(this.elements)
        return this
    }
    intersection(newObj) {
        // let arr = [];
        // this.elements.forEach(elm => {
        //     if (newObj.elements.includes(elm)) {
        //         arr.push(elm);
        //     }
        // })
        let arr = this.elements.filter(elem => otherSet.contains(elem));
        return new CustomSet(arr);
    }
    difference(newObj) {
        // let arr = [];
        // this.elements.forEach(elm => {
        //     if (!newObj.elements.includes(elm)) {
        //         arr.push(elm)
        //     }
        // })
        let arr = this.elements.filter(elem => !otherSet.contains(elem));
        return new CustomSet(arr)
    }
    union(newObj) {
        let arr = this.elements.slice();
        newObj.elements.forEach(elm => {
            if (!arr.includes(elm)) {
                arr.push(elm)
            }
        })
        return new CustomSet(arr)
    }

}

module.exports = CustomSet