import sys
def main():
    data = sys.stdin.buffer.read().split()
    N, M, K = int(data[0]), int(data[1]), int(data[2])
    adj1 = [0] * (N + 1)            # first neighbour (0 = none)
    adj2 = [0] * (N + 1)            # second neighbour
    deg = [0] * (N + 1)
    p = 3
    for _ in range(M):
        a = int(data[p]); b = int(data[p + 1]); p += 2
        if deg[a] == 0: adj1[a] = b
        else: adj2[a] = b
        if deg[b] == 0: adj1[b] = a
        else: adj2[b] = a
        deg[a] += 1; deg[b] += 1

    seen = bytearray(N + 1)
    comps = []                      # (is_cycle, [vertices in order])
    def walk(start):
        order = [start]; seen[start] = 1
        prev, cur = 0, start
        while True:
            nxt = adj1[cur] if adj1[cur] != prev else adj2[cur]
            if deg[cur] == 1 and cur != start and nxt == prev:
                nxt = 0
            if nxt == 0 or seen[nxt]:
                break
            seen[nxt] = 1; order.append(nxt)
            prev, cur = cur, nxt
        return order
    for v in range(1, N + 1):       # paths: start from an end (degree 0 or 1)
        if not seen[v] and deg[v] <= 1:
            comps.append((False, walk(v)))
    for v in range(1, N + 1):       # whatever is left lies on cycles
        if not seen[v]:
            comps.append((True, walk(v)))

    if len(comps) >= K:             # one station per component: never connected
        print("infinity")
        print(" ".join(str(c[1][0]) for c in comps[:K]))
        return

    def how_many(cyc, L, d):        # most stations in one component, all >= d apart
        if cyc:
            return max(1, L // d)
        return (L - 1) // d + 1
    def total(d):
        return sum(how_many(c, len(o), d) for c, o in comps)

    lo, hi = 1, N                   # largest d with total(d) >= K
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if total(mid) >= K: lo = mid
        else: hi = mid - 1
    d = lo
    chosen = []
    for c, o in comps:
        cnt = how_many(c, len(o), d)
        chosen.extend(o[i * d] for i in range(cnt))
        if len(chosen) >= K: break
    print(d)
    print(" ".join(map(str, chosen[:K])))
main()
