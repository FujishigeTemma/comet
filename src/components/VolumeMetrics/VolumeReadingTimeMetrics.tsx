import { ActiveElement, BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'

import { Thumbnails } from './VolumeThumbnails'
import { useComicsData } from '/@/comicsDataState'
import { mustConvertToIntNumber } from '/@/utils'

ChartJS.register(BarElement, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip)

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

export const VolumeReadingTimeMetrics = () => {
  const { comicId, volumeId } = useParams()
  const { readingTime: rawdata } = useVolumeData(mustConvertToIntNumber(comicId), mustConvertToIntNumber(volumeId))

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const onHover = (_: ChartEvent, active: ActiveElement[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setFocusedIndex(active[0]!.index)
  }
  const onClick = (_: ChartEvent, active: ActiveElement[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setFocusedIndex(active[0]!.index)
  }
  const options: ChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    onHover,
    onClick
  }

  const pages = Array.from(Array(rawdata.length).keys()).map(p => p + 1)

  const data: ChartData<'bar'> = {
    labels: pages,
    datasets: [
      {
        data: rawdata
      }
    ]
  }

  return (
    <div>
      <Bar data={data} options={options} />
      <Thumbnails focused={focusedIndex} />
    </div>
  )
}
