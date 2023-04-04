(function (window) {
  "use strict";
  let App = window.App;
  let Truck = App.Truck;
  let DataStore = App.DataStore;
  let FORM_SELECTOR = '[data-coffee-order="form"]';
  let myTruck = new Truck("ncc-1701", new DataStore());
  window.myTruck = myTruck;
  let formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler();
  console.log(formHandler);
})(window);
