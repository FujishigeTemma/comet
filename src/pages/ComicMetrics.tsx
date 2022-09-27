import { ComicAbandonmentRateMetrics } from '/@/components/ComicMetrics/ComicAbandonmentRateMetrics'
import { ComicReadingTimeMetrics } from '/@/components/ComicMetrics/ComicReadingTimeMetrics'
import { SeriesMetricsFrame } from '/@/components/SeriesMetricsFrame'

export const ComicMetrics = () => {
  const rawdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return <SeriesMetricsFrame abandonmentRateComponent={<ComicAbandonmentRateMetrics rawdata={rawdata} />} readingTimeComponent={<ComicReadingTimeMetrics rawdata={rawdata} />} />
}
