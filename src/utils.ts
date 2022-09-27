export const mustConvertToIntNumber = (param: string | undefined) => {
  if (param === undefined) {
    throw new Error()
  }
  if (!/^\d+$/.test(param)) {
    throw new Error()
  }
  return parseInt(param, 10)
}

export const getPageImgUrl = (comicId: string | undefined, volumeId: string | undefined, pageNum: string | number | undefined) => {
  const pageNumNum = typeof pageNum === 'number' ? pageNum : mustConvertToIntNumber(pageNum)
  return `/comics-meta/${comicId}/${volumeId}/p${pageNumNum.toString().padStart(5, '0')}.jpg`
}
