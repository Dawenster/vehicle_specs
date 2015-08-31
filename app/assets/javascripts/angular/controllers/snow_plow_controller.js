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
  var explanation = "Select your Allison Transmission"
  allisonTransmission.obj.find(".contingency-explanation").text(explanation)

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
}]);