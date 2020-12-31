let ItemCreator = (function () {
    function generateSkuCode(itemName, category) {
        return (itemName.replace(/\s/g, '').slice(0, 3).toUpperCase() +
            category.replace(/\s/g, '').slice(0, 2).toUpperCase());
    }

    function isValidItemName(itemName) {
        return itemName.replace(/\s/g, '').length >= 5;
    }

    function isValidCategory(category) {
        return category.replace(/\s/g, '').length >= 5 && category.split(' ').length === 1;
    }

    function isQuantityProvided(quantity) {
        return quantity !== undefined
    }

    return function (itemName, category, quantity) {
        if (isValidItemName(itemName) && isValidCategory(category) && isQuantityProvided(quantity)) {
            this.skuCode = generateSkuCode(itemName, category);
            this.itemName = itemName;
            this.category = category;
            this.quantity = quantity;
        } else {
            return { notValid: true };
        }
    };
})();

let ItemManager = {
    items: [],
    getItem: function (skuCode) {
        return this.items.filter(function (item) {
            return item.skuCode === skuCode;
        })[0];
    },

    create: function (itemName, category, quantity) {
        let item = new ItemCreator(itemName, category, quantity);
        if (item.notValid) {
            return false;
        } else {
            this.items.push(item);
        }
    },

    update: function (skuCode, itemInformation) {
        Object.assign(this.getItem(skuCode), itemInformation);
    },

    delete: function (skuCode) {
        this.items.splice(this.items.indexOf(this.getItem(skuCode)), 1);
    },

    list: function () {
        return this.items;
    },

    inStock: function () {
        return this.items.filter(function (item) {
            return item.quantity > 0;
        });
    },

    itemsInCategory: function (category) {
        return this.items.filter(function (item) {
            return item.category === category;
        });
    },
};

let ReportManager = {
    init: function (itemManager) {
        this.items = itemManager;
    },

    createReporter(skuCode) {
        return (function () {
            let item = this.items.getItem(skuCode);
            return {
                itemInfo: function () {
                    Object.keys(item).forEach(function (key) {
                        console.log(key + ': ' + item[key]);
                    });
                },
            };
        }).bind(this)();
    },

    reportInStock: function () {
        console.log(this.items.inStock().map(function (item) {
            return item.itemName;
        }).join(','))
    },
};