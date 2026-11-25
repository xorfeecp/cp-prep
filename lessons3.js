/* Lessons part 3: Advanced, Pro, C++ track */
window.LESSONS.push(

/* ───────────── ADVANCED ───────────── */
{id:'a1', level:'advanced', title:'DSU (union–find), with parity', mins:60,
goal:'Merge groups and ask "same group?" almost instantly; handle "same/different" constraints.',
body:`
<p><b>DSU</b> keeps groups. <code>find(x)</code> gives the group's leader and <code>union(a, b)</code> merges two groups. With path compression it's nearly O(1) per operation.</p>
<h3>DSU with parity (11th grade C)</h3>
<p>Each person is truthful or a liar, and each statement is true or false. Answer '+' means "person and statement have the <b>same</b> value", and '−' means "<b>different</b>". So each answer is an edge with parity 0 (same) or 1 (different). Store for every node its parity relative to its leader. When joining two nodes already in one group, check the parities agree. If not, the table has an error, so print NO.</p>
<p>The same idea is a graph 2-colouring (BFS), but DSU is shorter.</p>`,
code:[{t:'DSU with sizes',py:String.raw`parent = list(range(n + 1)); size = [1] * (n + 1)
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]   # path halving
        x = parent[x]
    return x
def union(a, b):
    a, b = find(a), find(b)
    if a == b: return False
    if size[a] < size[b]: a, b = b, a
    parent[b] = a; size[a] += size[b]
    return True`},
{t:'11th grade C: DSU with parity (100 points)',py:String.raw`import sys
def main():
    data = sys.stdin.buffer.read().split()
    n, m = int(data[0]), int(data[1])
    rows = data[2:2 + n]
    parent = list(range(n + m)); par = [0] * (n + m)
    def find(x):
        path = []
        while parent[x] != x:
            path.append(x); x = parent[x]
        for y in reversed(path):          # compress, fixing parities
            p = parent[y]
            if p != x: par[y] ^= par[p]
            parent[y] = x
        return x
    for i in range(n):
        for j in range(m):
            c = rows[i][j]
            if c == 63: continue          # '?'
            d = 0 if c == 43 else 1       # '+' same, '-' different
            u, v = i, n + j
            ru, rv = find(u), find(v)
            if ru == rv:
                if par[u] ^ par[v] != d:
                    print("NO"); return
            else:
                parent[ru] = rv
                par[ru] = par[u] ^ par[v] ^ d
    print("YES")
main()`}],
signals:['"connected", "same group", "same/different" rules'],
mistakes:['Forgetting to use find() before comparing leaders'],
practice:['1167C','O11C']},

{id:'a2', level:'advanced', title:'Bitmasks: trying all subsets', mins:45,
goal:'Use binary numbers to represent subsets (n ≤ 20).',
body:`
<p>A number from 0 to 2ⁿ − 1 can represent a subset: bit i is 1 if item i is chosen.</p>
<ul><li><code>mask &gt;&gt; i &amp; 1</code>: is item i chosen?</li><li><code>mask | (1 &lt;&lt; i)</code>: add item i.</li><li><code>bin(mask).count('1')</code>: subset size.</li></ul>
<p>Perfect for subtasks like "n ≤ 15" (11th D subtask 2: try all sets of stations). 2¹⁵ = 32768 subsets is fine, and 2²⁰ ≈ 10⁶ is OK in Python if the inner work is small.</p>`,
code:[{t:'All subsets',py:String.raw`best = 0
for mask in range(1 << n):
    total = 0
    for i in range(n):
        if mask >> i & 1:
            total += a[i]
    if total <= W:
        best = max(best, total)`}],
signals:['n ≤ 15–20','"choose some of…"'],
mistakes:['Using it for n = 40 (2⁴⁰ is too many)'],
practice:['O11D']},

{id:'a3', level:'advanced', title:'Modular arithmetic and counting', mins:55,
goal:'Handle "print the answer modulo 10⁹+7" and count combinations.',
body:`
<ul><li>(a + b) mod M and (a · b) mod M can be reduced at every step.</li>
<li><code>pow(a, b, M)</code> computes aᵇ mod M fast (O(log b)).</li>
<li>Division mod a prime M: multiply by <code>pow(x, M − 2, M)</code> (Fermat).</li>
<li>nCr mod M: precompute factorials and inverse factorials.</li></ul>`,
code:[{t:'Factorials and nCr mod p',py:String.raw`MOD = 10**9 + 7
N = 2 * 10**5 + 5
fact = [1] * N
for i in range(1, N): fact[i] = fact[i - 1] * i % MOD
inv = [1] * N
inv[N - 1] = pow(fact[N - 1], MOD - 2, MOD)
for i in range(N - 1, 0, -1): inv[i - 1] = inv[i] * i % MOD
def C(n, r):
    if r < 0 or r > n: return 0
    return fact[n] * inv[r] % MOD * inv[n - r] % MOD`}],
signals:['"modulo 10⁹+7"','"number of ways"'],
mistakes:['Forgetting % MOD after a multiplication (C++ overflow!)'],
practice:[]},

{id:'a4', level:'advanced', title:'Events and sweep over time', mins:60,
goal:'Handle huge time ranges by jumping between moments when something changes.',
body:`
<p>If time goes up to 10⁹ but only q things happen, the state is <b>constant between events</b>. Sort the events by time, and for each gap add (length of gap) × (value of the current state).</p>
<h3>10th grade E (football table)</h3>
<p>Matches last m ≤ 10⁹ minutes, but there are at most 2·10⁵ goal records. Between two goal minutes the table doesn't change, so:</p>
<ol><li>Group goals by minute, and sort the minutes.</li>
<li>For the gap before each goal minute, add gap × (Arsenal first?) + gap × (Tottenham in last k?).</li>
<li>Apply the goals: the scoring team and its opponent change points/goals.</li></ol>
<p>Bob's happiness is always 2m − Alice's, because every minute exactly 2 points are shared out.</p>
<p>The remaining question, "what is a team's place right now?", is answered quickly with a Fenwick tree (next lesson). For subtask n, q ≤ 2000, just count the better teams in O(n) at each event.</p>`,
code:[{t:'Sweep skeleton',py:String.raw`events = {}                       # minute -> list of changes
for (team, minute, goals) in records:
    events.setdefault(minute, []).append((team, goals))
total = 0
start = 1
for t in sorted(events):
    total += (t - start) * value_of_current_state()
    for team, goals in events[t]:
        apply(team, goals)
    start = t
total += (m - start + 1) * value_of_current_state()`}],
signals:['time up to 10⁹ with few changes','"at each minute…"'],
mistakes:['Looping over every minute when m = 10⁹','Off-by-one at the gap borders (does minute t include the goal at t?)'],
practice:['O10E','816B']},

{id:'a5', level:'advanced', title:'Fenwick tree (BIT): counting below a value', mins:60,
goal:'Add/remove values and ask "how many are smaller than x?" in O(log n).',
body:`
<p>A Fenwick tree stores counts at positions 1..N and answers prefix sums in O(log N) with O(log N) updates.</p>
<p><b>Ranking trick (10th E):</b> turn each team's table state into one comparable key (more points, then better difference, then more goals, then smaller name = smaller key). Collect every key that will ever exist, sort them, and give each a position. Then a team's place = 1 + (number of teams with a smaller key) = 1 + <code>count(pos − 1)</code>. When a team's score changes: remove the old key, add the new one.</p>`,
code:[{t:'Fenwick tree',py:String.raw`class BIT:
    def __init__(self, n):
        self.n = n; self.t = [0] * (n + 1)
    def add(self, i, d):            # position i (1-based) += d
        while i <= self.n:
            self.t[i] += d; i += i & -i
    def count(self, i):             # sum of positions 1..i
        r = 0
        while i > 0:
            r += self.t[i]; i -= i & -i
        return r`}],
signals:['"rank", "how many smaller", values changing over time','inversions'],
mistakes:['Using index 0 (BIT is 1-based)','Not compressing huge values to positions first'],
practice:['O10E','1354D']},

{id:'a6', level:'advanced', title:'Shortest paths: Dijkstra', mins:55,
goal:'Find shortest distances when edges have weights.',
body:`
<p>BFS works when all edges have length 1. With weights ≥ 0, use <b>Dijkstra</b>: always expand the closest unfinished vertex, using a heap.</p>`,
code:[{t:'Dijkstra with heapq',py:String.raw`import heapq
def dijkstra(g, s, n):            # g[v] = list of (to, weight)
    INF = float('inf')
    dist = [INF] * (n + 1); dist[s] = 0
    h = [(0, s)]
    while h:
        d, v = heapq.heappop(h)
        if d > dist[v]: continue  # old entry
        for w, c in g[v]:
            if d + c < dist[w]:
                dist[w] = d + c
                heapq.heappush(h, (dist[w], w))
    return dist`}],
signals:['roads with lengths/costs, "minimum cost path"'],
mistakes:['Negative weights (Dijkstra fails)','Not skipping old heap entries (slow)'],
practice:['20C']},

/* ───────────── PRO ───────────── */
{id:'r1', level:'pro', title:'Segment tree with lazy range-add', mins:80,
goal:'Range add + range max in O(log n): the tool behind 11th grade E.',
body:`
<p>A segment tree splits the array into halves recursively. Each node stores the max of its range. A <b>lazy</b> value stores "add v to my whole range", so a range update costs O(log n).</p>
<h3>11th grade E (teams)</h3>
<p>dp_j[i] = max over l of (dp_{j−1}[l−1] + max(a[l..i]) + min(a[l..i])). Keep a segment tree over l holding exactly that value for the current i. When i grows by one, a[i] changes the max for some block of l's: those are exactly the elements popped from a <b>decreasing monotonic stack</b>, and each popped block gets +(a[i] − old max). The same with an increasing stack for the min. Then dp_j[i] = the tree max over l ∈ [1, i]. Total O(K · n log n). In practice this needs <b>C++</b> (see the Olympiad section for tested code).</p>`,
code:[{t:'Lazy segment tree (C++), range add + range max',cpp:String.raw`vector<long long> mx, lz;            // size 4n
void add(int node, int l, int r, int ql, int qr, long long v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { mx[node] += v; lz[node] += v; return; }
    int m = (l + r) / 2;
    add(2*node, l, m, ql, qr, v); add(2*node+1, m+1, r, ql, qr, v);
    mx[node] = max(mx[2*node], mx[2*node+1]) + lz[node];
}
long long query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return LLONG_MIN / 4;
    if (ql <= l && r <= qr) return mx[node];
    int m = (l + r) / 2;
    return max(query(2*node, l, m, ql, qr), query(2*node+1, m+1, r, ql, qr)) + lz[node];
}`}],
signals:['many range updates + range questions'],
mistakes:['Tree size 2n instead of 4n','Forgetting the lazy value when combining children'],
practice:['O11E','1354D']},

{id:'r2', level:'pro', title:'Game theory basics', mins:50,
goal:'Solve two-player games: winning/losing positions and "count what survives".',
body:`
<ul><li><b>Win/lose positions:</b> a position is winning if some move leads to a losing position for the opponent. Compute it for small sizes with brute force, then look for a pattern (take 1–3 stones: you lose iff n % 4 == 0).</li>
<li><b>Minimax:</b> one player minimises, the other maximises. Brute force with recursion and memoization on tiny inputs to discover the rule.</li>
<li><b>Count invariants:</b> in the caravan game (11th B) the number of caravans returns to k after every round, so k single camels remain at the end, and Saodat can always keep the k most valuable.</li></ul>`,
code:[{t:'Brute force for a game (discover the pattern)',py:String.raw`from functools import lru_cache
@lru_cache(maxsize=None)
def win(n):                      # player to move wins?
    return any(not win(n - t) for t in (1, 2, 3) if t <= n)
print([n for n in range(1, 30) if not win(n)])   # 4, 8, 12, ...`}],
signals:['"both play optimally"'],
mistakes:['Trying to "simulate a smart player" instead of brute-forcing the small cases'],
practice:['O11B']},

{id:'r3', level:'pro', title:'Speed: Python vs C++, PyPy, and when to switch', mins:30,
goal:'Know when Python is enough and when you need C++.',
body:`
<ul><li>Python: about 10⁷ simple operations per second. C++: about 10⁸–10⁹.</li>
<li>Olympiad limits like n = 10⁶ with 1 second (11th D) or O(K·n log n) = 3·10⁷ with segment trees (11th E) are <b>too slow in Python</b> and easy in C++.</li>
<li>If the judge offers <b>PyPy</b>, it's often 5–10× faster than CPython for loops. Try it for loop-heavy code.</li>
<li>Python tricks: put the code in <code>main()</code>, read with <code>sys.stdin.buffer</code>, avoid recursion, use local variables, print once.</li></ul>
<p><b>Plan for you:</b> keep thinking in Python (it's faster to write), but learn enough C++ (the C++ track) to <b>translate</b> a solution when the limits are big.</p>`,
code:[],signals:['n ≥ 10⁶, or O(n log n) with heavy constants'],mistakes:['Switching languages in the middle of a contest without practice'],
practice:['O11D','O11E']},

/* ───────────── C++ TRACK ───────────── */
{id:'c1', level:'cpp', title:'C++ 1: setup, compile and your first program', mins:40,
goal:'Write, compile and run a C++ program.',
body:`
<p><b>Install:</b> on Windows, install <b>Code::Blocks with MinGW</b> or <b>VS Code + MinGW-w64</b>. The olympiad PC usually has Code::Blocks or a similar IDE, so check it as soon as you sit down.</p>
<p><b>Compile in a terminal:</b> <code>g++ -O2 -std=c++17 sol.cpp -o sol</code>, then run with <code>./sol</code> (Windows: <code>sol.exe</code>).</p>
<p>A C++ program starts in <code>main()</code>. Every statement ends with <code>;</code>. Blocks use <code>{ }</code> instead of indentation. Every variable has a <b>type</b>.</p>`,
code:[{t:'Hello + sum of two numbers',cpp:String.raw`#include <bits/stdc++.h>      // includes everything you need
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;              // read (spaces or new lines don't matter)
    cout << a + b << "\n";      // print
    return 0;
}`,py:String.raw`a, b = map(int, input().split())
print(a + b)`}],
signals:[],mistakes:['Missing ;','Using endl in big loops (slow): use "\\n"'],
practice:['4A','50A']},

{id:'c2', level:'cpp', title:'C++ 2: types and overflow (very important)', mins:35,
goal:'Never lose points to overflow.',
body:`
<table class="t"><tr><th>Type</th><th>Range</th><th>Use for</th></tr>
<tr><td><code>int</code></td><td>about ±2.1·10⁹</td><td>counts, indices, values ≤ 10⁹</td></tr>
<tr><td><code>long long</code></td><td>about ±9.2·10¹⁸</td><td>sums, products, anything that can pass 2·10⁹</td></tr>
<tr><td><code>double</code></td><td>decimals (~15 digits)</td><td>geometry only; avoid for exact answers</td></tr>
<tr><td><code>char</code>, <code>string</code>, <code>bool</code></td><td></td><td>text and flags</td></tr></table>
<p><b>Rule:</b> if a value or a sum can pass 2·10⁹, use <code>long long</code>. 10th B's answer reaches 10¹¹, and 11th A's input is 10¹⁸. The statement even warns about "32-bit".</p>
<p>Danger: <code>int a = 100000; long long x = a * a;</code> overflows, because the multiplication happens in int <b>before</b> converting. Write <code>1LL * a * a</code>.</p>
<p>Integer division: <code>7 / 2 == 3</code> (like Python's //, but for negatives C++ rounds toward 0: <code>-7 / 2 == -3</code>).</p>`,
code:[],signals:['sums of many numbers, products, 10¹⁸ inputs'],mistakes:['int for sums','a*a with int a'],practice:['O11A','O10B']},

{id:'c3', level:'cpp', title:'C++ 3: Python → C++ translation table', mins:45,
goal:'Translate your Python solutions line by line.',
body:`
<table class="t"><tr><th>Python</th><th>C++</th></tr>
<tr><td><code>n = int(input())</code></td><td><code>int n; cin &gt;&gt; n;</code></td></tr>
<tr><td><code>a = list(map(int, input().split()))</code></td><td><code>vector&lt;long long&gt; a(n); for (auto &amp;x : a) cin &gt;&gt; x;</code></td></tr>
<tr><td><code>for i in range(n):</code></td><td><code>for (int i = 0; i &lt; n; i++) {</code></td></tr>
<tr><td><code>for x in a:</code></td><td><code>for (auto x : a) {</code></td></tr>
<tr><td><code>while lo &lt; hi:</code></td><td><code>while (lo &lt; hi) {</code></td></tr>
<tr><td><code>if a and b or not c:</code></td><td><code>if ((a &amp;&amp; b) || !c) {</code></td></tr>
<tr><td><code>x // y</code>, <code>x % y</code></td><td><code>x / y</code>, <code>x % y</code> (ints)</td></tr>
<tr><td><code>a.append(x)</code>, <code>len(a)</code></td><td><code>a.push_back(x)</code>, <code>a.size()</code></td></tr>
<tr><td><code>a.sort()</code>, <code>a.sort(reverse=True)</code></td><td><code>sort(a.begin(), a.end())</code>, <code>sort(a.rbegin(), a.rend())</code></td></tr>
<tr><td><code>bisect_left(a, x)</code></td><td><code>lower_bound(a.begin(), a.end(), x) - a.begin()</code></td></tr>
<tr><td><code>bisect_right(a, x)</code></td><td><code>upper_bound(a.begin(), a.end(), x) - a.begin()</code></td></tr>
<tr><td><code>d = {}</code>, <code>d.get(k, 0)</code></td><td><code>map&lt;long long,int&gt; d;</code>, <code>d[k]</code> (0 if missing)</td></tr>
<tr><td><code>s = set()</code>, <code>x in s</code></td><td><code>set&lt;int&gt; s;</code>, <code>s.count(x)</code></td></tr>
<tr><td><code>deque</code></td><td><code>deque&lt;int&gt;</code>, <code>push_back / pop_front</code></td></tr>
<tr><td><code>heapq</code> (min-heap)</td><td><code>priority_queue&lt;long long, vector&lt;long long&gt;, greater&lt;long long&gt;&gt;</code></td></tr>
<tr><td><code>print(*a)</code></td><td><code>for (auto x : a) cout &lt;&lt; x &lt;&lt; ' '; cout &lt;&lt; "\n";</code></td></tr>
<tr><td><code>def f(x): return x*2</code></td><td><code>long long f(long long x) { return x * 2; }</code></td></tr></table>`,
code:[{t:'Same solution in both languages (10th C, lifts)',py:String.raw`from bisect import bisect_left
n = int(input())
f = list(map(int, input().split()))
last, ans = [], []
for x in f:
    j = bisect_left(last, x)
    if j == len(last): last.append(x)
    else: last[j] = x
    ans.append(j + 1)
print(len(last))
print(*ans)`,cpp:String.raw`#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<long long> last;
    vector<int> ans(n);
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        int j = lower_bound(last.begin(), last.end(), x) - last.begin();
        if (j == (int)last.size()) last.push_back(x);
        else last[j] = x;
        ans[i] = j + 1;
    }
    cout << last.size() << "\n";
    for (int i = 0; i < n; i++) cout << ans[i] << " \n"[i == n - 1];
}`}],
signals:[],mistakes:['Comparing int with a.size() (unsigned): cast with (int)a.size()'],practice:['O10C']},

{id:'c4', level:'cpp', title:'C++ 4: functions, recursion and the contest template', mins:40,
goal:'Write functions in C++ and use a template for every problem.',
body:`
<ul><li>A function declares its return type and parameter types: <code>long long gcd(long long a, long long b)</code>.</li>
<li>Pass big vectors <b>by reference</b> (<code>vector&lt;int&gt;&amp; a</code>) so they aren't copied, which is slow.</li>
<li>Recursion depth in C++ is fine up to ~10⁵–10⁶ (much more than Python).</li>
<li><code>ios::sync_with_stdio(false); cin.tie(nullptr);</code> makes cin/cout fast. Always add it.</li>
<li>Use <code>"\n"</code>, not <code>endl</code>.</li></ul>`,
code:[{t:'Contest template',cpp:String.raw`#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll solve(int n, vector<ll>& a) {        // & = no copy
    ll best = 0;
    for (ll x : a) best = max(best, x);
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<ll> a(n);
    for (auto& x : a) cin >> x;
    cout << solve(n, a) << "\n";
    return 0;
}`}],
signals:[],mistakes:['Passing a vector by value inside recursion (copies every call)'],practice:['O11B']},

{id:'c5', level:'cpp', title:'C++ 5: STL toolbox and common errors', mins:45,
goal:'Use the standard containers confidently and avoid classic bugs.',
body:`
<ul><li><code>vector&lt;T&gt; v(n, init)</code>, <code>v.back()</code>, <code>v.pop_back()</code>, <code>v.empty()</code>.</li>
<li><code>sort</code>, <code>reverse</code>, <code>unique</code> (after sort: removes duplicates), <code>*max_element</code>, <code>accumulate(v.begin(), v.end(), 0LL)</code>. Note the 0LL so the sum is long long!</li>
<li><code>pair&lt;int,int&gt;</code> and <code>tuple</code> compare item by item, like Python tuples.</li>
<li><code>map</code>/<code>set</code> are sorted (O(log n)). <code>unordered_map</code> is faster on average.</li></ul>
<h3>Classic errors</h3>
<ul><li>Reading outside a vector: no error message, just wrong results or a crash. Check your indices.</li>
<li>An uninitialized variable has a random value: always write <code>int s = 0;</code>.</li>
<li><code>accumulate(..., 0)</code> sums in int and overflows.</li>
<li>Using <code>==</code> on doubles.</li></ul>`,
code:[{t:'STL snippets',cpp:String.raw`vector<int> v = {5, 1, 4, 1};
sort(v.begin(), v.end());                       // 1 1 4 5
v.erase(unique(v.begin(), v.end()), v.end());   // 1 4 5
long long s = accumulate(v.begin(), v.end(), 0LL);
map<string, int> cnt; cnt["ali"]++;             // counting
set<int> st = {3, 1, 2}; bool has = st.count(2);
priority_queue<int> pq; pq.push(3); int top = pq.top();   // max-heap`}],
signals:[],mistakes:['accumulate with 0 instead of 0LL','unsigned size() - 1 when empty (huge number)'],practice:['O10E']}
);
