import json
import math
import random


def sigmoide(x):
    return 1 / (1 + math.exp(-x))


pages = 86
avg_rt = 20

ar = [100 - 20 * (sigmoide(x / 10)) for x in range(-pages, pages, 2)]
rt = [20 + random.randint(-5, 5) for _ in range(0, pages)]

print(json.dumps([str(v) for v in rt]))
