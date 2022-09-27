import fs from 'node:fs/promises'

const inputDir = new URL('./input/', import.meta.url)
const outputFile = new URL('../output.json', import.meta.url)

const fileList = (await fs.readdir(inputDir)).map(file => new URL(`./${file}`, inputDir))

const fileContentList = await Promise.all(fileList.map(async file => fs.readFile(file, 'utf-8')))
const parsedList = fileContentList.map(fileContent => JSON.parse(fileContent))
const formatedList = parsedList.map(data => {
  const firstTime = data[0].elapsedTime
  return data.map(d => ({ x: d.xprediction, y: d.yprediction, time: d.elapsedTime - firstTime }))
})

await fs.writeFile(outputFile, JSON.stringify(formatedList), 'utf-8')
