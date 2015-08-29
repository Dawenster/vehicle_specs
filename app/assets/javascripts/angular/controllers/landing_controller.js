var app = angular.module('vehiclespec');

app.controller('LandingCtrl', ['$scope', function($scope) {
  var sliders = $(".slider")

  for (var i = 0; i < sliders.length; i++) {
    var sliderHolder = $(sliders[i]).parents(".spec-content-holder")
    var spec = specDetails(sliderHolder)

    var steps = (spec.rangeMax - spec.rangeMin) / spec.rangeInterval
    var stepsToDisplay = 5
    var decimalUse = null
    var decimals = 0
    if (spec.unitType == "Decimal") {
      decimalUse = true
      decimals = 1
    } else if (spec.unitType == "Fraction") {
      stepsToDisplay = 5
    } else {
      decimalUse = false
    }

    var start = null
    var connect = null
    if (spec.rangePrecision == "Within (Dual range)") {
      start = [spec.rangeDefault, spec.rangeDefaultMulti]
      connect = true
    } else {
      start = spec.rangeDefault
      connect = 'lower'
    }

    if (steps > 10) {
      noUiSlider.create(sliders[i], {
        start: start,
        decimals: decimalUse,
        step: spec.rangeInterval,
        connect: connect,
        range: {
          'min':  spec.rangeMin,
          'max':  spec.rangeMax
        },
        pips: {
          mode: 'count',
          values: stepsToDisplay,
          density: 100,
          stepped: true
        },
        format: wNumb({
          decimals: decimals,
          postfix: ' ' + spec.uomAbbreviation
        })
      });
    } else {
      noUiSlider.create(sliders[i], {
        start: start,
        decimals: decimalUse,
        step: spec.rangeInterval,
        connect: connect,
        range: {
          'min':  spec.rangeMin,
          'max':  spec.rangeMax
        },
        pips: {
          mode: 'steps',
          density: 100,
          stepped: true
        },
        format: wNumb({
          decimals: decimals,
          postfix: ' ' + spec.uomAbbreviation
        })
      });
    }

    sliders[i].noUiSlider.on('update', function(values, handle){
      var parentEle = $(event.target).parents(".spec-content-holder")
      var unitType = parentEle.attr("data-unit-type")
      var value1 = null
      var value2 = null

      if (values.length > 1) {
        if (unitType == "Decimal") {
          value1 = values[0]
          value2 = values[1]
        } else {
          value1 = roundWithUOM(values[0])
          value2 = roundWithUOM(values[1])
        }
        parentEle.find(".selected-text").text("From: " + value1 + " to " + value2)
      } else {
        if (unitType == "Decimal") {
          value1 = values[0]
        } else {
          value1 = roundWithUOM(values[0])
        }
        parentEle.find(".selected-text").text(value1)
      }
    });
  };

  $scope.dropdownSelected = function($event) {
    var ele = $($event.target)
    var eleParent = ele.parents(".spec-content-holder")
    var sliderHolder = eleParent.find(".slider")
    var spec = specDetails(sliderHolder)

    var selectedText = ele.text()
    ele.parents(".slider-dropdown").find(".button-text").text(selectedText)

    if (spec.defaultPrecision == "Within (Dual range)") {
      noUiSlider.create(sliders[i], {
        start: start,
        decimals: decimalUse,
        step: spec.rangeInterval,
        connect: connect,
        range: {
          'min':  spec.rangeMin,
          'max':  spec.rangeMax
        },
        pips: {
          mode: 'steps',
          density: 100,
          stepped: true
        },
        format: wNumb({
          decimals: decimals,
          postfix: ' ' + spec.uomAbbreviation
        })
      });
    } else {

    }
  }

  function roundWithUOM(value) {
    valueArr = value.split(" ")
    return Math.round(valueArr[0]) + " " + valueArr[1]
  }

  function specDetails(slider) {
    var spec = {}
    spec["unitType"]          = slider.attr("data-unit-type")
    spec["rangeMin"]          = parseInt(slider.attr("data-range-min"))
    spec["rangeMax"]          = parseInt(slider.attr("data-range-max"))
    spec["rangeInterval"]     = parseInt(slider.attr("data-range-interval"))
    spec["rangeDefault"]      = parseInt(slider.attr("data-range-default"))
    spec["rangeDefaultMulti"] = parseInt(slider.attr("data-range-default-multi"))
    spec["rangePrecision"]    = slider.attr("data-range-default-precision")
    spec["fractionBase"]      = parseInt(slider.attr("data-fraction-base"))
    spec["uomAbbreviation"]   = slider.attr("data-uom-abbreviation")
    return spec
  }
}]);