var app = angular.module('vehiclespec');

app.controller('SideBarNavCtrl', ['$scope', function($scope) {
  $("#vehicle-accordion").on('show.bs.collapse', function(event) {
    var majorSectionId = $(event.target).siblings(".panel-heading").attr("id")
    var currentlyOpen = $(event.target).hasClass("in")
    $(".major-section-contents").hide()
    if (!currentlyOpen) {
      $("." + majorSectionId).slideDown("fast")
    }
    // $('html, body').animate({ scrollTop: 0 }, 'fast');
  })

  $("body").on("click", ".panel-heading", function(event) {
    var ele = $(event.target)
    var parent = ele
    if (ele.hasClass("panel-title")) {
      parent = ele.parents(".panel-heading")
    }
    var majorSectionId = parent.attr("id")
    var sibling = parent.siblings(".panel-collapse")
    if (sibling.hasClass("in")) {
      $(".side-nav-holder").find("." + majorSectionId).slideUp("fast")
    }
  })
}]);