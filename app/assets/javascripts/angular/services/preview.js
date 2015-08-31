var app = angular.module('vehiclespec');

app.factory("Preview", ['Range', function(Range) {
  var Preview = {};

  Preview.pullSpecDetails = function() {
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

      var commentsShown = spec.parents(".spec-parent").find(".comments-shown")
      if (!commentsShown.hasClass("hide")) {
        var comment = commentsShown.find(".comment-text").val().trim()
        var onlyShowComment = commentsShown.find(".only-show-comment:checked").length > 0
        if (comment != "") {
          if (onlyShowComment) {
            specObj["selection"] = comment
          } else {
            specObj["selection"] = specObj["selection"] + "<div>" + comment + "</div>"
          }
        }
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

  return Preview;
}]);