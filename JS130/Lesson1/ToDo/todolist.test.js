const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
    let todo1;
    let todo2;
    let todo3;
    let list;

    beforeEach(() => {
        todo1 = new Todo('Buy milk');
        todo2 = new Todo('Clean room');
        todo3 = new Todo('Go to the gym');

        list = new TodoList("Today's Todos");
        list.add(todo1);
        list.add(todo2);
        list.add(todo3);
    });

    // your tests go here
    // test('has four wheels', () => {
    //     expect(car.wheels).toBe(4);
    // });
    ////size
    test('todolist has a size of 3', () => {
        expect(list.size()).toBe(3)
    })
    ////toArray
    test('make copy of array', () => {
        // expect(list.toArray()).toEqual(list.todos)
        expect(list.toArray()).toEqual([todo1, todo2, todo3])

    })
    ////first
    test('first array element', () => {
        // expect(list.first()).toEqual(list.todos[0])
        // expect(list.first()).toEqual(list.shift())
        expect(list.first()).toEqual(todo1)
    })
    ////last
    test('last array element', () => {
        // expect(list.last()).toEqual(list.todos[list.size() - 1])
        // expect(list.last()).toEqual(list.todos[list.todos.length - 1])
        expect(list.last()).toEqual(todo3)
    })
    ////shift
    test('shift removes 1st item in list and returns it', () => {
        let todo = list.shift()
        expect(todo).toEqual(todo1)
        expect(list.toArray()).toEqual([todo2, todo3])
    })
    ////pop
    test('pop removes last item in list and returns it', () => {
        let todo = list.pop()
        expect(todo).toEqual(todo3)
        expect(list.toArray()).toEqual([todo1, todo2])
    })
    ////isDone
    test('isDone returns true when all items in list are done, false otherwise', () => {
        // expect(list.isDone()).toEqual(false)

        // todo1.done = true
        // todo2.done = true
        // todo3.done = true
        list.forEach(item => item.done = true)
        expect(list.isDone()).toEqual(true)
    })
    ////add
    test('trying to add non-Todo type object retrns typerror', () => {
        // expect(() => list.add(71)).toThrow()
        expect(() => list.add('apples')).toThrow(TypeError)
    })
    ////itemAt
    test('returns item at specified index or raise ReferenceError if given index with no element', () => {
        expect(list.itemAt(0)).toEqual(todo1)
        expect(list.itemAt(1)).toEqual(todo2)
        expect(() => list.itemAt(5)).toThrow()
        expect(() => list.itemAt(5)).toThrow(ReferenceError)
    })
    ////markDoneAt
    test('marks item as done, or raises error for invalid index', () => {
        list.markDoneAt(0)
        expect(todo1.done).toBeTruthy()
        expect(todo1.isDone()).toBe(true);
        expect(todo2.isDone()).toBe(false);
        expect(() => list.markDoneAt(5)).toThrow()
    })
    ////markUndoneAt
    test('marks item as undone, or raises error for invalid index', () => {
        expect(() => list.markUndoneAt(5)).toThrow()
        todo1.markDone();
        todo2.markDone();
        todo3.markDone();

        list.markUndoneAt(2)

        expect(todo1.isDone()).toBe(true);
        expect(todo2.isDone()).toBe(true);
        expect(todo3.isDone()).toBe(false);
    })
    ////markAllDone
    test('mark all items done', () => {
        list.markAllDone()

        expect(todo1.isDone()).toBe(true);
        expect(todo2.isDone()).toBe(true);
        expect(todo3.isDone()).toBe(true);
    })
    ////removeAt
    test('remove at specified index, or raise error if invalid index', () => {
        list.removeAt(2)
        expect(list.toArray()).toEqual([todo1, todo2])
        expect(() => list.removeAt(4)).toThrow()
    })
    ////toString
    test('toString returns string representation of the list', () => {
        let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
        expect(list.toString()).toBe(string);
    });
    test('toString returns string representation of the list', () => {
        todo1.markDone()
        let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
        expect(list.toString()).toBe(string)
    });
    test('toString returns string representation of the list', () => {
        list.markAllDone()
        let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
        expect(list.toString()).toBe(string)
    });
    ////forEach
    test('forEach prints out each item in list', () => {
        // list.forEach(item => item.markDone())
        // expect(todo1.isDone()).toBe(true)
        // expect(todo2.isDone()).toBe(true)
        // expect(todo3.isDone()).toBe(true)
        let result = []
        list.forEach(item => result.push(item))
        expect(result).toEqual([todo1, todo2, todo3])
    })
    ////filter
    test('filter selects certain elements for new array and returns TodoList object', () => {
        // let filtered = list.filter(item => item.title !== 'Buy milk')
        // expect(filtered instanceof TodoList).toBe(true)
        let newList = new TodoList(list.title);
        newList.add(todo1);
        expect(newList.title).toBe(list.title);

        todo1.markDone();
        let doneItems = list.filter(todo => todo.isDone());
        expect(doneItems.toString()).toBe(newList.toString());

    })
})