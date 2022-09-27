import { selector, useRecoilValue } from 'recoil'

export type ComicsMeta = ComicMeta[]
export type ComicMeta = {
  id: number
  name: string
  author: string
  volumes: ComicVolumeMeta[]
}
export type ComicVolumeMeta = {
  id: number
  name: string
  cover: string
  spine: string
  pages: number
}

const comicsMetaState = selector<ComicsMeta>({
  key: 'comicsMeta',
  get: async () => {
    const res = await fetch('/comics-meta/list.json')
    const meta = await res.json()
    return meta
  }
})

export const useComicsMeta = () => {
  return useRecoilValue(comicsMetaState)
}
