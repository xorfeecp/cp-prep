#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N, M, K;
    cin >> N >> M >> K;
    vector<int> a1(N + 1, 0), a2(N + 1, 0), deg(N + 1, 0);
    for (int i = 0; i < M; i++) {
        int a, b; cin >> a >> b;
        (deg[a] == 0 ? a1[a] : a2[a]) = b;
        (deg[b] == 0 ? a1[b] : a2[b]) = a;
        deg[a]++; deg[b]++;
    }
    vector<char> seen(N + 1, 0);
    vector<vector<int>> comp;        // vertices of each component, in walking order
    vector<char> isCycle;
    auto walk = [&](int s) {
        vector<int> order = {s}; seen[s] = 1;
        int prev = 0, cur = s;
        while (true) {
            int nxt = (a1[cur] != prev) ? a1[cur] : a2[cur];
            if (nxt == 0 || seen[nxt]) break;
            seen[nxt] = 1; order.push_back(nxt);
            prev = cur; cur = nxt;
        }
        return order;
    };
    for (int v = 1; v <= N; v++)
        if (!seen[v] && deg[v] <= 1) { comp.push_back(walk(v)); isCycle.push_back(0); }
    for (int v = 1; v <= N; v++)
        if (!seen[v]) { comp.push_back(walk(v)); isCycle.push_back(1); }

    int C = comp.size();
    if (C >= K) {
        cout << "infinity\n";
        for (int i = 0; i < K; i++) cout << comp[i][0] << " \n"[i == K - 1];
        return 0;
    }
    auto howMany = [&](int i, int d) -> long long {
        long long L = comp[i].size();
        if (isCycle[i]) return max(1LL, L / d);
        return (L - 1) / d + 1;
    };
    auto total = [&](int d) {
        long long s = 0;
        for (int i = 0; i < C; i++) s += howMany(i, d);
        return s;
    };
    int lo = 1, hi = N;              // largest d with total(d) >= K
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2;
        if (total(mid) >= K) lo = mid; else hi = mid - 1;
    }
    int d = lo;
    vector<int> chosen;
    for (int i = 0; i < C && (int)chosen.size() < K; i++) {
        long long cnt = howMany(i, d);
        for (long long j = 0; j < cnt && (int)chosen.size() < K; j++)
            chosen.push_back(comp[i][j * d]);
    }
    cout << d << "\n";
    for (int i = 0; i < K; i++) cout << chosen[i] << " \n"[i == K - 1];
}
