import { useEffect, useRef, useState } from 'react'
import webgazer from 'webgazer'

import './calibration/calibration.css'
import { CalibrationInit, ClearCalibration, PopUpInstruction } from './calibration/calibration.js'

export const Gazer = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const run = useRef(false)
  const dumpData = useRef<any>([])
  const isEndCalibration = useRef(false)
  useEffect(() => {
    if (run.current) {
      return
    }
    run.current = true
    webgazer
      .setRegression('ridge')
      .setGazeListener((data, elapsedTime: number) => {
        if (data == null) {
          return
        }
        // @ts-expect-error 型付けしてない
        webgazer.util.bound(data)

        const xprediction = data.x
        const yprediction = data.y
        if (!isEndCalibration.current) {
          console.log(xprediction, yprediction, elapsedTime, isEndCalibration)
        }
        if (isEndCalibration.current) {
          dumpData.current = [...dumpData.current, { xprediction, yprediction, elapsedTime }]
        }
      })
      .saveDataAcrossSessions(true)
      .begin()

    webgazer
      .showVideoPreview(false) /* shows all video previews */
      .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
      .applyKalmanFilter(true) /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    const setup = function () {
      //Set up the main canvas. The main canvas is used to calibrate the webgazer.
      const canvas = document.getElementById('plotting_canvas') as HTMLCanvasElement
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.position = 'fixed'
    }
    setup()

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const a = document.createElement('a')
        a.href = `data:text/json,${JSON.stringify(dumpData.current)}`
        a.download = 'dump.json'
        a.click()
      }
    })
    CalibrationInit(() => {
      webgazer.removeMouseEventListeners()
      setTimeout(() => {
        isEndCalibration.current = true
      }, 1000)
    })
  }, [])
  function Restart() {
    webgazer.clearData()
    ClearCalibration()
    setIsModalOpen(false)
    PopUpInstruction()
  }

  return (
    <div>
      <canvas id="plotting_canvas" width="500" height="500"></canvas>

      <div className="calibrationDiv">
        <input type="button" className="Calibration" id="Pt1"></input>
        <input type="button" className="Calibration" id="Pt2"></input>
        <input type="button" className="Calibration" id="Pt3"></input>
        <input type="button" className="Calibration" id="Pt4"></input>
        <input type="button" className="Calibration" id="Pt5"></input>
        <input type="button" className="Calibration" id="Pt6"></input>
        <input type="button" className="Calibration" id="Pt7"></input>
        <input type="button" className="Calibration" id="Pt8"></input>
        <input type="button" className="Calibration" id="Pt9"></input>
      </div>

      {isModalOpen && (
        <div id="helpModal" className={`modal ${isModalOpen ? 'modal-open' : ''}`} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body"></div>
              <div className="modal-footer">
                <button id="closeBtn" type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setIsModalOpen(false)}>
                  Close & load saved model{' '}
                </button>
                <button type="button" id="start_calibration" className="btn btn-primary" data-dismiss="modal" onClick={Restart}>
                  Calibrate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
