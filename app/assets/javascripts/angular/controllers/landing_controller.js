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
    var uomAbbreviation   = sliderHolder.attr("data-uom-abbreviation")

    var steps = (rangeMax - rangeMin) / rangeInterval
    var stepsToDisplay = 5
    var decimalUse = null
    var decimals = 0
    if (unitType == "Decimal") {
      decimalUse = true
      decimals = 1
    } else if (unitType == "Fraction") {
      stepsToDisplay = 5
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

    if (steps > 10) {
      noUiSlider.create(sliders[i], {
        start: start,
        decimals: decimalUse,
        step: rangeInterval,
        connect: connect,
        range: {
          'min':  rangeMin,
          'max':  rangeMax
        },
        pips: {
          mode: 'count',
          values: stepsToDisplay,
          density: 100,
          stepped: true
        },
        format: wNumb({
          decimals: decimals,
          postfix: ' ' + uomAbbreviation
        })
      });
    } else {
      noUiSlider.create(sliders[i], {
        start: start,
        decimals: decimalUse,
        step: rangeInterval,
        connect: connect,
        range: {
          'min':  rangeMin,
          'max':  rangeMax
        },
        pips: {
          mode: 'steps',
          density: 100,
          stepped: true
        },
        format: wNumb({
          decimals: decimals,
          postfix: ' ' + uomAbbreviation
        })
      });
    }

    sliders[i].noUiSlider.on('update', function(values, handle){
      var parentEle = $(event.target).parents(".spec-content-holder")
      var unitType = parentEle.attr("data-unit-type")

      if (values.length > 1) {
        var value1 = roundWithUOM(values[0])
        var value2 = roundWithUOM(values[1])
        parentEle.find(".selected-text").text("From: " + value1 + " to " + value2)
      } else {
        var value1 = roundWithUOM(values[0])
        parentEle.find(".selected-text").text(value1)
      }
    });
  };

  $scope.dropdownSelected = function($event) {
    var ele = $($event.target)
    var selectedText = ele.text()
    ele.parents(".slider-dropdown").find(".button-text").text(selectedText)
  }

  function roundWithUOM(value) {
    valueArr = value.split(" ")
    return Math.round(valueArr[0]) + " " + valueArr[1]
  }
}]);