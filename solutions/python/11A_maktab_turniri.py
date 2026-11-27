A, B = map(int, input().split())
m = min(A, B)
lo, hi = 0, 10**18
while lo < hi:                      # largest k with 2*k*k <= m
    mid = (lo + hi + 1) // 2
    if 2 * mid * mid <= m:
        lo = mid
    else:
        hi = mid - 1
print(2 * lo)
