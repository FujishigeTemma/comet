import {
  ActiveElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartEvent,
  ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'

import { Thumbnails2 } from './VolumeThumbnails'
import { useComicsData } from '/@/comicsDataState'
import { mustConvertToIntNumber } from '/@/utils'

ChartJS.register(LineElement, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Filler)

const useVolumeData = (comicId: number, volumeId: number) => {
  const list = useComicsData()
  const comic = list.find(comic => comic.id === comicId)
  if (comic === undefined) {
    throw new Error()
  }
  const data = comic.volumes.find(volume => volume.id === volumeId)
  if (data === undefined) {
    throw new Error()
  }
  return data
}

export const VolumeAbandonmentRateMetrics = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const { comicId, volumeId } = useParams()
  const { abandonmentRate: rawdata } = useVolumeData(mustConvertToIntNumber(comicId), mustConvertToIntNumber(volumeId))

  const onHover = (_: ChartEvent, active: ActiveElement[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setFocusedIndex(active[0]!.index)
  }
  const onClick = (_: ChartEvent, active: ActiveElement[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setFocusedIndex(active[0]!.index)
  }
  const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      yAxis: {
        min: 0,
        max: 100
      }
    },
    onHover,
    onClick
  }

  const pages = Array.from(Array(rawdata.length).keys()).map(p => p + 1)

  const data: ChartData<'line'> = {
    labels: pages,
    datasets: [
      {
        data: rawdata,
        fill: true,
        backgroundColor: 'rgba(100, 25, 230, 0.2)'
      }
    ]
  }

  return (
    <div>
      <Line data={data} options={options} />
      <Thumbnails2 focused={focusedIndex} />
    </div>
  )
}
