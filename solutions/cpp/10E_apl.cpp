#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
// A team's place in the table as one comparable value: smaller = higher place.
typedef tuple<ll, ll, ll, int> Key;   // (-points, -goal difference, -goals, name rank)

int n, k; ll m; int q;
vector<ll> gf0, ga0, pts0, score;
vector<int> opp, nrank;

Key key(int i) {
    ll s = score[i], o = score[opp[i]];
    ll p = pts0[i] + (s > o ? 3 : (s == o ? 1 : 0));
    ll gf = gf0[i] + s, ga = ga0[i] + o;
    return Key(-p, -(gf - ga), -gf, nrank[i]);
}
vector<int> bit;
void add(int i, int d) { for (; i < (int)bit.size(); i += i & -i) bit[i] += d; }
int cnt(int i) { int r = 0; for (; i > 0; i -= i & -i) r += bit[i]; return r; }

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    cin >> n >> k >> m >> q;
    vector<string> name(n);
    gf0.resize(n); ga0.resize(n); pts0.resize(n); score.assign(n, 0); opp.resize(n); nrank.resize(n);
    map<string, int> idx;
    for (int i = 0; i < n; i++) { cin >> name[i] >> gf0[i] >> ga0[i] >> pts0[i]; idx[name[i]] = i; }
    { int r = 0; for (auto& [s, i] : idx) nrank[i] = r++; }   // map is sorted by name
    for (int i = 0; i < n / 2; i++) { int u, v; cin >> u >> v; u--; v--; opp[u] = v; opp[v] = u; }
    map<ll, vector<pair<int, ll>>> ev;                          // minute -> goals
    for (int i = 0; i < q; i++) { string s; ll t, g; cin >> s >> t >> g; ev[t].push_back({idx[s], g}); }

    vector<Key> all;                                            // pass 1: every key ever
    for (int i = 0; i < n; i++) all.push_back(key(i));
    for (auto& [t, list] : ev) {
        set<int> touched;
        for (auto [team, g] : list) { score[team] += g; touched.insert(team); touched.insert(opp[team]); }
        for (int i : touched) all.push_back(key(i));
    }
    sort(all.begin(), all.end());
    all.erase(unique(all.begin(), all.end()), all.end());
    auto pos = [&](const Key& x) { return int(lower_bound(all.begin(), all.end(), x) - all.begin()) + 1; };

    bit.assign(all.size() + 1, 0);                              // pass 2: replay
    fill(score.begin(), score.end(), 0);
    vector<int> cur(n);
    for (int i = 0; i < n; i++) { cur[i] = pos(key(i)); add(cur[i], 1); }
    int A = idx["Arsenal"], T = idx["Tottenham"];
    auto happy = [&]() {
        return int(cnt(cur[A] - 1) == 0) + int(cnt(cur[T] - 1) >= n - k);
    };
    ll alice = 0, start = 1;
    for (auto& [t, list] : ev) {
        alice += (t - start) * happy();
        set<int> touched;
        for (auto [team, g] : list) { score[team] += g; touched.insert(team); touched.insert(opp[team]); }
        for (int i : touched) { add(cur[i], -1); cur[i] = pos(key(i)); add(cur[i], 1); }
        start = t;
    }
    alice += (m - start + 1) * happy();
    cout << alice << " " << 2 * m - alice << "\n";
}
