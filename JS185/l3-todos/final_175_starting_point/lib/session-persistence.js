const SeedData = require("./seed-data");
const deepCopy = require("./deep-copy");

module.exports = class SessionPersistence {
  constructor(session) {
    //leading underscore is an advisory to users of the class that the data is for private use only. Means that _todoLists are a kind of "back door" to the session store. By referencing _todoLists, any code with access to the SessionPersistence object can update the session store. we must trust that the user won't use the private data.
    this._todoLists = session.todoLists || deepCopy(SeedData); // //checks to see whether the session store already contains data in session.todoLists. If it does, it places a reference to that data in this._todoLists. Otherwise, it makes a deep copy of the seed data to initialize both the new object and the session store 
    //deep copy of the seed data to ensure that we can't modify it for other users. If we didn't make a copy the seed data would mutate with each update made by users, and each new session would then receive the current version of that data. Instead, we want each session to get the same starter data, rather than depend on what other users have done.


    session.todoLists = this._todoLists;

    // Since we won't use the TodoList and Todo classes in SessionPersistence, we don't need to call TodoList.makeTodoList. As we explained in the previous assignment, we could continue using those classes, but that offers little benefit in this app. It would also interfere with some of the things we want to show you. Two main benefits to not using the classes: 1) It's easier to explain some application details. 2) It simplifies the changes that we must make when we move the application to a database.
  }
};