var app = angular.module('vehiclespec');

app.factory("Dropdown", function() {
  var Dropdown = {};

  Dropdown.dropdownSelected = function($event) {
    var ele = $($event.target)
    var selected = ele.text().trim()
    var button = ele.parents(".dropdown-menu").siblings("button")
    button.find(".button-text").text(selected)
  }

  return Dropdown;
});