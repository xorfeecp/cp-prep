#include <bits/stdc++.h>
using namespace std;
int main() {
    long long A, B; cin >> A >> B;          // up to 10^18: must be long long
    long long m = min(A, B);
    long long lo = 0, hi = 1000000000;      // 2*hi*hi = 2e18 still fits in long long
    while (lo < hi) {
        long long mid = (lo + hi + 1) / 2;
        if (2 * mid * mid <= m) lo = mid; else hi = mid - 1;
    }
    cout << 2 * lo << "\n";
}
