#include <bits/stdc++.h>
using namespace std;
vector<int> parent, par;                    // par = parity to parent
int find(int x) {
    if (parent[x] == x) return x;
    int root = find(parent[x]);
    par[x] ^= par[parent[x]];               // parent[x] now points at root (after recursion)
    parent[x] = root;
    return root;
}
int main() {
    int n, m; cin >> n >> m;
    parent.resize(n + m); par.assign(n + m, 0);
    iota(parent.begin(), parent.end(), 0);
    for (int i = 0; i < n; i++) {
        string row; cin >> row;
        for (int j = 0; j < m; j++) {
            if (row[j] == '?') continue;
            int d = row[j] == '+' ? 0 : 1;   // '+' same, '-' different
            int u = i, v = n + j;
            int ru = find(u), rv = find(v);
            if (ru == rv) {
                if ((par[u] ^ par[v]) != d) { cout << "NO\n"; return 0; }
            } else {
                parent[ru] = rv;
                par[ru] = par[u] ^ par[v] ^ d;
            }
        }
    }
    cout << "YES\n";
}
