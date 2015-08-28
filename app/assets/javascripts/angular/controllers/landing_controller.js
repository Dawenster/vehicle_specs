var app = angular.module('vehiclespec');

app.controller('LandingCtrl', ['$scope', function($scope) {
  var sliders = $(".slider")

  for (var i = 0; i < sliders.length; i++) {
    var sliderHolder = $(sliders[i]).parents(".spec-content-holder")

    var unitType          = sliderHolder.attr("data-unit-type")
    var rangeMin          = parseInt(sliderHolder.attr("data-range-min"))
    var rangeMax          = parseInt(sliderHolder.attr("data-range-max"))
    var rangeInterval     = parseInt(sliderHolder.attr("data-range-interval"))
    var rangeDefault      = parseInt(sliderHolder.attr("data-range-default"))
    var rangeDefaultMulti = parseInt(sliderHolder.attr("data-range-default-multi"))
    var rangePrecision    = sliderHolder.attr("data-range-default-precision")
    var fractionBase      = parseInt(sliderHolder.attr("data-fraction-base"))

    console.log(rangeInterval)

    var decimalUse = null
    if (unitType == "Decimal") {
      decimalUse = true
    } else {
      decimalUse = false
    }

    var start = null
    var connect = null
    if (rangePrecision == "Within (Dual range)") {
      start = [rangeDefault, rangeDefaultMulti]
      connect = true
    } else {
      start = rangeDefault
      connect = 'lower'
    }

    noUiSlider.create(sliders[i], {
      start: start,
      decimals: decimalUse,
      step: rangeInterval,
      connect: connect,
      range: {
        'min':  rangeMin,
        'max':  rangeMax
      }
    });
  };
}]);