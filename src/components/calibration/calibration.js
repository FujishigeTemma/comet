import $ from 'jquery'

import './precision_calculation.js'
import './precision_store_points.js'

var PointCalibrate = 0
var CalibrationPoints = {}

/**
 * Clear the canvas and the calibration button.
 */
function ClearCanvas() {
  $('.Calibration').hide()
  var canvas = document.getElementById('plotting_canvas')
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

/**
 * Show the instruction of using calibration at the start up screen.
 */
export function PopUpInstruction() {
  ClearCanvas()
  ShowCalibrationPoint()
}

/**
 * Load this function when the index page starts.
 * This function listens for button clicks on the html page
 * checks that all buttons have been clicked 5 times each, and then goes on to measuring the precision
 */
export const CalibrationInit = function (cb) {
  ClearCanvas()
  $('.Calibration').click(function () {
    // click event on the calibration buttons

    // click event on the calibration buttons

    var id = $(this).attr('id')

    if (!CalibrationPoints[id]) {
      // initialises if not done
      CalibrationPoints[id] = 0
    }
    CalibrationPoints[id]++ // increments values

    if (CalibrationPoints[id] == 5) {
      //only turn to yellow after 5 clicks
      $(this).css('background-color', 'yellow')
      $(this).prop('disabled', true) //disables the button
      PointCalibrate++
    } else if (CalibrationPoints[id] < 5) {
      //Gradually increase the opacity of calibration points when click to give some indication to user.
      var opacity = 0.2 * CalibrationPoints[id] + 0.2
      $(this).css('opacity', opacity)
    }

    //Show the middle calibration point after all other points have been clicked.
    if (PointCalibrate == 8) {
      $('#Pt5').show()
    }

    if (PointCalibrate >= 9) {
      // last point is calibrated
      //using jquery to grab every element in Calibration class and hide them except the middle point.
      $('.Calibration').hide()
      $('#Pt5').show()

      // clears the canvas
      var canvas = document.getElementById('plotting_canvas')
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      ClearCanvas()
      cb()
    }
  })
}

/**
 * Show the Calibration Points
 */
function ShowCalibrationPoint() {
  $('.Calibration').show()
  $('#Pt5').hide() // initially hides the middle button
}

/**
 * This function clears the calibration buttons memory
 */
export function ClearCalibration() {
  // Clear data from WebGazer

  $('.Calibration').css('background-color', 'red')
  $('.Calibration').css('opacity', 0.2)
  $('.Calibration').prop('disabled', false)

  CalibrationPoints = {}
  PointCalibrate = 0
}

// sleep function because java doesn't have one, sourced from http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
