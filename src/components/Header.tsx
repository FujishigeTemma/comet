import { ReactNode, useMemo } from 'react'
import { GrNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'

import type { ComicMeta } from '/@/comicsMetaState'

interface Props {
  meta?: ComicMeta
  volumeId?: number
}

export const Header = ({ meta, volumeId }: Props) => {
  const nestedRoutes = useMemo(() => {
    const routes = [{ component: <h1 className="text-xl font-bold">シリーズ一覧</h1>, path: '/comics' }]
    if (meta !== undefined) {
      routes.push({
        component: <h1 className="font-bold text-xl">{meta.name}</h1>,
        path: `/comics/${meta.id}`
      })
    }
    if (meta !== undefined && volumeId !== undefined) {
      routes.push({ component: <h1 className="font-bold text-xl">{volumeId}巻</h1>, path: `/comics/${meta.id}/volumes/${volumeId}` })
    }

    const list: ReactNode[] = []
    routes.forEach((route, i) => {
      if (i !== 0) {
        list.push(<GrNext />)
      }
      let item = route.component
      if (route.path !== undefined) {
        item = <Link to={route.path}>{item}</Link>
      }
      list.push(item)
    })
    return list
  }, [meta, volumeId])
  return <div className="flex items-center gap-2">{nestedRoutes}</div>
}
