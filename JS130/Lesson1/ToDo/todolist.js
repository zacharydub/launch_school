const Todo = require("./todo")

class TodoList {
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    add(todoObj) {
        if (!(todoObj instanceof Todo)) {
            throw new TypeError('can only add ToDo objects');
        }
        this.todos.push(todoObj);
    }
    size() {
        return this.todos.length;
    }
    first() {
        return this.todos[0]
    }
    last() {
        return this.todos[this.size() - 1]
    }
    itemAt(index) {
        this._validateIndex(index);
        return this.todos[index];
    }
    _validateIndex(index) { // _ in name suggests a "private" method - shouldn't be used from outside the class
        if (!(index in this.todos)) {
            throw new ReferenceError(`invalid index: ${index}`);
        }
    }
    markDoneAt(index) {
        this._validateIndex(index);
        this.itemAt(index).markDone();
    }
    markUndoneAt(index) {
        this._validateIndex(index);
        this.itemAt(index).markUndone();
    }
    isDone() {
        return this.todos.every(item => item.isDone())
    }
    shift() {
        return this.todos.shift()
    }
    pop() {
        return this.todos.pop()
    }
    removeAt(index) {
        this._validateIndex(index);
        return this.todos.splice(index, 1)
    }
    toString() {
        let title = `---- ${this.title} ----`
        let list = this.todos.map(item => item.toString()).join('\n')
        return `${title}\n${list}`
    }
    forEach(callback) {
        this.todos.forEach(callback)
    }
    filter(cb) {
        // return this.todos.filter(cb) -- better to use the custom TodoList.prototype.forEac rather than using Array.prototype.filter, bc that would add an additional dependency on the implementation you use for TodoList. If you later decide to change the implementation for TodoList to use something other than an array (i.e objects), you only need to update forEach, not filter.

        // let filtered = []
        // this.forEach(item => {
        //     if (cb(item)) {
        //         filtered.push(item)
        //     }
        // })
        // return filtered;     --- this works well, but we cant chain methods after using list.filter(cb) bc this returns an array and not a new TodoList object

        let newList = new TodoList(this.title)
        this.forEach(item => {
            if (cb(item)) {
                newList.add(item)
            }
        })
        return newList
    }
    findByTitle(title) { // cant stop iteration methods or use 'return' for forEach method so used for loop
        // for (let i = 0; i < this.size(); i++) {
        //     if (this.todos[i].title === title) {
        //         return new Todo(title)
        //     }
        // }
        // return undefined
        return this.filter(item => item.getTitle() === title).first()
    }
    allDone() {
        return this.filter(item => item.isDone())
    }
    allNotDone() {
        return this.filter(item => !item.isDone())
    }
    markDone(title) {
        // for (let i = 0; i < this.size(); i++) {
        //     if (this.todos[i].title === title) {
        //         this.markDoneAt(i);
        //     }
        // }
        let item = this.findByTitle(title)
        if (item !== undefined) {
            item.markDone()
        }
    }
    markAllDone() {
        this.forEach(item => item.markDone())
    }
    markAllUndone() {
        this.forEach(item => item.markUndone())
    }
    toArray() {
        // let newarray = []
        // this.forEach(item => {
        //     newarray.push(item)
        // })
        // return newarray;

        // return [...this.todos]

        return this.todos.slice()
    }
}

module.exports = TodoList
// let todo1 = new Todo("Buy milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");
// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// let list = new TodoList("Today's Todos");
// list.add(todo1);
// list.add(todo2);
// list.add(todo3);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);
// list.markDoneAt(1)
// list.markDoneAt(2)

// console.log(list.findByTitle('Buy milk'))
// console.log(list.allDone())
// console.log(list.allNotDone())
// list.markDone('Buy milk')
// console.log(list.allDone())
// list.markAllDone()
// console.log(list.allDone())
// list.markAllUndone()
// console.log(list.allNotDone())
// console.log(list.toArray())
