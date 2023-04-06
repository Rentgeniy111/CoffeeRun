(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  class RemoteDataStore {
    constructor(url) {
      if (!url) {
        throw new Error("No remote URL supplied.");
      }
      this.serverUrl = url;
    }

    add(key, value) {
      $.post(this.serverUrl, value, function (serverResponse) {
        console.log(serverResponse);
      });
    }

    getAll(cb) {
      $.get(this.serverUrl + "/" + key, function (serverResponse) {
        console.log(serverResponse);
        cb(serverResponse);
      });
    }

    remove(key) {
      $.ajax(this.serverUrl + "/" + key, {
        type: "DELETE",
      });
    }
  }
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
