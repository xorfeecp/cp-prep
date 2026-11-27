from bisect import bisect_left
n = int(input())
f = list(map(int, input().split()))
last = []
ans = []
for x in f:
    j = bisect_left(last, x)
    if j == len(last):
        last.append(x)
    else:
        last[j] = x
    ans.append(j + 1)
print(len(last))
print(*ans)
