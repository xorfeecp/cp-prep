import sys

def main():
    data = sys.stdin.buffer.read().split()
    pos = 0
    n, k, m, q = (int(x) for x in data[0:4]); pos = 4
    name = []; gf0 = []; ga0 = []; pts0 = []; idx = {}
    for i in range(n):
        s = data[pos]; name.append(s); idx[s] = i
        gf0.append(int(data[pos + 1])); ga0.append(int(data[pos + 2])); pts0.append(int(data[pos + 3]))
        pos += 4
    opp = [0] * n
    for _ in range(n // 2):
        u = int(data[pos]) - 1; v = int(data[pos + 1]) - 1; pos += 2
        opp[u] = v; opp[v] = u
    events = {}
    for _ in range(q):
        t = idx[data[pos]]; tm = int(data[pos + 1]); g = int(data[pos + 2]); pos += 3
        events.setdefault(tm, []).append((t, g))
    times = sorted(events)

    score = [0] * n
    # rank names once, so a team's whole "table position" fits in ONE integer
    nrank = [0] * n
    for r, i in enumerate(sorted(range(n), key=lambda i: name[i])):
        nrank[i] = r
    B = 1 << 40                        # bigger than any points / goal difference / goals
    def key(i):
        s = score[i]; o = score[opp[i]]
        p = pts0[i] + (3 if s > o else (1 if s == o else 0))
        gf = gf0[i] + s; ga = ga0[i] + o
        # smaller key = higher in the table: more points, then better difference,
        # then more goals scored, then smaller name
        return (((B - p) * 2 * B + (B - (gf - ga))) * B + (B - gf)) * n + nrank[i]

    # pass 1: collect every key a team will ever have
    allkeys = [key(i) for i in range(n)]
    for tm in times:
        touched = set()
        for t, g in events[tm]:
            score[t] += g; touched.add(t); touched.add(opp[t])
        for i in touched: allkeys.append(key(i))
    allkeys.sort()
    where = {kk: j + 1 for j, kk in enumerate(allkeys)}   # keys are distinct per (team, state)
    size = len(allkeys)

    # Fenwick tree over key positions
    tree = [0] * (size + 1)
    def add(i, d):
        while i <= size:
            tree[i] += d; i += i & -i
    def count(i):                      # how many keys with position <= i
        r = 0
        while i > 0:
            r += tree[i]; i -= i & -i
        return r

    score = [0] * n
    cur = [0] * n
    for i in range(n):
        cur[i] = where[key(i)]; add(cur[i], 1)
    A = idx[b'Arsenal']; T = idx[b'Tottenham']

    def good():                        # (Arsenal first?, Tottenham in last k?)
        a_first = count(cur[A] - 1) == 0
        t_low = count(cur[T] - 1) >= n - k
        return a_first, t_low

    alice = 0
    start = 1
    for tm in times:
        dur = tm - start
        if dur > 0:
            a1, t1 = good(); alice += dur * (a1 + t1)
        touched = set()
        for t, g in events[tm]:
            score[t] += g; touched.add(t); touched.add(opp[t])
        for i in touched:
            add(cur[i], -1); cur[i] = where[key(i)]; add(cur[i], 1)
        start = tm
    dur = m - start + 1
    a1, t1 = good(); alice += dur * (a1 + t1)
    print(alice, 2 * m - alice)

main()
