function createAccount() {
    let purchaseNumber = 0;

    return {
        purchases: {},

        balance() {
            let allPurchases = Object.values(this.purchases);
            let unpaidAmounts = allPurchases.map(purchase => {
                return purchase.price - purchase.paidAmount;
            });

            return unpaidAmounts.reduce((total, amount) => total + amount);
        },

        placeOrder(item, price) {
            purchaseNumber += 1;
            this.purchases[purchaseNumber.toString()] = {
                item,
                price,
                paidAmount: 0,
            };

            return purchaseNumber;
        },

        pay(orderNumber, amount) {
            this.purchases[orderNumber].paidAmount += amount;
        },

        getPurchases() {
            return this.purchases;
        },
    };
}

let myObj = createAccount()
let object = myObj.getPurchases()
object.a = 'new purchase'
console.log(myObj.purchases)