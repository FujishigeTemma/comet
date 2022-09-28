import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useComicsMeta } from '/@/comicsMetaState'
import { getPageImgUrl, mustConvertToIntNumber } from '/@/utils'

interface Props {
  focused: number | null
}

const useVolumeMeta = (comicId: number, volumeId: number) => {
  const list = useComicsMeta()
  const comic = list.find(comic => comic.id === comicId)
  if (comic === undefined) {
    throw new Error()
  }
  const meta = comic.volumes.find(volume => volume.id === volumeId)
  if (meta === undefined) {
    throw new Error()
  }
  return meta
}

export const Thumbnails = ({ focused }: Props) => {
  const { comicId, volumeId } = useParams()
  const meta = useVolumeMeta(mustConvertToIntNumber(comicId), mustConvertToIntNumber(volumeId))

  const pages = useMemo(() => {
    const list = []
    for (let i = 1; i <= meta.pages; i++) {
      list.push(
        <li key={i} className="carousel-item">
          <Link to={`/comics/${comicId}/volumes/${volumeId}/pages/${i}`}>
            <img id={'page' + i} src={getPageImgUrl(comicId, volumeId, i)} className={i === focused ? 'max-w-[8rem]' : 'max-w-[6rem]'} />
          </Link>
        </li>
      )
    }

    return list
  }, [meta, comicId, volumeId, focused])

  useEffect(() => {
    location.hash = 'page' + (focused ?? 1)
  }, [focused])

  return <ol className="carousel carousel-center">{pages}</ol>
}

export const Thumbnails2 = ({ focused }: Props) => {
  const { comicId, volumeId } = useParams()
  const meta = useVolumeMeta(mustConvertToIntNumber(comicId), mustConvertToIntNumber(volumeId))

  const tuples: [string, string][] = []
  for (let i = 1; i <= meta.pages; i++) {
    tuples.push([getPageImgUrl(comicId, volumeId, i), `/comics/${comicId}/volumes/${volumeId}/pages/${i}`])
  }

  const container = useRef<HTMLUListElement>(null)

  const [width, setWidth] = useState(0)
  const [scroll, setScroll] = useState(0)
  useEffect(() => {
    if (container.current) {
      const rect = container.current.getBoundingClientRect()
      setWidth(rect.width)
    }
  }, [container])

  let timer: NodeJS.Timeout | null = null

  const scrollTo = (v: number) => {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      if (container.current) {
        container.current.scrollTo({ top: 0, left: v, behavior: 'smooth' })
        setScroll(v)
      }
    }, 50)
  }

  return (
    // MEMO: この height は overflow-hidden のための適当なやつ
    <ul className="relative w-full h-48 overflow-hidden py-8" ref={container}>
      {tuples.map((tuple, i) => {
        const [src, link] = tuple
        const isFocus = focused === i
        return <ThumbnailsContent key={src} src={src} link={link} isFocus={isFocus} index={i} containerWidth={width} scroll={scroll} scrollTo={scrollTo} />
      })}
    </ul>
  )
}

interface ContentProps {
  src: string
  link: string
  isFocus: boolean
  index: number
  containerWidth: number
  scrollTo: (scroll: number) => void
  scroll: number
}

const ThumbnailsContent = ({ src, link, isFocus, index, containerWidth, scroll, scrollTo }: ContentProps) => {
  const width = 6 * 16
  const cn = {
    absolute: true,
    transition: true,
    shadow: true,
    'shadow-lg': isFocus,
    'z-20': isFocus,
    'scale-125': isFocus
  }

  const cnOverlay = {
    absolute: true,
    transition: true,
    'bg-gray-500': true,
    'bg-opacity-10': true,
    'z-10': true,
    'inset-0': true,
    'opacity-0': isFocus,
    'opacity-100': !isFocus
  }

  useEffect(() => {
    const left = 2 * index * 16
    const right = left + width
    const SCROLL_PADDING = 32
    const halfContainer = Math.floor(containerWidth / 2)

    if (isFocus) {
      // // container が左にはみ出てる
      // if (left < scroll + SCROLL_PADDING) {
      //   scrollTo(left - SCROLL_PADDING)
      // }

      // // container が右にはみ出てる
      // if (right > scroll + containerWidth - SCROLL_PADDING) {
      //   scrollTo(left - containerWidth + width + SCROLL_PADDING)
      // }
      scrollTo(left - halfContainer + Math.floor(width / 2))
    }
  }, [isFocus, containerWidth, /*scroll, */ scrollTo, index, width])

  return (
    <li className={classNames(cn)} style={{ left: `${2 * index * 16}px`, width: `${width}px` }}>
      <div className="relative">
        <Link to={link}>
          <img src={src} />
        </Link>
      </div>
      <div className={classNames(cnOverlay)}></div>
    </li>
  )
}
