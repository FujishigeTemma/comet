import { SeriesMetricsFrame } from '/@/components/SeriesMetricsFrame'
import { VolumeAbandonmentRateMetrics } from '/@/components/VolumeMetrics/VolumeAbandonmentRateMetrics'
import { VolumeReadingTimeMetrics } from '/@/components/VolumeMetrics/VolumeReadingTimeMetrics'

export const VolumeMetrics = () => {
  const rawdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return <SeriesMetricsFrame abandonmentRateComponent={<VolumeAbandonmentRateMetrics rawdata={rawdata} />} readingTimeComponent={<VolumeReadingTimeMetrics rawdata={rawdata} />} />
}
