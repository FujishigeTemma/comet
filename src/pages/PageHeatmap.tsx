import HeatMap from 'heatmap-ts'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { PageComponent } from '/@/components/Page/PageComponent'

import { mustConvertToIntNumber } from '/@/utils'

export const PageHeatmap = () => {
  const { comicId, volumeId, pageId } = useParams()

  useEffect(() => {
    const heatmap = new HeatMap({
      container: document.getElementById('heatmap-view') ?? undefined,
      maxOpacity: 0.6,
      radius: 50,
      blur: 0.9
    })

    heatmap.setData({
      max: 100,
      min: 1,
      data: [
        {
          x: 100,
          y: 100,
          value: 100,
          radius: 20
        },
        {
          x: 200,
          y: 250,
          value: 50,
          radius: 30
        }
      ]
    })
  })

  return (
    <div id="heatmap-view">
      <PageComponent
        className="w-full h-screen"
        comicId={mustConvertToIntNumber(comicId)}
        volumeId={mustConvertToIntNumber(volumeId)}
        pageId={mustConvertToIntNumber(pageId)}
        withLink
      />
    </div>
  )
}
