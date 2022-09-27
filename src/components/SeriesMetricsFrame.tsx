import clsx from 'clsx'
import { ReactNode, useState } from 'react'

interface Props {
  abandonmentRateComponent: ReactNode
  readingTimeComponent: ReactNode
}

const SeriesMetricsType = {
  AbandonmentRate: 'AbandonmentRate',
  ReadingTime: 'ReadingTime'
} as const
type SeriesMetricsType = typeof SeriesMetricsType[keyof typeof SeriesMetricsType]

export const SeriesMetricsFrame = ({ abandonmentRateComponent, readingTimeComponent }: Props) => {
  const [currentTab, setCurrentTab] = useState<SeriesMetricsType>('AbandonmentRate')
  return (
    <div className="flex justify-center py-8">
      <div className="max-w-3xl w-full">
        <div className="tabs tabs-boxed justify-self-start w-fit">
          <a
            className={clsx('tab', 'tab-boxed', currentTab === SeriesMetricsType.AbandonmentRate && 'tab-active')}
            onClick={() => setCurrentTab(SeriesMetricsType.AbandonmentRate)}>
            離脱率
          </a>
          <a className={clsx('tab', 'tab-boxed', currentTab === SeriesMetricsType.ReadingTime && 'tab-active')} onClick={() => setCurrentTab(SeriesMetricsType.ReadingTime)}>
            滞在時間
          </a>
        </div>
        <div className="mt-4">{currentTab === SeriesMetricsType.AbandonmentRate ? abandonmentRateComponent : readingTimeComponent}</div>
      </div>
    </div>
  )
}
