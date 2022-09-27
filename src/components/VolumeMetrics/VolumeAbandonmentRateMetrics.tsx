import { ActiveElement, BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'

import { Thumbnails } from './VolumeThumbnails'

ChartJS.register(LineElement, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip)

interface Props {
  rawdata: number[]
}

export const VolumeAbandonmentRateMetrics = ({ rawdata }: Props) => {
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
      <Thumbnails focused={focusedIndex} />
    </div>
  )
}
