import { Sidebar } from '/@/components/Nav/Sidebar'

export const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  )
}
