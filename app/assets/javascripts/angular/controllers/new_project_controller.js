var app = angular.module('vehiclespec');

app.controller('NewProjectCtrl', ['$scope', 'Range', 'Dropdown', function($scope, Range, Dropdown) {
  showFirstMajorSection()
  // hideSideNavMajorSections()
  Range.setupRangeSlider()

  $scope.showBuilder = true

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

  $scope.preview = function() {
    $scope.showBuilder = false
    $scope.specs = pullSpecDetails()
  }

  $scope.backToBuild = function() {
    $scope.showBuilder = true
  }

  function pullSpecDetails() {
    var formattedSpecs = []
    var specs = $(".spec-content-holder")
    for (var i = 0; i < specs.length; i++) {
      var spec = $(specs[i])
      var specType = spec.attr("data-spec-type")
      switch (specType) {
        case "Range":
          formattedSpecs.push(pullRangeSpecDetails(spec))
          break;
        case "Dropdown":
          break;
        case "Boolean": 
          break;
      }
    };
    return formattedSpecs
  }

  function pullRangeSpecDetails(spec) {
    var specName = spec.attr("data-spec-name")
    var details = ""
    var buttonText = spec.find(".button-text").text()
    var selectionText = spec.find(".selected-text").text()
    if (buttonText == Range.dualRangeText()) {
      details = selectionText
    } else {
      details = buttonText + ": " + selectionText
    }
    return {
      specName: specName,
      selection: details
    }
  }
}]);




















