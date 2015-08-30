var app = angular.module('vehiclespec');

app.controller('NewProjectCtrl', ['$scope', 'Range', 'Dropdown', function($scope, Range, Dropdown) {

  Range.setupRangeSlider()

  $scope.rangeDropdownSelected = function($event) {
    Range.rangeDropdownSelected($event)
  }

  $scope.dropdownSelected = function($event) {
    Dropdown.dropdownSelected($event)
  }
  
}]);