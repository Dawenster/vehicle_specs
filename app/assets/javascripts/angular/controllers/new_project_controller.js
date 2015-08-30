var app = angular.module('vehiclespec');

app.controller('NewProjectCtrl', ['$scope', 'Range', function($scope, Range) {

  Range.setupRangeSlider()

  $scope.rangeDropdownSelected = function($event) {
    Range.rangeDropdownSelected($event)
  }
  
}]);