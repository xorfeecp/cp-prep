#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll NEG = LLONG_MIN / 4;

int n, K;
vector<ll> mx, lz;              // segment tree: range add, range max

void build(int node, int l, int r, const vector<ll>& base) {
    lz[node] = 0;
    if (l == r) { mx[node] = base[l]; return; }
    int m = (l + r) / 2;
    build(2 * node, l, m, base); build(2 * node + 1, m + 1, r, base);
    mx[node] = max(mx[2 * node], mx[2 * node + 1]);
}
void add(int node, int l, int r, int ql, int qr, ll v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { mx[node] += v; lz[node] += v; return; }
    int m = (l + r) / 2;
    add(2 * node, l, m, ql, qr, v); add(2 * node + 1, m + 1, r, ql, qr, v);
    mx[node] = max(mx[2 * node], mx[2 * node + 1]) + lz[node];
}
ll query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return NEG;
    if (ql <= l && r <= qr) return mx[node];
    int m = (l + r) / 2;
    return max(query(2 * node, l, m, ql, qr), query(2 * node + 1, m + 1, r, ql, qr)) + lz[node];
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n >> K;
    vector<ll> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    mx.assign(4 * n + 4, 0); lz.assign(4 * n + 4, 0);

    vector<ll> prev(n + 1, NEG), cur(n + 1, NEG);
    prev[0] = 0;                               // 0 teams cover 0 students
    for (int j = 1; j <= K; j++) {
        // position l (1..n) means "the last team starts at l"; value = prev[l-1] + max + min
        vector<ll> base(n + 1);
        for (int l = 1; l <= n; l++) base[l] = prev[l - 1];
        build(1, 1, n, base);
        vector<int> smax, smin;                // monotonic stacks of indices
        fill(cur.begin(), cur.end(), NEG);
        for (int i = 1; i <= n; i++) {
            add(1, 1, n, i, i, 2 * a[i]);      // team [i..i]: max = min = a[i]
            while (!smax.empty() && a[smax.back()] <= a[i]) {
                int t = smax.back(); smax.pop_back();
                int from = smax.empty() ? 1 : smax.back() + 1;
                add(1, 1, n, from, t, a[i] - a[t]);   // their max grows to a[i]
            }
            smax.push_back(i);
            while (!smin.empty() && a[smin.back()] >= a[i]) {
                int t = smin.back(); smin.pop_back();
                int from = smin.empty() ? 1 : smin.back() + 1;
                add(1, 1, n, from, t, a[i] - a[t]);   // their min drops to a[i]
            }
            smin.push_back(i);
            ll best = query(1, 1, n, 1, i);
            cur[i] = best < NEG / 2 ? NEG : best;
        }
        prev = cur;
    }
    cout << prev[n] << "\n";
}
