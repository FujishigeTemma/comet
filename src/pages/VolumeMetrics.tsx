import { SeriesMetricsFrame } from '/@/components/SeriesMetricsFrame'
import { VolumeAbandonmentRateMetrics } from '/@/components/VolumeAbandonmentRateMetrics'
import { VolumeReadingTimeMetrics } from '/@/components/VolumeReadingTimeMetrics'

export const VolumeMetrics = () => {
  return <SeriesMetricsFrame abandonmentRateComponent={<VolumeAbandonmentRateMetrics />} readingTimeComponent={<VolumeReadingTimeMetrics />} />
}
