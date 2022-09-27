import { selector, useRecoilValue } from 'recoil'

export type ComicsData = ComicData[]
export type ComicData = {
  id: number
  abandonmentRate: number[]
  readingTime: number[]
  volumes: ComicVolumeData[]
}
export type ComicVolumeData = {
  id: number
  abandonmentRate: number[]
  readingTime: number[]
}

const comicsDataState = selector<ComicsData>({
  key: 'comicsData',
  get: async () => {
    const res = await fetch('/data/list.json')
    const data = await res.json()
    return data
  }
})

export const useComicsData = () => {
  return useRecoilValue(comicsDataState)
}
