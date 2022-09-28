import { ActiveElement, BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { useMemo, useState } from 'react'
import { Chart } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'

import { Thumbnails2 } from '/@/components/VolumeMetrics/VolumeThumbnails'

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
  const average = useMemo(() => rawdata.reduce((acc, val) => acc + val, 0) / rawdata.length, [rawdata])

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const onHover = (_: ChartEvent, active: ActiveElement[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setFocusedIndex(active[0]!.index)
  }
  const onClick = (_: ChartEvent, active: ActiveElement[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setFocusedIndex(active[0]!.index)
  }
  const options: ChartOptions<'bar'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      yaxis: {
        max: rawdata.reduce((prev, cur, acc) => (prev > cur ? prev : cur), 0) + 10
      }
    },
    onHover,
    onClick
  }

  const pages = Array.from(Array(rawdata.length).keys()).map(p => p + 1)

  const data: ChartData<'bar'> = {
    labels: pages,
    datasets: [
      {
        type: 'bar' as const,
        data: rawdata,
        borderColor: 'rgba(100, 25, 230, 0.2)',
        backgroundColor: 'rgba(100, 25, 230, 0.2)'
      },
      {
        // @ts-expect-error 型が合わないけど一旦無視
        type: 'line' as const,
        data: rawdata.map(() => average),
        borderColor: 'rgba(217, 38, 169, 0.7)',
        backgroundColor: 'rgba(217, 38, 169, 0.7)',
        animation: false,
        pointRadius: 0,
        label: '平均値'
      },
      {
        // @ts-expect-error 型が合わないけど一旦無視
        type: 'line' as const,
        data: rawdata.map(() => 24),
        borderColor: 'rgba(31, 178, 166, 0.7)',
        backgroundColor: 'rgba(31, 178, 166, 0.7)',
        animation: false,
        pointRadius: 0,
        label: '推奨最大値'
      }
    ]
  }

  return (
    <div>
      <Chart type="bar" data={data} options={options} />
      <Thumbnails2 focused={focusedIndex} />
    </div>
  )
}
