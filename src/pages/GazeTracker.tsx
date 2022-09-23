import { Gazer } from '/@/components/Gazer'

import p00009 from '/@/assets/p00009.jpg'
import p00010 from '/@/assets/p00010.jpg'

export const GazeTracker = () => {
  return (
    <div className="flex flex-wrap h-full w-full">
      <Gazer />
      <img className="object-contain lg:w-1/2 h-full" src={p00010} alt="10" />
      <img className="object-contain lg:w-1/2 h-full" src={p00009} alt="9" />
    </div>
  )
}

export default GazeTracker
