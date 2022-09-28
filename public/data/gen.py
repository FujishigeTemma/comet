import json
import math
import random


def sigmoide(x):
    return 1 / (1 + math.exp(-x))


def tekito_kansu(x):
    return -2 * (10 ** -5) * (x ** 4) + 0.0041 * (x ** 3) - 0.2665 * (x ** 2) + 7.1109 * x - 2.2712

# export type ComicData = {
#   id: number
#   abandonmentRate: number[]
#   readingTime: number[]
#   volumes: ComicVolumeData[]
# }


pages = 86

prev = 0
abandonmentRate = []
readingTime = []
for x in range(0, pages):
    v = tekito_kansu(x)
    if prev > v or x > 47:
        v = prev + random.randint(0, 5) / 20
    prev = v
    abandonmentRate.append(v)

    rt = 20 + random.randint(-5, 5)
    readingTime.append(rt)

d = dict()
d["id"] = 10
d["abandonmentRate"] = []
d["readingTime"] = []

child = dict()
child["id"] = 1
child["abandonmentRate"] = abandonmentRate
child["readingTime"] = readingTime

d["volumes"] = [child]

with open("list.json", "w") as f:
    f.write(json.dumps([d]))


# avg_rt = 20

# ar = [100 - 20 * (sigmoide(x / 10)) for x in range(-pages, pages, 2)]
# rt = [20 + random.randint(-5, 5) for _ in range(0, pages)]

# print(json.dumps([str(v) for v in rt]))
