#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int k, n; cin >> k >> n;
    vector<long long> a(k * n);
    for (auto& x : a) cin >> x;
    sort(a.rbegin(), a.rend());              // biggest first
    long long s = 0;
    for (int i = 0; i < k; i++) s += a[i];
    cout << s << "\n";
}
