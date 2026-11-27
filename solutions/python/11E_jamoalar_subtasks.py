import sys
def main():
    data = sys.stdin.buffer.read().split()
    n, K = int(data[0]), int(data[1])
    a = list(map(int, data[2:2 + n]))
    if K == 1:                                  # subtask 1, one team
        print(max(a) + min(a)); return
    if K == 2:                                  # subtask 1, try every cut
        pmax, pmin = [0] * n, [0] * n
        pmax[0] = pmin[0] = a[0]
        for i in range(1, n):
            pmax[i] = max(pmax[i - 1], a[i]); pmin[i] = min(pmin[i - 1], a[i])
        best = 0; smax = smin = a[-1]
        for i in range(n - 1, 0, -1):           # right team = a[i..n-1]
            smax = max(smax, a[i]); smin = min(smin, a[i])
            best = max(best, pmax[i - 1] + pmin[i - 1] + smax + smin)
        print(best); return
    if all(a[i] <= a[i + 1] for i in range(n - 1)) or all(a[i] >= a[i + 1] for i in range(n - 1)):
        b = sorted(a)                           # subtask 2: K-1 biggest alone, rest together
        print(b[0] + b[n - K] + 2 * sum(b[n - K + 1:])); return
    print("not handled")
main()
