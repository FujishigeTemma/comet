import type { PropsWithChildren } from 'react'

import { Sidebar } from '/@/components/Nav/Sidebar'

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  )
}
