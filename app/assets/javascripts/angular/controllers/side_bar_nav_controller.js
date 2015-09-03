var app = angular.module('vehiclespec');

app.controller('SideBarNavCtrl', ['$scope', function($scope) {
  // $("#vehicle-accordion").on('show.bs.collapse', function(event) {
  //   var majorSectionId = $(event.target).siblings(".panel-heading").attr("id")
  //   var currentlyOpen = $(event.target).hasClass("in")
  //   $(".major-section-contents").hide()
  //   if (!currentlyOpen) {
  //     $("." + majorSectionId).slideDown("fast")
  //   }
  //   // $('html, body').animate({ scrollTop: 0 }, 'fast');
  // })

  // $("body").on("click", ".panel-heading", function(event) {
  //   var ele = $(event.target)
  //   var parent = ele
  //   if (ele.hasClass("panel-title")) {
  //     parent = ele.parents(".panel-heading")
  //   }
  //   var majorSectionId = parent.attr("id")
  //   var sibling = parent.siblings(".panel-collapse")
  //   if (sibling.hasClass("in")) {
  //     $(".side-nav-holder").find("." + majorSectionId).slideUp("fast")
  //   }
  // })

  $("body").on("click", ".side-nav-main-holder", function(e) {
    e.preventDefault()
    var ele = $(e.target)

    if (ele.hasClass("spec-link")) {
      var majorSectionLink = ele.parents(".major-section-side-nav").find("a.major-section-link").attr("href")
      var majorSection = $(majorSectionLink)
      var minorSectionLink = ele.parents(".minor-section-side-nav").find("a.minor-section-link").attr("href")
      var minorSection = $(minorSectionLink)
      var specLink = ele.attr("href")

      openMajorSection(majorSection)
      openMinorSection(minorSection)
      delayedGoToLink(specLink)

    } else if (ele.hasClass("minor-section-link")) {
      var majorSectionLink = ele.parents(".major-section-side-nav").find("a.major-section-link").attr("href")
      var majorSection = $(majorSectionLink)
      var minorSectionLink = ele.attr("href")
      var minorSection = $(minorSectionLink)

      openMajorSection(majorSection)
      openMinorSection(minorSection)
      delayedGoToLink(minorSectionLink)
      
    } else {
      var majorSectionLink = ele.attr("href")
      var majorSection = $(majorSectionLink)

      openMajorSection(majorSection)
      delayedGoToLink(majorSectionLink)
    }
  })

  function openMajorSection(majorSection) {
    if (majorSection.hasClass("collapsed")) {
      majorSection.click()
    }
  }

  function openMinorSection(minorSection) {
    if (minorSection.hasClass("collapsed")) {
      minorSection.click()
    }
  }

  function delayedGoToLink(link) {
    setTimeout( function() {$(link).scrollToMe();}, 500 );
  }
}]);