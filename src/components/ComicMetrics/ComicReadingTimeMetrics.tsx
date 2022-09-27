import { ActiveElement, BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'

import { Thumbnails } from './ComicThumbnails'

ChartJS.register(BarElement, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip)

interface Props {
  rawdata: number[]
}

export const ComicReadingTimeMetrics = ({ rawdata }: Props) => {
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

  const volumes = Array.from(Array(rawdata.length).keys())

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
