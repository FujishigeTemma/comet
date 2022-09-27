import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PageComponent } from '/@/components/Page/PageComponent'

import { useData } from '/@/useData'
import { mustConvertToIntNumber } from '/@/utils'

type GazeInfoItem = {
  x: number
  y: number
  time: number
}
type GazeInfo = GazeInfoItem[]

const useGazeInfo = ({ comicId, volumeId, pageId }: { comicId: string | undefined; volumeId: string | undefined; pageId: string | undefined }) => {
  const gazeInfo = useData<GazeInfo[]>(`/gaze-info/${comicId}-${volumeId}-${pageId}.json`)
  return gazeInfo ?? []
}

const gazeInfoToSvgPathD = (gazeInfo: GazeInfo, showingTime: number): string => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstInfo = gazeInfo[0]!
  let d = `M ${firstInfo.x} ${firstInfo.y}`
  d += gazeInfo
    .filter(info => info.time < showingTime)
    .map(info => `L ${info.x} ${info.y}`)
    .join(' ')
  return d
}

export const PageMetrics = () => {
  const { comicId, volumeId, pageId } = useParams()
  const gazeInfo = useGazeInfo({ comicId, volumeId, pageId })

  const [showGaze, setShowGaze] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const gazeMaxTime = useMemo(() => Math.max(...gazeInfo.map(info => info.at(-1)!.time)), [gazeInfo])
  const [showingTime, setShowingTime] = useState(gazeMaxTime)
  useEffect(() => {
    setShowingTime(gazeMaxTime)
  }, [gazeMaxTime])

  return (
    <div className="flex flex-col justify-center w-full h-screen gap-4">
      <div className="flex gap-4">
        <div className="form-control">
          <label className="label cursor-pointer">
            <input type="checkbox" className="toggle toggle-primary" checked={showGaze} onChange={() => setShowGaze(!showGaze)} />
            <span className="label-text ml-2">視線の表示</span>
          </label>
        </div>
        <div className="text-sm flex items-center">離脱率: 23.4%</div>
        <div className="text-sm flex items-center">平均滞在時間: 12.3秒</div>
      </div>
      {showGaze && (
        <div className="flex gap-4">
          <label className="label flex-1">
            <span className="label-text mr-2 whitespace-nowrap">時間</span>
            <input type="range" min="0" max={gazeMaxTime} value={showingTime} onChange={e => setShowingTime(e.target.valueAsNumber)} className="range" />
          </label>
        </div>
      )}
      <div className="flex min-h-0 relative">
        <PageComponent
          className="flex-1"
          comicId={mustConvertToIntNumber(comicId)}
          volumeId={mustConvertToIntNumber(volumeId)}
          pageId={mustConvertToIntNumber(pageId)}
          withLink={false}
        />
        <div>
          {showGaze &&
            gazeInfo.map((line, i) => (
              <div key={i} className="absolute inset-0">
                <svg viewBox="0 0 1476.92 1050" xmlns="http://www.w3.org/2000/svg">
                  <path d={gazeInfoToSvgPathD(line, showingTime)} fill="transparent" stroke="rgba(255,0,0,0.3)" strokeWidth="3" />
                </svg>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
