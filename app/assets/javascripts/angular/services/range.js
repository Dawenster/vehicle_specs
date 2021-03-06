var app = angular.module('vehiclespec');

app.factory("Range", function() {
  var Range = {};

  Range.setupRangeSlider = function() {
    var sliders = $(".slider")

    for (var i = 0; i < sliders.length; i++) {
      var sliderHolder = $(sliders[i]).parents(".spec-content-holder")
      var spec = specDetails(sliderHolder)
      var detailsForSlider = sliderDetails(spec, spec.rangePrecision)

      if (detailsForSlider.steps > 10) {
        createSlider(sliders[i], spec, detailsForSlider, "count")
      } else {
        createSlider(sliders[i], spec, detailsForSlider, "steps")
      }

      initiateSliderUpdate(sliders[i])
    };
  }

  Range.rangeDropdownSelected = function($event) {
    var ele = $($event.target)
    var selectedText = ele.text()
    var oldText = ele.parents(".dropdown-menu").siblings("button").text()
    var dualRangeText = Range.dualRangeText()

    ele.parents(".slider-dropdown").find(".button-text").text(selectedText)

    if (needsNewSlider(oldText, selectedText, dualRangeText)) {
      var sliderHolder = ele.parents(".spec-content-holder")
      var spec = specDetails(sliderHolder)
      var slider = sliderHolder.find(".slider")

      slider.after("<div class='slider'></div>")
      var newSlider = slider.siblings(".slider")[0]
      slider.remove()

      var detailsForSlider = sliderDetails(spec, selectedText)
      var textArea = sliderHolder.find(".selected-text")

      if (selectedText == dualRangeText || detailsForSlider.steps > 10) {
        createSlider(newSlider, spec, detailsForSlider, "count")
      } else {
        createSlider(newSlider, spec, detailsForSlider, "steps")
      }

      initiateSliderUpdate(newSlider)
    }
  }

  function needsNewSlider(oldText, selectedText, dualRangeText) {
    if (oldText != selectedText && (oldText == dualRangeText || selectedText == dualRangeText)) {
      return true
    } else {
      return false
    }
  }

  function roundWithUOM(value) {
    valueArr = value.split(" ")
    return Math.round(valueArr[0]) + " " + valueArr[1]
  }

  function numSteps(spec) {
    return (spec.rangeMax - spec.rangeMin) / spec.rangeInterval
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

  function sliderDetails(spec, rangePrecision) {
    var details = {}
    details["steps"] = numSteps(spec)
    details["stepsToDisplay"] = 5

    if (spec.unitType == "Decimal") {
      details["decimalUse"] = true
      details["decimals"] = 1
    } else {
      details["decimalUse"] = false
      details["decimals"] = 0
    }

    if (rangePrecision == Range.dualRangeText()) {
      details["start"] = [spec.rangeDefault, spec.rangeDefaultMulti]
      details["connect"] = true
    } else {
      details["start"] = spec.rangeDefault
      details["connect"] = 'lower'
    }

    return details
  }

  function createSlider(slider, spec, detailsForSlider, mode) {
    noUiSlider.create(slider, {
      start: detailsForSlider.start,
      decimals: detailsForSlider.decimalUse,
      step: spec.rangeInterval,
      connect: detailsForSlider.connect,
      range: {
        'min':  spec.rangeMin,
        'max':  spec.rangeMax
      },
      pips: {
        mode: mode,
        values: detailsForSlider.stepsToDisplay,
        density: 100,
        stepped: true
      },
      format: wNumb({
        decimals: detailsForSlider.decimals,
        postfix: " " + spec.uomAbbreviation
      })
    });
  }

  function initiateSliderUpdate(slider) {
    slider.noUiSlider.on('update', function(values, handle){
      var sliderHolder = $(event.target).parents(".spec-content-holder")
      var spec = specDetails(sliderHolder)
      var value1 = null
      var value2 = null

      if (values.length > 1) {

        if (spec.unitType == "Decimal") {
          value1 = values[0]
          value2 = values[1]
        } else {
          value1 = roundWithUOM(values[0])
          value2 = roundWithUOM(values[1])
        }

        if (spec.unitType == "Fraction") {
          sliderHolder.find(".selected-text").text("From: " + fractionText(value1, spec) + " to " + fractionText(value2, spec))
        } else {
          sliderHolder.find(".selected-text").text("From: " + value1 + " to " + value2)
        }

      } else {

        if (spec.unitType == "Decimal") {
          value1 = values[0]
        } else {
          value1 = roundWithUOM(values[0])
        }
        sliderHolder.find(".selected-text").text(value1)

      }
    });
  }

  function fractionText(str, spec) {
    return str.replace(" " + spec.uomAbbreviation, "/" + spec.fractionBase + " " + spec.uomAbbreviation)
  }

  Range.dualRangeText = function() {
    return "Within (Dual range)"
  }

  return Range;
});