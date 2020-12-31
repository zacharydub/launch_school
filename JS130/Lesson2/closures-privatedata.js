function makeList() {
    return {
        items: [], // // but this way, the items property is accessible via list.items

        add: function (item) {
            let index = this.items.indexOf(item);
            if (index === -1) {
                this.items.push(item);
                console.log(item + " added!");
            }
        },

        list: function () {
            if (this.items.length === 0) {
                console.log("The list is empty.");
            } else {
                this.items.forEach(function (item) {
                    console.log(item);
                });
            }
        },

        remove: function (item) {
            let index = this.items.indexOf(item);
            if (index !== -1) {
                this.items.splice(index, 1);
                console.log(item + " removed!");
            }
        },
    };
}

function makeList() {
    let items = [];

    return {
        // items: [], -- this line removed

        add: function (item) {
            let index = items.indexOf(item);
            if (index === -1) {
                items.push(item);
                console.log(item + " added!");
            }
        },

        list: function () {
            if (items.length === 0) {
                console.log("The list is empty.");
            } else {
                items.forEach(function (item) {
                    console.log(item);
                });
            }
        },

        remove: function (item) {
            let index = items.indexOf(item);
            if (index !== -1) {
                items.splice(index, 1);
                console.log(item + " removed!");
            }
        },
    };
}

function createUser(profileName) {
    let friends = [];
    return {
        addFriend(user) {
            friends.push(user.showName());
        },
        updateProfileName(newName) {
            profileName = newName;
        },
        showFriendList() {
            friends.forEach(user => console.log(user));
        },
        showName() {
            return profileName;
        }
    }
}

let mike = createUser("magicMike");

let nancy = createUser("fancynancy");
mike.addFriend(nancy);
// console.log(mike.showName());

console.log(mike);
console.log(mike.friends); // undefined
console.log(mike.showFriendList());
  // mike.showFriendList();