import sys
data = sys.stdin.buffer.read().split()
k, n = int(data[0]), int(data[1])
a = sorted(map(int, data[2:2 + k * n]), reverse=True)
print(sum(a[:k]))                   # the k biggest loads survive
