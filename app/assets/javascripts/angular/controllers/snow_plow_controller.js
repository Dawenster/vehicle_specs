var app = angular.module('vehiclespec');

app.controller('SnowPlowController', ['$scope', 'General', function($scope, General) {
  initiateRules()

  function initiateRules() {
    $scope.contingencies = contingencyDetails()
  }

  function contingencyDetails() {
    var contingencies = []
    var contingenciesElements = $(".contingency-spec")
    for (var i = 0; i < contingenciesElements.length; i++) {
      var name = $(contingenciesElements[i]).attr("data-spec-name")
      var klass = "." + $(contingenciesElements[i]).attr("data-spec-unique-id")
      contingencies.push({
        name: name,
        klass: klass,
        obj: $(contingenciesElements[i])
      })
    };
    return contingencies
  }

  // Allison brands only show if Allison selected
  var transmissionBrand = General.fetchObjInArray($scope.contingencies, "Transmission Brand")
  var allisonTransmission = General.fetchObjInArray($scope.contingencies, "Allison Transmission")
  contingencyLabelling("Select your Allison Transmission", allisonTransmission.obj)

  $(transmissionBrand.klass + " .button-text").bind("DOMSubtreeModified", function(event) {
    var selected = $(event.target).text()
    if (selected == "Allison") {
      $(allisonTransmission.klass).show()
      allisonTransmission.obj.find(".spec-content-holder").removeClass("remove-spec")
    } else {
      $(allisonTransmission.klass).hide()
      allisonTransmission.obj.find(".spec-content-holder").addClass("remove-spec")
    }
  })

  // Pre-wetting tank size only show if Pre-wetting tank is true
  var preWettingTanks = General.fetchObjInArray($scope.contingencies, "Pre-wetting tanks")
  var preWettingTankSize = General.fetchObjInArray($scope.contingencies, "Pre-wetting tank size")
  contingencyLabelling("Select your wetting tank size", preWettingTankSize.obj)
  hidePreWettingSize()

  $("body").on("change", preWettingTanks.obj.find('input.spec-radio'), function(event) {
    var selected = $(event.target).val()
    if (selected == "Yes") {
      $(preWettingTankSize.klass).show()
      preWettingTankSize.obj.find(".spec-content-holder").removeClass("remove-spec")
    } else {
      hidePreWettingSize()
    }
  })

  function hidePreWettingSize() {
    $(preWettingTankSize.klass).hide()
    preWettingTankSize.obj.find(".spec-content-holder").addClass("remove-spec")
  }

  function contingencyLabelling(text, obj) {
    var allisonExplanation = text
    obj.find(".contingency-explanation").text(allisonExplanation)
  }
}]);