#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    for (int x = 100; x <= 999; x++) {
        int a = x / 100, b = x / 10 % 10, c = x % 10;
        if (a + b + c == n && a != b && b != c && a != c) { cout << x << "\n"; break; }
    }
}
