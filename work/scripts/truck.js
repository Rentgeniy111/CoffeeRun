(function (window) {
  "use strict";
  let App = window.App || {};

  class Truck {
    constructor(truckId, db) {
      this.truckId = truckId;
      this.db = db;
    }

    createOrder(order) {
      this.db.add(order.emailAddress, order);
    }

    deliverOrder(customerId) {
      this.db.remove(customerId);
    }

    printOrders() {
      let customerIdArray = Object.keys(this.db.getAll());
      console.log("Truck #" + this.truckId + " has pending orders:");
      customerIdArray.forEach(function (id) {
        console.log(this.db.get(id));
      }, this);
    }
  }

  App.Truck = Truck;
  window.App = App;
})(window);
