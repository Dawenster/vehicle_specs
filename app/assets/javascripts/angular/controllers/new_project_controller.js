var app = angular.module('vehiclespec');

app.controller('NewProjectCtrl', ['$scope', '$sce', 'Range', 'Dropdown', 'Preview', function($scope, $sce, Range, Dropdown, Preview) {
  showFirstMajorSection()
  // hideSideNavMajorSections()
  Range.setupRangeSlider()

  $scope.showBuilder = true

  function showFirstMajorSection() {
    hideSideNavMajorSections()
    $($(".major-section-contents")[0]).show()
  }

  function hideSideNavMajorSections() {
    $(".major-section-contents").hide()
  }

  $scope.rangeDropdownSelected = function($event) {
    Range.rangeDropdownSelected($event)
  }

  $scope.dropdownSelected = function($event) {
    Dropdown.dropdownSelected($event)
  }
  
  $scope.preview = function() {
    $scope.showBuilder = false
    $scope.majorNames = Preview.pullSpecDetails()
  }

  $scope.selectionAsHtml = function(selection) {
    return $sce.trustAsHtml(selection);
  }

  $scope.backToBuild = function() {
    $scope.showBuilder = true
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




















