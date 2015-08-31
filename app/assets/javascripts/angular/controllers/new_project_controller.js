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
      var specObj = {}
      specObj["specName"] = spec.attr("data-spec-name")

      switch (specType) {
        case "Range":
          specObj["selection"] = pullRangeSpecDetails(spec)
          break;
        case "Dropdown":
          specObj["selection"] = pullDropdownSpecDetails(spec)
          break;
        case "Boolean":
          specObj["selection"] = pullBooleanSpecDetails(spec)
          break;
      }
      formattedSpecs.push(specObj)
    };
    return formattedSpecs
  }

  function pullRangeSpecDetails(spec) {
    var details = ""
    var buttonText = spec.find(".button-text").text()
    var selectionText = spec.find(".selected-text").text()
    if (buttonText == Range.dualRangeText()) {
      details = selectionText
    } else {
      details = buttonText + ": " + selectionText
    }
    return details
  }

  function pullDropdownSpecDetails(spec) {
    return spec.find(".button-text").text()
  }

  function pullBooleanSpecDetails(spec) {
    var checkedValue = spec.find('input.spec-radio[type=radio]:checked').val()
    return checkedValue
  }

  $scope.addComment = function($event) {
    var commentsHidden = $($event.target).parents(".comments-hidden")
    var commentsShown = commentsHidden.siblings(".comments-shown")
    commentsHidden.addClass("hide")
    commentsShown.removeClass("hide")
  }

  $scope.removeComment = function($event) {
    var commentsShown = $($event.target).parents(".comments-shown")
    var commentsHidden = commentsShown.siblings(".comments-hidden")
    commentsShown.addClass("hide")
    commentsHidden.removeClass("hide")
  }
}]);




















