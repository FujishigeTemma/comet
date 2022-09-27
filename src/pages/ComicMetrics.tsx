import { ComicAbandonmentRateMetrics } from '/@/components/ComicMetrics/ComicAbandonmentRateMetrics'
import { ComicReadingTimeMetrics } from '/@/components/ComicMetrics/ComicReadingTimeMetrics'
import { SeriesMetricsFrame } from '/@/components/SeriesMetricsFrame'

export const ComicMetrics = () => {
  return <SeriesMetricsFrame abandonmentRateComponent={<ComicAbandonmentRateMetrics />} readingTimeComponent={<ComicReadingTimeMetrics />} />
}
