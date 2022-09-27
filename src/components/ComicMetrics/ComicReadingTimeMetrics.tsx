import { ActiveElement, BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'

import { Thumbnails } from './ComicThumbnails'
import { useComicsData } from '/@/comicsDataState'
import { mustConvertToIntNumber } from '/@/utils'

ChartJS.register(BarElement, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip)

const useComicData = (comicId: number) => {
  const list = useComicsData()
  const data = list.find(comic => comic.id === comicId)
  if (data === undefined) {
    throw new Error()
  }
  return data
}

export const ComicReadingTimeMetrics = () => {
  const { comicId } = useParams()
  const { readingTime: rawdata } = useComicData(mustConvertToIntNumber(comicId))

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

  const volumes = Array.from(Array(rawdata.length).keys()).map(v => v + 1)

  const data: ChartData<'bar'> = {
    labels: volumes,
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
