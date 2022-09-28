import { ActiveElement, BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'

import { Thumbnails2 } from '/@/components/VolumeMetrics/VolumeThumbnails'
import { useComicsData } from '/@/comicsDataState'
import { mustConvertToIntNumber } from '/@/utils'

ChartJS.register(LineElement, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip)

const useComicData = (comicId: number) => {
  const list = useComicsData()
  const data = list.find(comic => comic.id === comicId)
  if (data === undefined) {
    throw new Error()
  }
  return data
}

export const ComicAbandonmentRateMetrics = () => {
  const { comicId } = useParams()
  const { abandonmentRate: rawdata } = useComicData(mustConvertToIntNumber(comicId))

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

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
    onHover,
    onClick
  }

  const volumes = Array.from(Array(rawdata.length).keys()).map(v => v + 1)

  const data: ChartData<'line'> = {
    labels: volumes,
    datasets: [
      {
        data: rawdata
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
