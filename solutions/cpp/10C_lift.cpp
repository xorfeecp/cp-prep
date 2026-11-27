#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<long long> last;                  // last floor in each lift (sorted)
    vector<int> ans(n);
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        int j = lower_bound(last.begin(), last.end(), x) - last.begin();  // = bisect_left
        if (j == (int)last.size()) last.push_back(x);
        else last[j] = x;
        ans[i] = j + 1;
    }
    cout << last.size() << "\n";
    for (int i = 0; i < n; i++) cout << ans[i] << " \n"[i == n - 1];
}
