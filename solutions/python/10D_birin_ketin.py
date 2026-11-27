import sys
from functools import lru_cache
sys.setrecursionlimit(10000)
INF = float('inf')

def check(n, a, b):
    # True if, with n children, b leaves right after a
    while True:
        if a > n or b > n or n < 2: return False
        if a % 2 == 0 and b % 2 == 0: return b == a + 2
        if a % 2 == 1 and b % 2 == 0: return False
        if a % 2 == 0:
            if n % 2 == 0: return a == n and b == (1 if n == 2 else 3)
            return a == n - 1 and b == 1
        if n % 2 == 0:
            n, a, b = n // 2, (a + 1) // 2, (b + 1) // 2
        else:
            m = (n + 1) // 2
            a = 1 if a == n else (a + 3) // 2
            b = 1 if b == n else (b + 3) // 2
            n = m

@lru_cache(maxsize=None)
def f(a, b):
    if a == b: return INF
    if a % 2 == 0 and b % 2 == 0: return b if b == a + 2 else INF
    if a % 2 == 1 and b % 2 == 0: return INF
    if a % 2 == 0:
        if b == 3 and a >= 4: return a
        if b == 1: return 2 if a == 2 else a + 1
        return INF
    best = min(2 * f((a + 1) // 2, (b + 1) // 2),
               2 * f((a + 3) // 2, (b + 3) // 2) - 1)
    if check(a, a, b): best = min(best, a)
    if check(b, a, b): best = min(best, b)
    return best

def main():
    data = sys.stdin.buffer.read().split()
    t = int(data[0])
    out = []
    for i in range(t):
        r = f(int(data[1 + 2 * i]), int(data[2 + 2 * i]))
        out.append("-1" if r == INF else str(r))
    print("\n".join(out))

main()
