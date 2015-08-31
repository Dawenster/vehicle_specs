var app = angular.module('vehiclespec');

app.factory("General", [function() {
  var General = {};

  General.arrayHasKey = function(arr, key) {
    return $.grep(arr, function(e){ return e.name == key; });
  }

  General.fetchObjInArray = function(arr, key) {
    var result = $.grep(arr, function(e){ return e.name == key; });
    return result[0]
  }

  return General;
}]);