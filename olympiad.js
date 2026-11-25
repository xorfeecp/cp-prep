window.OLY = [
 {
  "id": "O10K",
  "grade": "Practice",
  "letter": "K",
  "title": "The k-th number not divisible by 3 or 5",
  "rating": 1200,
  "lessons": [
   "i7",
   "m3"
  ],
  "story": "Print the n-th positive number that is divisible neither by 3 nor by 5 (1, 2, 4, 7, 8, 11, …). n can be up to 10⁹.",
  "subtasks": [
   [
    "small n",
    "—",
    "Loop x = 1, 2, 3, … and count good numbers until you reach n."
   ]
  ],
  "steps": [
   "Good numbers repeat in blocks of 15 (15 = lcm(3, 5)); every block has exactly 8: 1, 2, 4, 7, 8, 11, 13, 14.",
   "count(x) = x − x//3 − x//5 + x//15 (remove the multiples of 3 and of 5, add back the multiples of 15).",
   "The answer is the smallest x with count(x) ≥ n, so binary search on [1, 2n] (more than half of all numbers are good).",
   "Or the block formula: k = n − 1, answer = 15·(k // 8) + [1,2,4,7,8,11,13,14][k % 8]."
  ],
  "py": "n = int(input())\nl, r = 1, 2 * n                 # the answer is always below 2n\nwhile l < r:\n    mid = (l + r) // 2\n    count = mid - mid // 3 - mid // 5 + mid // 15   # good numbers <= mid\n    if count >= n:\n        r = mid\n    else:\n        l = mid + 1\nprint(l)\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    long long l = 1, r = 2 * n;\n    while (l < r) {\n        long long mid = (l + r) / 2;\n        long long cnt = mid - mid / 3 - mid / 5 + mid / 15;\n        if (cnt >= n) r = mid; else l = mid + 1;\n    }\n    cout << l << \"\\n\";\n}\n"
 },
 {
  "id": "O10A",
  "grade": "10th",
  "letter": "A",
  "title": "Raqamlar yig'indisi (digit sum)",
  "rating": 800,
  "lessons": [
   "b3"
  ],
  "story": "Given n (3 ≤ n ≤ 24), print the smallest 3-digit number whose digits are all different and add up to n.",
  "subtasks": [
   [
    "1 (n ≤ 5)",
    "14",
    "Same code as the full solution."
   ],
   [
    "2 (n ≤ 10)",
    "23",
    "Same."
   ],
   [
    "3 (no limits)",
    "63",
    "Same."
   ]
  ],
  "steps": [
   "There are only 900 three-digit numbers, so try them all from 100 upwards.",
   "Split x into digits with //100, //10%10, %10.",
   "The first x that matches is the smallest. Print it and stop.",
   "An answer always exists: the biggest sum with different digits is 9+8+7 = 24."
  ],
  "py": "n = int(input())\nfor x in range(100, 1000):\n    a, b, c = x // 100, x // 10 % 10, x % 10\n    if a + b + c == n and a != b and b != c and a != c:\n        print(x)\n        break\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    for (int x = 100; x <= 999; x++) {\n        int a = x / 100, b = x / 10 % 10, c = x % 10;\n        if (a + b + c == n && a != b && b != c && a != c) { cout << x << \"\\n\"; break; }\n    }\n}\n"
 },
 {
  "id": "O10B",
  "grade": "10th",
  "letter": "B",
  "title": "Suv zaxirasi (water containers)",
  "rating": 1200,
  "lessons": [
   "i5"
  ],
  "story": "N containers in a row. One operation: choose a segment [l, r] and x, and pump x litres from every container in it (each must have ≥ x). It costs x energy whatever the length. Find the minimum total energy to empty everything.",
  "subtasks": [
   [
    "1 (monotone, 7 pts)",
    "7",
    "Increasing or decreasing: the answer is just max(a) (take the whole shape in layers)."
   ],
   [
    "2 (N = 3, 11 pts)",
    "11",
    "Rises formula, or reason about the 3 cases by hand."
   ],
   [
    "3 (two different heights, 22 pts)",
    "22",
    "Rises formula: low level once, plus each block of high containers."
   ],
   [
    "4 (N ≤ 500, 25 pts)",
    "25",
    "Simulate: repeatedly remove 1 from every maximal non-empty segment (or use rises)."
   ],
   [
    "5 (no limits, 35 pts)",
    "35",
    "Sum of rises, O(N)."
   ]
  ],
  "steps": [
   "Pumping x litres for x energy equals x separate 1-litre operations, so x doesn't matter.",
   "Draw the containers as columns of blocks: each 1-litre operation removes one connected horizontal strip.",
   "A strip begins at column i for every level by which a[i] is higher than a[i−1].",
   "Answer = Σ max(0, a[i] − a[i−1]) with a[0] = 0. Example: 1 3 3 5 4 5 → 1+2+0+2+0+1 = 6."
  ],
  "py": "n = int(input())\na = list(map(int, input().split()))\nanswer = 0\nprev = 0\nfor x in a:\n    if x > prev:\n        answer += x - prev\n    prev = x\nprint(answer)\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n; cin >> n;\n    long long answer = 0, prev = 0;          // answer can be ~10^11: needs long long\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x;\n        if (x > prev) answer += x - prev;\n        prev = x;\n    }\n    cout << answer << \"\\n\";\n}\n"
 },
 {
  "id": "O10C",
  "grade": "10th",
  "letter": "C",
  "title": "Bir qatorda (narrow lifts)",
  "rating": 1500,
  "lessons": [
   "b2",
   "m2",
   "p6"
  ],
  "story": "People queue with floors f_i. Each enters the lowest-numbered lift whose last person's floor is ≥ theirs (an empty lift takes anyone). Print the number of lifts and each person's lift.",
  "subtasks": [
   [
    "1 (n ≤ 1000)",
    "11",
    "Simulation: check lifts one by one."
   ],
   [
    "2 (floors ≤ 10)",
    "20",
    "Same simulation: at most 10 lifts, so it's fast."
   ],
   [
    "3 (answer ≤ 10)",
    "22",
    "Same simulation: at most 10 lifts."
   ],
   [
    "4 (no limits)",
    "47",
    "Simulation + bisect_left."
   ]
  ],
  "steps": [
   "Store only the last floor of each lift.",
   "That list is always sorted (new lifts open only for bigger floors, and a lift's last floor only drops between its neighbours).",
   "\"First lift with last ≥ x\" = bisect_left(last, x). If it equals len(last), open a new lift.",
   "O(n log n). The number of lifts = the longest strictly increasing subsequence (patience sorting)."
  ],
  "py": "from bisect import bisect_left\nn = int(input())\nf = list(map(int, input().split()))\nlast = []\nans = []\nfor x in f:\n    j = bisect_left(last, x)\n    if j == len(last):\n        last.append(x)\n    else:\n        last[j] = x\n    ans.append(j + 1)\nprint(len(last))\nprint(*ans)\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int n; cin >> n;\n    vector<long long> last;                  // last floor in each lift (sorted)\n    vector<int> ans(n);\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x;\n        int j = lower_bound(last.begin(), last.end(), x) - last.begin();  // = bisect_left\n        if (j == (int)last.size()) last.push_back(x);\n        else last[j] = x;\n        ans[i] = j + 1;\n    }\n    cout << last.size() << \"\\n\";\n    for (int i = 0; i < n; i++) cout << ans[i] << \" \\n\"[i == n - 1];\n}\n"
 },
 {
  "id": "O10D",
  "grade": "10th",
  "letter": "D",
  "title": "Birin-ketin (children in a circle)",
  "rating": 2000,
  "lessons": [
   "p1",
   "p5",
   "m4"
  ],
  "story": "Children 1..n in a circle: one stays, the next leaves, repeatedly. For a pair (a, b), find the smallest n where b leaves right after a, or −1.",
  "subtasks": [
   [
    "1 (a, b ≤ 100)",
    "5",
    "Simulate the game with a deque for n = 1, 2, 3, …"
   ],
   [
    "2 (a, b ≤ 1000)",
    "8",
    "Compute the leaving step T(n, x) in O(log n) and try n from max(a,b) to 2·max(a,b)."
   ],
   [
    "3 (a even)",
    "10",
    "Even a leaves in round 1: b = a+2 → n = b; b = 3 → n = a (a ≥ 4); b = 1 → n = a+1 (n = 2 if a = 2)."
   ],
   [
    "4, 5",
    "29 + 37",
    "Full recursive solution."
   ],
   [
    "6 (t ≤ 10⁵)",
    "11",
    "Same, with memoization: under 0.5 s."
   ]
  ],
  "steps": [
   "Round one removes all even children. Then the odd children play the same game with about half as many children.",
   "n even: small child x = big child 2x−1. n odd: small child 1 = big child n, small child x = big child 2x−3.",
   "Even/even pairs only happen in round one (b = a+2). Odd a followed by even b is impossible.",
   "Odd/odd pairs: recurse on ((a+1)/2, (b+1)/2) for even n (answer 2·m) and on ((a+3)/2, (b+3)/2) for odd n (answer 2·m−1), plus n = a or n = b directly.",
   "Checked against the official examples: (1337, 17) → 1344 and (99, 3) → 161."
  ],
  "py": "import sys\nfrom functools import lru_cache\nsys.setrecursionlimit(10000)\nINF = float('inf')\n\ndef check(n, a, b):\n    # True if, with n children, b leaves right after a\n    while True:\n        if a > n or b > n or n < 2: return False\n        if a % 2 == 0 and b % 2 == 0: return b == a + 2\n        if a % 2 == 1 and b % 2 == 0: return False\n        if a % 2 == 0:\n            if n % 2 == 0: return a == n and b == (1 if n == 2 else 3)\n            return a == n - 1 and b == 1\n        if n % 2 == 0:\n            n, a, b = n // 2, (a + 1) // 2, (b + 1) // 2\n        else:\n            m = (n + 1) // 2\n            a = 1 if a == n else (a + 3) // 2\n            b = 1 if b == n else (b + 3) // 2\n            n = m\n\n@lru_cache(maxsize=None)\ndef f(a, b):\n    if a == b: return INF\n    if a % 2 == 0 and b % 2 == 0: return b if b == a + 2 else INF\n    if a % 2 == 1 and b % 2 == 0: return INF\n    if a % 2 == 0:\n        if b == 3 and a >= 4: return a\n        if b == 1: return 2 if a == 2 else a + 1\n        return INF\n    best = min(2 * f((a + 1) // 2, (b + 1) // 2),\n               2 * f((a + 3) // 2, (b + 3) // 2) - 1)\n    if check(a, a, b): best = min(best, a)\n    if check(b, a, b): best = min(best, b)\n    return best\n\ndef main():\n    data = sys.stdin.buffer.read().split()\n    t = int(data[0])\n    out = []\n    for i in range(t):\n        r = f(int(data[1 + 2 * i]), int(data[2 + 2 * i]))\n        out.append(\"-1\" if r == INF else str(r))\n    print(\"\\n\".join(out))\n\nmain()\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\nconst ll INF = LLONG_MAX / 4;\n\nbool check(ll n, ll a, ll b) {             // with n children, does b leave right after a?\n    while (true) {\n        if (a > n || b > n || n < 2) return false;\n        if (a % 2 == 0 && b % 2 == 0) return b == a + 2;\n        if (a % 2 == 1 && b % 2 == 0) return false;\n        if (a % 2 == 0) {\n            if (n % 2 == 0) return a == n && b == (n == 2 ? 1 : 3);\n            return a == n - 1 && b == 1;\n        }\n        if (n % 2 == 0) { n /= 2; a = (a + 1) / 2; b = (b + 1) / 2; }\n        else {\n            ll m = (n + 1) / 2;\n            a = (a == n) ? 1 : (a + 3) / 2;\n            b = (b == n) ? 1 : (b + 3) / 2;\n            n = m;\n        }\n    }\n}\nmap<pair<ll, ll>, ll> memo;\nll f(ll a, ll b) {                          // smallest n, or INF\n    if (a == b) return INF;\n    if (a % 2 == 0 && b % 2 == 0) return b == a + 2 ? b : INF;\n    if (a % 2 == 1 && b % 2 == 0) return INF;\n    if (a % 2 == 0) {\n        if (b == 3 && a >= 4) return a;\n        if (b == 1) return a == 2 ? 2 : a + 1;\n        return INF;\n    }\n    auto key = make_pair(a, b);\n    auto it = memo.find(key);\n    if (it != memo.end()) return it->second;\n    ll best = INF;\n    ll x = f((a + 1) / 2, (b + 1) / 2); if (x < INF) best = min(best, 2 * x);\n    ll y = f((a + 3) / 2, (b + 3) / 2); if (y < INF) best = min(best, 2 * y - 1);\n    if (check(a, a, b)) best = min(best, a);\n    if (check(b, a, b)) best = min(best, b);\n    return memo[key] = best;\n}\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int t; cin >> t;\n    while (t--) {\n        ll a, b; cin >> a >> b;\n        ll r = f(a, b);\n        cout << (r >= INF ? -1 : r) << \"\\n\";\n    }\n}\n"
 },
 {
  "id": "O10E",
  "grade": "10th",
  "letter": "E",
  "title": "APL: So'nggi tur (football table)",
  "rating": 2100,
  "lessons": [
   "a4",
   "a5",
   "i1"
  ],
  "story": "During the last round (m ≤ 10⁹ minutes) goals change the table. Each minute Alice gains 1 if Arsenal is first and 1 if Tottenham is in the last k; Bob gains the opposite. Print both totals.",
  "subtasks": [
   [
    "1 (q = 0)",
    "5",
    "The table never changes: compute it once and multiply by m."
   ],
   [
    "2 (n, q ≤ 2000)",
    "15",
    "At each goal minute, count teams better than Arsenal/Tottenham in O(n)."
   ],
   [
    "3 (m ≤ 90)",
    "20",
    "Recompute the table every minute."
   ],
   [
    "4",
    "20",
    "Arsenal/Tottenham positions only change when others score: same sweep."
   ],
   [
    "5",
    "40",
    "Sweep over goal minutes + Fenwick tree over compressed keys."
   ]
  ],
  "steps": [
   "Bob = 2m − Alice (every minute exactly two points are shared).",
   "Between goal minutes nothing changes: add gap × (Arsenal first) + gap × (Tottenham in last k).",
   "A team's key = (−points, −goal difference, −goals, name rank): smaller is higher. A draw at 0:0 already gives +1 point.",
   "Collect every key that will appear, sort, and put them in a Fenwick tree. Place = 1 + count of smaller keys. When a goal is scored, update the scorer and its opponent.",
   "Python runs about 3.8 s on the largest test (limit 5 s). C++ about 0.85 s."
  ],
  "py": "import sys\n\ndef main():\n    data = sys.stdin.buffer.read().split()\n    pos = 0\n    n, k, m, q = (int(x) for x in data[0:4]); pos = 4\n    name = []; gf0 = []; ga0 = []; pts0 = []; idx = {}\n    for i in range(n):\n        s = data[pos]; name.append(s); idx[s] = i\n        gf0.append(int(data[pos + 1])); ga0.append(int(data[pos + 2])); pts0.append(int(data[pos + 3]))\n        pos += 4\n    opp = [0] * n\n    for _ in range(n // 2):\n        u = int(data[pos]) - 1; v = int(data[pos + 1]) - 1; pos += 2\n        opp[u] = v; opp[v] = u\n    events = {}\n    for _ in range(q):\n        t = idx[data[pos]]; tm = int(data[pos + 1]); g = int(data[pos + 2]); pos += 3\n        events.setdefault(tm, []).append((t, g))\n    times = sorted(events)\n\n    score = [0] * n\n    # rank names once, so a team's whole \"table position\" fits in ONE integer\n    nrank = [0] * n\n    for r, i in enumerate(sorted(range(n), key=lambda i: name[i])):\n        nrank[i] = r\n    B = 1 << 40                        # bigger than any points / goal difference / goals\n    def key(i):\n        s = score[i]; o = score[opp[i]]\n        p = pts0[i] + (3 if s > o else (1 if s == o else 0))\n        gf = gf0[i] + s; ga = ga0[i] + o\n        # smaller key = higher in the table: more points, then better difference,\n        # then more goals scored, then smaller name\n        return (((B - p) * 2 * B + (B - (gf - ga))) * B + (B - gf)) * n + nrank[i]\n\n    # pass 1: collect every key a team will ever have\n    allkeys = [key(i) for i in range(n)]\n    for tm in times:\n        touched = set()\n        for t, g in events[tm]:\n            score[t] += g; touched.add(t); touched.add(opp[t])\n        for i in touched: allkeys.append(key(i))\n    allkeys.sort()\n    where = {kk: j + 1 for j, kk in enumerate(allkeys)}   # keys are distinct per (team, state)\n    size = len(allkeys)\n\n    # Fenwick tree over key positions\n    tree = [0] * (size + 1)\n    def add(i, d):\n        while i <= size:\n            tree[i] += d; i += i & -i\n    def count(i):                      # how many keys with position <= i\n        r = 0\n        while i > 0:\n            r += tree[i]; i -= i & -i\n        return r\n\n    score = [0] * n\n    cur = [0] * n\n    for i in range(n):\n        cur[i] = where[key(i)]; add(cur[i], 1)\n    A = idx[b'Arsenal']; T = idx[b'Tottenham']\n\n    def good():                        # (Arsenal first?, Tottenham in last k?)\n        a_first = count(cur[A] - 1) == 0\n        t_low = count(cur[T] - 1) >= n - k\n        return a_first, t_low\n\n    alice = 0\n    start = 1\n    for tm in times:\n        dur = tm - start\n        if dur > 0:\n            a1, t1 = good(); alice += dur * (a1 + t1)\n        touched = set()\n        for t, g in events[tm]:\n            score[t] += g; touched.add(t); touched.add(opp[t])\n        for i in touched:\n            add(cur[i], -1); cur[i] = where[key(i)]; add(cur[i], 1)\n        start = tm\n    dur = m - start + 1\n    a1, t1 = good(); alice += dur * (a1 + t1)\n    print(alice, 2 * m - alice)\n\nmain()\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n// A team's place in the table as one comparable value: smaller = higher place.\ntypedef tuple<ll, ll, ll, int> Key;   // (-points, -goal difference, -goals, name rank)\n\nint n, k; ll m; int q;\nvector<ll> gf0, ga0, pts0, score;\nvector<int> opp, nrank;\n\nKey key(int i) {\n    ll s = score[i], o = score[opp[i]];\n    ll p = pts0[i] + (s > o ? 3 : (s == o ? 1 : 0));\n    ll gf = gf0[i] + s, ga = ga0[i] + o;\n    return Key(-p, -(gf - ga), -gf, nrank[i]);\n}\nvector<int> bit;\nvoid add(int i, int d) { for (; i < (int)bit.size(); i += i & -i) bit[i] += d; }\nint cnt(int i) { int r = 0; for (; i > 0; i -= i & -i) r += bit[i]; return r; }\n\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    cin >> n >> k >> m >> q;\n    vector<string> name(n);\n    gf0.resize(n); ga0.resize(n); pts0.resize(n); score.assign(n, 0); opp.resize(n); nrank.resize(n);\n    map<string, int> idx;\n    for (int i = 0; i < n; i++) { cin >> name[i] >> gf0[i] >> ga0[i] >> pts0[i]; idx[name[i]] = i; }\n    { int r = 0; for (auto& [s, i] : idx) nrank[i] = r++; }   // map is sorted by name\n    for (int i = 0; i < n / 2; i++) { int u, v; cin >> u >> v; u--; v--; opp[u] = v; opp[v] = u; }\n    map<ll, vector<pair<int, ll>>> ev;                          // minute -> goals\n    for (int i = 0; i < q; i++) { string s; ll t, g; cin >> s >> t >> g; ev[t].push_back({idx[s], g}); }\n\n    vector<Key> all;                                            // pass 1: every key ever\n    for (int i = 0; i < n; i++) all.push_back(key(i));\n    for (auto& [t, list] : ev) {\n        set<int> touched;\n        for (auto [team, g] : list) { score[team] += g; touched.insert(team); touched.insert(opp[team]); }\n        for (int i : touched) all.push_back(key(i));\n    }\n    sort(all.begin(), all.end());\n    all.erase(unique(all.begin(), all.end()), all.end());\n    auto pos = [&](const Key& x) { return int(lower_bound(all.begin(), all.end(), x) - all.begin()) + 1; };\n\n    bit.assign(all.size() + 1, 0);                              // pass 2: replay\n    fill(score.begin(), score.end(), 0);\n    vector<int> cur(n);\n    for (int i = 0; i < n; i++) { cur[i] = pos(key(i)); add(cur[i], 1); }\n    int A = idx[\"Arsenal\"], T = idx[\"Tottenham\"];\n    auto happy = [&]() {\n        return int(cnt(cur[A] - 1) == 0) + int(cnt(cur[T] - 1) >= n - k);\n    };\n    ll alice = 0, start = 1;\n    for (auto& [t, list] : ev) {\n        alice += (t - start) * happy();\n        set<int> touched;\n        for (auto [team, g] : list) { score[team] += g; touched.insert(team); touched.insert(opp[team]); }\n        for (int i : touched) { add(cur[i], -1); cur[i] = pos(key(i)); add(cur[i], 1); }\n        start = t;\n    }\n    alice += (m - start + 1) * happy();\n    cout << alice << \" \" << 2 * m - alice << \"\\n\";\n}\n"
 },
 {
  "id": "O11A",
  "grade": "11th",
  "letter": "A",
  "title": "Maktab turniri (chessboard)",
  "rating": 1100,
  "lessons": [
   "m5",
   "m3",
   "c2"
  ],
  "story": "Aziza has A white and B black cells (up to 10¹⁸). Find the biggest s for an s×s chessboard with equal white and black cells, or 0.",
  "subtasks": [
   [
    "2 (A = 2)",
    "10",
    "Answer 2 if B ≥ 2, else 0."
   ],
   [
    "3 (A, B ≤ 100)",
    "35",
    "Try every even s."
   ],
   [
    "4 (≤ 10⁹)",
    "15",
    "Loop over even s (about 45000 steps)."
   ],
   [
    "5 (≤ 10¹⁸)",
    "40",
    "Binary search on k = s/2."
   ]
  ],
  "steps": [
   "Neighbours differ means a real chessboard. An odd s has one extra cell of one colour, so s must be even.",
   "Side s = 2k needs 2k² cells of each colour, so only m = min(A, B) matters.",
   "Largest k with 2k² ≤ m (binary search; searching on s directly breaks the one-switch rule).",
   "C++: use long long, as the statement warns about 32-bit."
  ],
  "py": "A, B = map(int, input().split())\nm = min(A, B)\nlo, hi = 0, 10**18\nwhile lo < hi:                      # largest k with 2*k*k <= m\n    mid = (lo + hi + 1) // 2\n    if 2 * mid * mid <= m:\n        lo = mid\n    else:\n        hi = mid - 1\nprint(2 * lo)\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    long long A, B; cin >> A >> B;          // up to 10^18: must be long long\n    long long m = min(A, B);\n    long long lo = 0, hi = 1000000000;      // 2*hi*hi = 2e18 still fits in long long\n    while (lo < hi) {\n        long long mid = (lo + hi + 1) / 2;\n        if (2 * mid * mid <= m) lo = mid; else hi = mid - 1;\n    }\n    cout << 2 * lo << \"\\n\";\n}\n"
 },
 {
  "id": "O11B",
  "grade": "11th",
  "letter": "B",
  "title": "Karvonsaroy (caravan game)",
  "rating": 1300,
  "lessons": [
   "m4",
   "m5",
   "r2"
  ],
  "story": "k caravans of n camels. Temur splits a caravan into two contiguous parts; Saodat sends one caravan away. Temur minimises, Saodat maximises the remaining value. Find the result.",
  "subtasks": [
   [
    "2 (k = 1)",
    "18",
    "The answer is the max element."
   ],
   [
    "3 (equal values per caravan)",
    "22",
    "Same rule."
   ],
   [
    "4 (k·n ≤ 12)",
    "25",
    "Brute force minimax over game states."
   ],
   [
    "5",
    "35",
    "Sum of the k largest loads."
   ]
  ],
  "steps": [
   "After each Temur + Saodat round there are again exactly k caravans. The game ends when all are single camels, so exactly k camels remain.",
   "A brute force over all game states (3000 random small tests) shows the result always equals the sum of the k largest values.",
   "Intuition: Saodat can always keep the most valuable camels alive by sending away caravans without them.",
   "Sort descending and add the first k: O(kn log kn)."
  ],
  "py": "import sys\ndata = sys.stdin.buffer.read().split()\nk, n = int(data[0]), int(data[1])\na = sorted(map(int, data[2:2 + k * n]), reverse=True)\nprint(sum(a[:k]))                   # the k biggest loads survive\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int k, n; cin >> k >> n;\n    vector<long long> a(k * n);\n    for (auto& x : a) cin >> x;\n    sort(a.rbegin(), a.rend());              // biggest first\n    long long s = 0;\n    for (int i = 0; i < k; i++) s += a[i];\n    cout << s << \"\\n\";\n}\n"
 },
 {
  "id": "O11C",
  "grade": "11th",
  "letter": "C",
  "title": "Rostgo'ylar va yolg'onchilar (truth-tellers)",
  "rating": 1700,
  "lessons": [
   "a1",
   "p4"
  ],
  "story": "n people answered m statements with +, − or ? (missing). Truth-tellers answer correctly, liars always wrongly. Can some assignment explain the whole table? Print YES/NO.",
  "subtasks": [
   [
    "2 (n = 1)",
    "5",
    "Always YES."
   ],
   [
    "3 (n, m ≤ 10)",
    "12",
    "Try all 2ⁿ choices of who lies, then check that each statement is consistent."
   ],
   [
    "4 (n ≤ 15)",
    "13",
    "Same with bitmasks: 2¹⁵ · n · m."
   ],
   [
    "5–7",
    "10 + 15 + 45",
    "DSU with parity (or BFS 2-colouring)."
   ]
  ],
  "steps": [
   "Let t_p = 1 if person p is truthful and v_s = 1 if statement s is true.",
   "\"+\" means t_p = v_s (same), and \"−\" means t_p ≠ v_s (different).",
   "That is a graph with n + m nodes and parity edges. It's consistent iff no cycle has an odd number of \"different\" edges.",
   "DSU storing each node's parity to its leader: when two nodes are already joined, check the parity matches."
  ],
  "py": "import sys\ndef main():\n    data = sys.stdin.buffer.read().split()\n    n, m = int(data[0]), int(data[1])\n    rows = data[2:2 + n]\n    # nodes 0..n-1 = people, n..n+m-1 = statements\n    parent = list(range(n + m))\n    par = [0] * (n + m)            # parity of a node relative to its parent\n    def find(x):\n        path = []\n        while parent[x] != x:\n            path.append(x); x = parent[x]\n        root = x\n        # compress the path, fixing parities from the top down\n        for y in reversed(path):\n            p = parent[y]\n            if p != root:\n                par[y] ^= par[p]\n            parent[y] = root\n        return root\n    for i in range(n):\n        row = rows[i]\n        for j in range(m):\n            c = row[j]\n            if c == 63:            # '?'\n                continue\n            d = 0 if c == 43 else 1   # '+' -> same, '-' -> different\n            u, v = i, n + j\n            ru, rv = find(u), find(v)\n            if ru == rv:\n                if par[u] ^ par[v] != d:\n                    print(\"NO\"); return\n            else:\n                parent[ru] = rv\n                par[ru] = par[u] ^ par[v] ^ d\n    print(\"YES\")\nmain()\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\nvector<int> parent, par;                    // par = parity to parent\nint find(int x) {\n    if (parent[x] == x) return x;\n    int root = find(parent[x]);\n    par[x] ^= par[parent[x]];               // parent[x] now points at root (after recursion)\n    parent[x] = root;\n    return root;\n}\nint main() {\n    int n, m; cin >> n >> m;\n    parent.resize(n + m); par.assign(n + m, 0);\n    iota(parent.begin(), parent.end(), 0);\n    for (int i = 0; i < n; i++) {\n        string row; cin >> row;\n        for (int j = 0; j < m; j++) {\n            if (row[j] == '?') continue;\n            int d = row[j] == '+' ? 0 : 1;   // '+' same, '-' different\n            int u = i, v = n + j;\n            int ru = find(u), rv = find(v);\n            if (ru == rv) {\n                if ((par[u] ^ par[v]) != d) { cout << \"NO\\n\"; return 0; }\n            } else {\n                parent[ru] = rv;\n                par[ru] = par[u] ^ par[v] ^ d;\n            }\n        }\n    }\n    cout << \"YES\\n\";\n}\n"
 },
 {
  "id": "O11D",
  "grade": "11th",
  "letter": "D",
  "title": "Tadqiqot bazalari (research stations)",
  "rating": 1900,
  "lessons": [
   "p4",
   "m3"
  ],
  "story": "N ≤ 10⁶ stations, each with ≤ 2 roads. Choose K stations maximising the smallest pairwise distance (or print infinity), and print the chosen stations.",
  "subtasks": [
   [
    "2 (N ≤ 15)",
    "8",
    "Try all subsets of size K with bitmasks and BFS distances."
   ],
   [
    "3 (K = 2)",
    "5",
    "Two ends of the longest path, or two components."
   ],
   [
    "4–6",
    "6 + 6 + 10",
    "Special shapes: isolated pairs, one cycle, several cycles."
   ],
   [
    "7–9",
    "15 + 20 + 30",
    "Components + binary search on d."
   ]
  ],
  "steps": [
   "Degree ≤ 2 means every component is a path or a cycle. Walk each one to get its vertices in order.",
   "If the number of components ≥ K, pick one vertex per component: the answer is infinity.",
   "Otherwise binary search d: a path of L vertices fits (L−1)//d + 1 stations, and a cycle of C fits max(1, C//d).",
   "Build the answer by taking every d-th vertex of each component until you have K.",
   "Python takes about 1.5 s at N = 10⁶ (limit 1 s), so use C++ for the last subtask (0.26 s)."
  ],
  "py": "import sys\ndef main():\n    data = sys.stdin.buffer.read().split()\n    N, M, K = int(data[0]), int(data[1]), int(data[2])\n    adj1 = [0] * (N + 1)            # first neighbour (0 = none)\n    adj2 = [0] * (N + 1)            # second neighbour\n    deg = [0] * (N + 1)\n    p = 3\n    for _ in range(M):\n        a = int(data[p]); b = int(data[p + 1]); p += 2\n        if deg[a] == 0: adj1[a] = b\n        else: adj2[a] = b\n        if deg[b] == 0: adj1[b] = a\n        else: adj2[b] = a\n        deg[a] += 1; deg[b] += 1\n\n    seen = bytearray(N + 1)\n    comps = []                      # (is_cycle, [vertices in order])\n    def walk(start):\n        order = [start]; seen[start] = 1\n        prev, cur = 0, start\n        while True:\n            nxt = adj1[cur] if adj1[cur] != prev else adj2[cur]\n            if deg[cur] == 1 and cur != start and nxt == prev:\n                nxt = 0\n            if nxt == 0 or seen[nxt]:\n                break\n            seen[nxt] = 1; order.append(nxt)\n            prev, cur = cur, nxt\n        return order\n    for v in range(1, N + 1):       # paths: start from an end (degree 0 or 1)\n        if not seen[v] and deg[v] <= 1:\n            comps.append((False, walk(v)))\n    for v in range(1, N + 1):       # whatever is left lies on cycles\n        if not seen[v]:\n            comps.append((True, walk(v)))\n\n    if len(comps) >= K:             # one station per component: never connected\n        print(\"infinity\")\n        print(\" \".join(str(c[1][0]) for c in comps[:K]))\n        return\n\n    def how_many(cyc, L, d):        # most stations in one component, all >= d apart\n        if cyc:\n            return max(1, L // d)\n        return (L - 1) // d + 1\n    def total(d):\n        return sum(how_many(c, len(o), d) for c, o in comps)\n\n    lo, hi = 1, N                   # largest d with total(d) >= K\n    while lo < hi:\n        mid = (lo + hi + 1) // 2\n        if total(mid) >= K: lo = mid\n        else: hi = mid - 1\n    d = lo\n    chosen = []\n    for c, o in comps:\n        cnt = how_many(c, len(o), d)\n        chosen.extend(o[i * d] for i in range(cnt))\n        if len(chosen) >= K: break\n    print(d)\n    print(\" \".join(map(str, chosen[:K])))\nmain()\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int N, M, K;\n    cin >> N >> M >> K;\n    vector<int> a1(N + 1, 0), a2(N + 1, 0), deg(N + 1, 0);\n    for (int i = 0; i < M; i++) {\n        int a, b; cin >> a >> b;\n        (deg[a] == 0 ? a1[a] : a2[a]) = b;\n        (deg[b] == 0 ? a1[b] : a2[b]) = a;\n        deg[a]++; deg[b]++;\n    }\n    vector<char> seen(N + 1, 0);\n    vector<vector<int>> comp;        // vertices of each component, in walking order\n    vector<char> isCycle;\n    auto walk = [&](int s) {\n        vector<int> order = {s}; seen[s] = 1;\n        int prev = 0, cur = s;\n        while (true) {\n            int nxt = (a1[cur] != prev) ? a1[cur] : a2[cur];\n            if (nxt == 0 || seen[nxt]) break;\n            seen[nxt] = 1; order.push_back(nxt);\n            prev = cur; cur = nxt;\n        }\n        return order;\n    };\n    for (int v = 1; v <= N; v++)\n        if (!seen[v] && deg[v] <= 1) { comp.push_back(walk(v)); isCycle.push_back(0); }\n    for (int v = 1; v <= N; v++)\n        if (!seen[v]) { comp.push_back(walk(v)); isCycle.push_back(1); }\n\n    int C = comp.size();\n    if (C >= K) {\n        cout << \"infinity\\n\";\n        for (int i = 0; i < K; i++) cout << comp[i][0] << \" \\n\"[i == K - 1];\n        return 0;\n    }\n    auto howMany = [&](int i, int d) -> long long {\n        long long L = comp[i].size();\n        if (isCycle[i]) return max(1LL, L / d);\n        return (L - 1) / d + 1;\n    };\n    auto total = [&](int d) {\n        long long s = 0;\n        for (int i = 0; i < C; i++) s += howMany(i, d);\n        return s;\n    };\n    int lo = 1, hi = N;              // largest d with total(d) >= K\n    while (lo < hi) {\n        int mid = lo + (hi - lo + 1) / 2;\n        if (total(mid) >= K) lo = mid; else hi = mid - 1;\n    }\n    int d = lo;\n    vector<int> chosen;\n    for (int i = 0; i < C && (int)chosen.size() < K; i++) {\n        long long cnt = howMany(i, d);\n        for (long long j = 0; j < cnt && (int)chosen.size() < K; j++)\n            chosen.push_back(comp[i][j * d]);\n    }\n    cout << d << \"\\n\";\n    for (int i = 0; i < K; i++) cout << chosen[i] << \" \\n\"[i == K - 1];\n}\n"
 },
 {
  "id": "O11E",
  "grade": "11th",
  "letter": "E",
  "title": "Jamoalar bellashuvi (teams)",
  "rating": 2200,
  "lessons": [
   "p3",
   "p5",
   "r1"
  ],
  "story": "Split N students in a row into exactly K contiguous teams. A team's strength = max + min of its levels. Maximise the total.",
  "subtasks": [
   [
    "1 (K ≤ 2)",
    "10",
    "K = 1: max + min. K = 2: try every cut with prefix/suffix max and min."
   ],
   [
    "2 (monotone)",
    "12",
    "Sorted: the K−1 largest go alone (2·value each), the rest form one team."
   ],
   [
    "3, 4",
    "22 + 16",
    "DP over (teams, prefix) in O(K·N²), in C++."
   ],
   [
    "5",
    "40",
    "DP + lazy segment tree + monotonic stacks: O(K·N log N)."
   ]
  ],
  "steps": [
   "dp_j[i] = best for the first i students in j teams = max over l of dp_{j−1}[l−1] + max(a[l..i]) + min(a[l..i]).",
   "Keep a segment tree over l with exactly that value for the current i.",
   "When a[i] arrives, the blocks popped from a decreasing stack get their max raised by (a[i] − old max): a range add. The same with an increasing stack for the min.",
   "dp_j[i] = the tree max over l in [1, i]. Do this K times: about 0.7 s in C++."
  ],
  "py": "import sys\ndef main():\n    data = sys.stdin.buffer.read().split()\n    n, K = int(data[0]), int(data[1])\n    a = list(map(int, data[2:2 + n]))\n    if K == 1:                                  # subtask 1, one team\n        print(max(a) + min(a)); return\n    if K == 2:                                  # subtask 1, try every cut\n        pmax, pmin = [0] * n, [0] * n\n        pmax[0] = pmin[0] = a[0]\n        for i in range(1, n):\n            pmax[i] = max(pmax[i - 1], a[i]); pmin[i] = min(pmin[i - 1], a[i])\n        best = 0; smax = smin = a[-1]\n        for i in range(n - 1, 0, -1):           # right team = a[i..n-1]\n            smax = max(smax, a[i]); smin = min(smin, a[i])\n            best = max(best, pmax[i - 1] + pmin[i - 1] + smax + smin)\n        print(best); return\n    if all(a[i] <= a[i + 1] for i in range(n - 1)) or all(a[i] >= a[i + 1] for i in range(n - 1)):\n        b = sorted(a)                           # subtask 2: K-1 biggest alone, rest together\n        print(b[0] + b[n - K] + 2 * sum(b[n - K + 1:])); return\n    print(\"not handled\")\nmain()\n",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\nconst ll NEG = LLONG_MIN / 4;\n\nint n, K;\nvector<ll> mx, lz;              // segment tree: range add, range max\n\nvoid build(int node, int l, int r, const vector<ll>& base) {\n    lz[node] = 0;\n    if (l == r) { mx[node] = base[l]; return; }\n    int m = (l + r) / 2;\n    build(2 * node, l, m, base); build(2 * node + 1, m + 1, r, base);\n    mx[node] = max(mx[2 * node], mx[2 * node + 1]);\n}\nvoid add(int node, int l, int r, int ql, int qr, ll v) {\n    if (qr < l || r < ql) return;\n    if (ql <= l && r <= qr) { mx[node] += v; lz[node] += v; return; }\n    int m = (l + r) / 2;\n    add(2 * node, l, m, ql, qr, v); add(2 * node + 1, m + 1, r, ql, qr, v);\n    mx[node] = max(mx[2 * node], mx[2 * node + 1]) + lz[node];\n}\nll query(int node, int l, int r, int ql, int qr) {\n    if (qr < l || r < ql) return NEG;\n    if (ql <= l && r <= qr) return mx[node];\n    int m = (l + r) / 2;\n    return max(query(2 * node, l, m, ql, qr), query(2 * node + 1, m + 1, r, ql, qr)) + lz[node];\n}\n\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    cin >> n >> K;\n    vector<ll> a(n + 1);\n    for (int i = 1; i <= n; i++) cin >> a[i];\n    mx.assign(4 * n + 4, 0); lz.assign(4 * n + 4, 0);\n\n    vector<ll> prev(n + 1, NEG), cur(n + 1, NEG);\n    prev[0] = 0;                               // 0 teams cover 0 students\n    for (int j = 1; j <= K; j++) {\n        // position l (1..n) means \"the last team starts at l\"; value = prev[l-1] + max + min\n        vector<ll> base(n + 1);\n        for (int l = 1; l <= n; l++) base[l] = prev[l - 1];\n        build(1, 1, n, base);\n        vector<int> smax, smin;                // monotonic stacks of indices\n        fill(cur.begin(), cur.end(), NEG);\n        for (int i = 1; i <= n; i++) {\n            add(1, 1, n, i, i, 2 * a[i]);      // team [i..i]: max = min = a[i]\n            while (!smax.empty() && a[smax.back()] <= a[i]) {\n                int t = smax.back(); smax.pop_back();\n                int from = smax.empty() ? 1 : smax.back() + 1;\n                add(1, 1, n, from, t, a[i] - a[t]);   // their max grows to a[i]\n            }\n            smax.push_back(i);\n            while (!smin.empty() && a[smin.back()] >= a[i]) {\n                int t = smin.back(); smin.pop_back();\n                int from = smin.empty() ? 1 : smin.back() + 1;\n                add(1, 1, n, from, t, a[i] - a[t]);   // their min drops to a[i]\n            }\n            smin.push_back(i);\n            ll best = query(1, 1, n, 1, i);\n            cur[i] = best < NEG / 2 ? NEG : best;\n        }\n        prev = cur;\n    }\n    cout << prev[n] << \"\\n\";\n}\n"
 }
];
