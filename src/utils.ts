export const mustConvertToIntNumber = (param: string | undefined) => {
  if (param === undefined) {
    console.log(1)
    throw new Error()
  }
  if (!/^\d+$/.test(param)) {
    console.log(2)
    throw new Error()
  }
  return parseInt(param, 10)
}

export const getPageImgUrl = (comicId: string | number | undefined, volumeId: string | number | undefined, pageNum: string | number | undefined) => {
  const pageNumNum = typeof pageNum === 'number' ? pageNum : mustConvertToIntNumber(pageNum)
  return `/comics-meta/${comicId}/${volumeId}/p${pageNumNum.toString().padStart(5, '0')}.jpg`
}
