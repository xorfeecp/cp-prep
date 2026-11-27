#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    long long answer = 0, prev = 0;          // answer can be ~10^11: needs long long
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        if (x > prev) answer += x - prev;
        prev = x;
    }
    cout << answer << "\n";
}
