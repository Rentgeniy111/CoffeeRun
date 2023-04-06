"use strict";

(function (window) {
  let App = window.App || {};
  let Promise = window.Promise;
  class DataStore {
    constructor() {
      this.data = {};
    }

    promiseResolvedWith(value) {
      var promise = new Promise(function (resolve, reject) {
        resolve(value);
      });
      return promise;
    }

    add(key, value) {
      return promiseResolvedWith(null);
    }

    get(key) {
      return promiseResolvedWith(this.data[key]);
    }
    getAll() {
      return promiseResolvedWith(this.data);
    }
    remove(key) {
      return promiseResolvedWith(null);
    }
  }

  App.DataStore = DataStore;
  window.App = App;
})(window);
