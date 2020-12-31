//#3 ******REVIEW******
let invoice = { phone: 3000, internet: 6500 };
let payment = { phone: 1300, internet: 5500 };
let invoiceTotal = invoice.phone + invoice.internet;
let paymentTotal = payment.phone + payment.internet;
let remainingDue = invoiceTotal - paymentTotal;
console.log(paymentTotal);         // => 6800
console.log(remainingDue);         // => 2700
//we want a factory method that we can use to create invoices. The requirements for the factory function are as follows:
// - It returns an invoice object, with phone and internet properties, and a total method.
// - The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
// - The function ***takes an object argument*** - "services={}"*** whose attributes override the default values.

// //I tried:
// function createInvoice(phone = 3000, internet = 5500, obj) {
//   // implement the factory function here
//   return {
//     phone,
//     internet,
//     obj() {
//       this.phone = obj.phone;
//       this.internet = obj.internet;
//     }
//   }
// }

//BUT provided solution for createInvoice factoryFunc:
function createInvoice(services = {}) {
  //// implement the factory function here
  let phoneCharge = services.phone || 3000;
  let internetCharge = services.internet || 5500;

  phoneCharge = (services.phone === 0) ? 0 : phoneCharge;
  internetCharge = (services.internet === 0) ? 0 : internetCharge;

  return {
    phone: phoneCharge,
    internet: internetCharge,

    total: function () {
      return this.phone + this.internet;
    }
  };
}

function invoiceTotal(invoices) {
  let total = 0;
  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }
  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({ phone: 1000, internet: 4500, }));
console.log(invoiceTotal(invoices)); // 31000

//#4  ****REVIEW*** provided solution
//now a factory func to create payments which can take an object argument in one of 3 ways:
// --Payment for one service, e.g., { internet: 1000 } or { phone: 1000 }.
// --Payment for both services, e.g., { internet: 2000, phone: 1000 }.
// --Payment with just an amount property, e.g., { amount: 2000 }.

//The function should return an object that has the amount paid for each service and a total method that returns the payment total. If the amount property is not present in the argument, it should return the sum of the phone and internet service charges; if the amount property is present, return the value of that property.

//provided solution for createPayment factoryFunc:
//// implement the factory function here
function createPayment(services = {}) {
  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  };
  payment.total = function () {
    return this.amount || (this.phone + this.internet);
  };
  return payment;
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000

//#5
//Update the createInvoice function so that it can add payment(s) to invoices. Use the following code as a guideline:
invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue();       // this should return 0

//provided solution for modified createnvocie factoryFunc:
function createInvoice(services = {}) {
  let phoneCharge = services.phone || 3000;
  let internetCharge = services.internet || 5500;
  phoneCharge = (services.phone === 0) ? 0 : phoneCharge;
  internetCharge = (services.internet === 0) ? 0 : internetCharge;
  return {
    phone: phoneCharge,
    internet: internetCharge,
    payments: [],

    total: function () {
      return this.phone + this.internet;
    },

    addPayment: function (payment) {
      this.payments.push(payment);
    },

    addPayments: function (payments) {
      payments.forEach(this.addPayment, this);
    },

    paymentTotal: function () {
      return this.payments.reduce((sum, payment) => sum + payment.total(), 0);
    },

    amountDue: function () {
      return this.total() - this.paymentTotal();
    },
  };
}