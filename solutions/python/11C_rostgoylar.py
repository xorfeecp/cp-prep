import sys
def main():
    data = sys.stdin.buffer.read().split()
    n, m = int(data[0]), int(data[1])
    rows = data[2:2 + n]
    # nodes 0..n-1 = people, n..n+m-1 = statements
    parent = list(range(n + m))
    par = [0] * (n + m)            # parity of a node relative to its parent
    def find(x):
        path = []
        while parent[x] != x:
            path.append(x); x = parent[x]
        root = x
        # compress the path, fixing parities from the top down
        for y in reversed(path):
            p = parent[y]
            if p != root:
                par[y] ^= par[p]
            parent[y] = root
        return root
    for i in range(n):
        row = rows[i]
        for j in range(m):
            c = row[j]
            if c == 63:            # '?'
                continue
            d = 0 if c == 43 else 1   # '+' -> same, '-' -> different
            u, v = i, n + j
            ru, rv = find(u), find(v)
            if ru == rv:
                if par[u] ^ par[v] != d:
                    print("NO"); return
            else:
                parent[ru] = rv
                par[ru] = par[u] ^ par[v] ^ d
    print("YES")
main()
