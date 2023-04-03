"use strict";

(function (window) {
  let App = window.App || {};
  function DataStore() {
    console.log("running the DataStore function");
  }
  App.DataStore = DataStore;
  window.App = App;
})(window);
