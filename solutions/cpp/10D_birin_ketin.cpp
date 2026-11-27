#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll INF = LLONG_MAX / 4;

bool check(ll n, ll a, ll b) {             // with n children, does b leave right after a?
    while (true) {
        if (a > n || b > n || n < 2) return false;
        if (a % 2 == 0 && b % 2 == 0) return b == a + 2;
        if (a % 2 == 1 && b % 2 == 0) return false;
        if (a % 2 == 0) {
            if (n % 2 == 0) return a == n && b == (n == 2 ? 1 : 3);
            return a == n - 1 && b == 1;
        }
        if (n % 2 == 0) { n /= 2; a = (a + 1) / 2; b = (b + 1) / 2; }
        else {
            ll m = (n + 1) / 2;
            a = (a == n) ? 1 : (a + 3) / 2;
            b = (b == n) ? 1 : (b + 3) / 2;
            n = m;
        }
    }
}
map<pair<ll, ll>, ll> memo;
ll f(ll a, ll b) {                          // smallest n, or INF
    if (a == b) return INF;
    if (a % 2 == 0 && b % 2 == 0) return b == a + 2 ? b : INF;
    if (a % 2 == 1 && b % 2 == 0) return INF;
    if (a % 2 == 0) {
        if (b == 3 && a >= 4) return a;
        if (b == 1) return a == 2 ? 2 : a + 1;
        return INF;
    }
    auto key = make_pair(a, b);
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;
    ll best = INF;
    ll x = f((a + 1) / 2, (b + 1) / 2); if (x < INF) best = min(best, 2 * x);
    ll y = f((a + 3) / 2, (b + 3) / 2); if (y < INF) best = min(best, 2 * y - 1);
    if (check(a, a, b)) best = min(best, a);
    if (check(b, a, b)) best = min(best, b);
    return memo[key] = best;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int t; cin >> t;
    while (t--) {
        ll a, b; cin >> a >> b;
        ll r = f(a, b);
        cout << (r >= INF ? -1 : r) << "\n";
    }
}
