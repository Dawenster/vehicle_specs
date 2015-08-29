var app = angular.module('vehiclespec');

app.controller('SideBarNavController', ['$scope', function($scope) {
  $("#vehicle-accordion").on('show.bs.collapse', function(event) {
    var majorSectionId = $(event.target).siblings(".panel-heading").attr("id")
    $(".major-section-contents").hide()
    $("." + majorSectionId).slideDown("fast")
  })

  $("#vehicle-accordion").on('hide.bs.collapse', function(event) {
    $(".major-section-contents").slideUp("fast")
  })
}]);