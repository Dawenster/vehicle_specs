var app = angular.module('vehiclespec');

app.controller('NewProjectCtrl', ['$scope', 'Range', 'Dropdown', function($scope, Range, Dropdown) {
  showFirstMajorSection()
  // hideSideNavMajorSections()
  Range.setupRangeSlider()

  $scope.rangeDropdownSelected = function($event) {
    Range.rangeDropdownSelected($event)
  }

  $scope.dropdownSelected = function($event) {
    Dropdown.dropdownSelected($event)
  }
  
  function showFirstMajorSection() {
    hideSideNavMajorSections()
    $($(".major-section-contents")[0]).show()
  }

  function hideSideNavMajorSections() {
    $(".major-section-contents").hide()
  }
}]);