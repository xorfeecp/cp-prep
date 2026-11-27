#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n; cin >> n;
    long long l = 1, r = 2 * n;
    while (l < r) {
        long long mid = (l + r) / 2;
        long long cnt = mid - mid / 3 - mid / 5 + mid / 15;
        if (cnt >= n) r = mid; else l = mid + 1;
    }
    cout << l << "\n";
}
