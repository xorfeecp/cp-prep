n = int(input())
l, r = 1, 2 * n                 # the answer is always below 2n
while l < r:
    mid = (l + r) // 2
    count = mid - mid // 3 - mid // 5 + mid // 15   # good numbers <= mid
    if count >= n:
        r = mid
    else:
        l = mid + 1
print(l)
