import { SeriesMetricsFrame } from '/@/components/SeriesMetricsFrame'
import { VolumeAbandonmentRateMetrics } from '/@/components/VolumeMetrics/VolumeAbandonmentRateMetrics'
import { VolumeReadingTimeMetrics } from '/@/components/VolumeMetrics/VolumeReadingTimeMetrics'

export const VolumeMetrics = () => {
  return <SeriesMetricsFrame abandonmentRateComponent={<VolumeAbandonmentRateMetrics />} readingTimeComponent={<VolumeReadingTimeMetrics />} />
}
