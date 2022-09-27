import { Sidebar } from '/@/components/Nav/Sidebar'

export const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  )
}
