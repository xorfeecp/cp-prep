/* Lessons part 2: Medium, Pre-advanced */
window.LESSONS.push(

/* ───────────── MEDIUM ───────────── */
{id:'m1', level:'medium', title:'Two pointers and sliding window', mins:50,
goal:'Solve "best contiguous segment" problems in O(n).',
body:`
<p>Keep two indices <code>l</code> and <code>r</code>. Move <code>r</code> forward to grow the window, and move <code>l</code> forward when the window breaks a rule. Each pointer moves at most n times, so the total is O(n).</p>
<p>It works when <b>making the window bigger can only make it "worse"</b> (for example, the sum only grows when all numbers are positive).</p>
<h3>Fixed-size window</h3><p>For "best sum of k consecutive", when the window moves one step, one number enters and one leaves: <code>cur += a[i] − a[i−k]</code>.</p>`,
code:[{t:'Longest segment with sum ≤ t (Books, 279B)',py:String.raw`n, t = map(int, input().split())
a = list(map(int, input().split()))
best = 0
s = 0
l = 0
for r in range(n):
    s += a[r]                 # grow the window to the right
    while s > t:              # too big: shrink from the left
        s -= a[l]
        l += 1
    best = max(best, r - l + 1)
print(best)`}],
signals:['"contiguous", "subarray", "longest/shortest segment with…"','all numbers positive'],
mistakes:['Using two pointers when numbers can be negative (the window property breaks)'],
practice:['279B','6C','1324D']},

{id:'m2', level:'medium', title:'Binary search and bisect', mins:50,
goal:'Search a sorted list in O(log n) and count with bisect.',
body:`
<p>In a <b>sorted</b> list, look at the middle element, decide which half the answer is in, and throw the other half away. About 20 steps for 10⁶ elements.</p>
<table class="t"><tr><th>Call</th><th>Meaning</th></tr>
<tr><td><code>bisect_left(a, x)</code></td><td>first index with a[i] ≥ x = how many are &lt; x</td></tr>
<tr><td><code>bisect_right(a, x)</code></td><td>first index with a[i] &gt; x = how many are ≤ x</td></tr>
<tr><td><code>bisect_right(a, R) − bisect_left(a, L)</code></td><td>how many are in [L, R]</td></tr></table>
<p><b>Always sort first</b>, otherwise bisect gives wrong answers without any error.</p>
<p>A list that <b>stays sorted while you change it</b> is also searchable: in the lifts problem the "last floors" list is always sorted, so <code>bisect_left</code> finds the right lift instantly.</p>`,
code:[{t:'Lifts problem (10th C) with bisect: 100 points',py:String.raw`from bisect import bisect_left
n = int(input())
f = list(map(int, input().split()))
last = []                          # stays sorted all the time
ans = []
for x in f:
    j = bisect_left(last, x)       # first lift whose last floor >= x
    if j == len(last):
        last.append(x)             # nothing fits: new lift
    else:
        last[j] = x
    ans.append(j + 1)
print(len(last))
print(*ans)`},
{t:'Counting with bisect',py:String.raw`from bisect import bisect_left, bisect_right
prices = sorted(prices)
for coins in days:
    print(bisect_right(prices, coins))     # shops you can afford`}],
signals:['sorted data + many questions','"how many are ≤ x"'],
mistakes:['Forgetting to sort','Using an index equal to len(a) (no such element)'],
practice:['706B','474B','1742E','O10C']},

{id:'m3', level:'medium', title:'Binary search on the answer', mins:60,
goal:'Find the best value by guessing it and checking each guess.',
body:`
<p>If checking "does value x work?" is easy, and the answers form <b>one switch</b> (F F F T T T, or T T T F F F), then binary search the switch.</p>
<h3>Recipe</h3><ol><li>Write <code>check(x)</code> returning True/False.</li>
<li>Make sure it's one switch: "if x works, does x+1 (or x−1) work too?"</li>
<li>Choose a safe range. Too big is fine (just a few more steps). Too small gives wrong answers.</li>
<li>Use the right template.</li></ol>
<h3>Examples you already know</h3>
<ul><li><b>k-th not divisible by 3 or 5:</b> check(x) = "at least k good numbers ≤ x" → smallest True.</li>
<li><b>11th A, chessboard:</b> side 2k needs 2k² of each colour → largest k with 2k² ≤ min(A, B). Searching on s directly fails because odd sides break the one-switch rule. Searching on k fixes it.</li>
<li><b>11th D, stations:</b> check(d) = "can I place K stations all ≥ d apart?" → largest True.</li></ul>`,
code:[{t:'The two templates',py:String.raw`# smallest x with check(x) True   (F F F T T T)
lo, hi = LOW, HIGH
while lo < hi:
    mid = (lo + hi) // 2
    if check(mid): hi = mid
    else: lo = mid + 1
print(lo)

# largest x with check(x) True    (T T T F F F)
lo, hi = LOW, HIGH
while lo < hi:
    mid = (lo + hi + 1) // 2        # round UP or it loops forever
    if check(mid): lo = mid
    else: hi = mid - 1
print(lo)`},
{t:'11th grade A: chessboard (100 points)',py:String.raw`A, B = map(int, input().split())
m = min(A, B)                     # only the smaller pile matters
lo, hi = 0, 10**18
while lo < hi:                    # largest k with 2*k*k <= m
    mid = (lo + hi + 1) // 2
    if 2 * mid * mid <= m: lo = mid
    else: hi = mid - 1
print(2 * lo)                     # side = 2k`}],
signals:['"maximum minimum", "minimum maximum", "the largest x such that"','answer up to 10⁹–10¹⁸'],
mistakes:['(lo+hi)//2 in the "largest" template: infinite loop','Range that doesn\'t contain the answer'],
practice:['1873E','1352C','1201C','1840D','O11A','O10K']},

{id:'m4', level:'medium', title:'Brute force → pattern, and stress testing', mins:45,
goal:'Find formulas from small cases and check your fast code automatically.',
body:`
<h3>Find the pattern</h3>
<p>When n is huge, write a slow brute force, print the answers for n = 1…20, and look. Common patterns: powers of 2, n(n+1)/2, Fibonacci, periodic (n % 4), "sum of the k biggest" (that's how the 11th B game was cracked: a brute force over all game moves showed the answer is always the sum of the k largest loads).</p>
<h3>Stress testing</h3>
<p>Run your fast solution and a brute force on thousands of <b>small random</b> inputs. If they ever disagree, print the input: that's your bug.</p>`,
code:[{t:'Stress test template',py:String.raw`import random

def brute(a):
    ...                       # slow but surely correct

def fast(a):
    ...                       # your real solution

for it in range(5000):
    n = random.randint(1, 7)
    a = [random.randint(0, 5) for _ in range(n)]
    if brute(a) != fast(a):
        print("BUG:", a, brute(a), fast(a))
        break
else:
    print("all good")`}],
signals:['huge n with a strange rule','a greedy you are not sure about'],
mistakes:['Random tests that are too big to debug','Only testing the examples'],
practice:['O11B','O10D']},

{id:'m5', level:'medium', title:'Parity, invariants and "what can never change"', mins:40,
goal:'Prove impossibility or find answers by looking at what stays the same.',
body:`
<p>An <b>invariant</b> is something that never changes during the process. Parity (even/odd) is the most common.</p>
<ul><li><b>Chessboard (11th A):</b> an odd × odd board always has one extra cell of one colour, so s must be even.</li>
<li><b>Games:</b> count how the number of "objects" changes per move. In the caravan game (11th B), Temur adds one caravan and Saodat removes one, so there are always k caravans after her move. At the end, exactly k single camels remain.</li>
<li><b>Graph colouring:</b> "same / different" constraints are about parity (11th C).</li></ul>`,
code:[{t:'11th grade B: caravan game (100 points)',py:String.raw`import sys
data = sys.stdin.buffer.read().split()
k, n = int(data[0]), int(data[1])
a = sorted(map(int, data[2:2 + k * n]), reverse=True)
print(sum(a[:k]))     # exactly k camels survive, and Saodat keeps the k most valuable`}],
signals:['"is it possible", games with alternating moves','"equal number of…"'],
mistakes:['Simulating a game that only needs a counting argument'],
practice:['O11A','O11B','4A']},

/* ───────────── PRE-ADVANCED ───────────── */
{id:'p1', level:'preadv', title:'Recursion and problems that shrink', mins:60,
goal:'Solve a problem by reducing it to a smaller copy of itself.',
body:`
<p>Some processes, after one round, look exactly like the original process but smaller. Then solve with recursion: <b>answer(n) is expressed through answer(n/2)</b>.</p>
<h3>10th grade D (children in a circle)</h3>
<p>Every second child leaves. After the first round all <b>even</b> children are gone, and the odd ones play <b>the same game</b> with about half as many children:</p>
<ul><li>n even: child x of the small game is child 2x − 1 of the big game.</li>
<li>n odd: small child 1 is big child n, and small child x is big child 2x − 3.</li></ul>
<p>So the step when child x leaves, T(n, x), is found in about log n steps, and "b right after a" means T(n, b) = T(n, a) + 1. The full solution also searches the smallest n recursively (see the Olympiad section).</p>
<h3>Rules for recursion</h3><ul><li>Always have a <b>base case</b>.</li><li>Each call must be <b>smaller</b>.</li><li>Use <code>sys.setrecursionlimit</code>, or turn it into a while loop.</li><li><code>@lru_cache</code> remembers answers (memoization).</li></ul>`,
code:[{t:'When does child x leave? (10th D helper)',py:String.raw`def T(n, x):
    t = 0
    while True:
        if x % 2 == 0:
            return t + x // 2          # evens leave in the first round
        if n == 1:
            return t + 1
        if n % 2 == 0:
            t += n // 2
            n, x = n // 2, (x + 1) // 2
        else:
            t += (n - 1) // 2
            m = (n + 1) // 2
            x = 1 if x == n else (x + 3) // 2
            n = m`}],
signals:['"repeat until one is left"','each round removes half'],
mistakes:['No base case (infinite recursion)','Recursion depth > 1000 in Python'],
practice:['O10D','448C']},

{id:'p2', level:'preadv', title:'Dynamic programming 1: build answers from smaller answers', mins:75,
goal:'Write DP: a table where each cell uses earlier cells.',
body:`
<p><b>DP</b> = recursion + remembering. Define <code>dp[i]</code> = the answer for the first i items (or for value i). Then write how dp[i] comes from smaller ones.</p>
<h3>The 4 questions of every DP</h3><ol><li><b>State:</b> what does dp[i] mean, in words?</li><li><b>Transition:</b> dp[i] = best of (…dp[smaller]…).</li><li><b>Base:</b> dp[0] = ?</li><li><b>Answer:</b> which cell?</li></ol>
<h3>Example: Cut Ribbon (189A)</h3>
<p>Cut length n into pieces of length a, b or c, with as many pieces as possible. dp[x] = the most pieces for length x (−1 if impossible). dp[x] = 1 + max(dp[x−a], dp[x−b], dp[x−c]).</p>`,
code:[{t:'Cut Ribbon',py:String.raw`n, a, b, c = map(int, input().split())
NEG = -10**9
dp = [NEG] * (n + 1)
dp[0] = 0                                  # length 0: zero pieces
for x in range(1, n + 1):
    for p in (a, b, c):
        if x >= p and dp[x - p] != NEG:
            dp[x] = max(dp[x], dp[x - p] + 1)
print(dp[n])`},
{t:'Boredom (455A): take value v, lose v-1 and v+1',py:String.raw`from collections import Counter
n = int(input()); cnt = Counter(map(int, input().split()))
M = max(cnt)
dp = [0] * (M + 1)
dp[1] = cnt[1]
for v in range(2, M + 1):
    dp[v] = max(dp[v - 1], dp[v - 2] + v * cnt[v])   # skip v, or take all v's
print(dp[M])`}],
signals:['"maximum/minimum number of ways/score" with choices','greedy fails on a small example'],
mistakes:['Wrong base case','Not handling impossible states'],
practice:['189A','455A','1195C','545C']},

{id:'p3', level:'preadv', title:'DP 2: knapsack, grids, segments', mins:75,
goal:'Recognise the classic DP shapes.',
body:`
<ul><li><b>0/1 knapsack:</b> dp[w] = best value with weight w. Loop the weights <b>downward</b> so each item is used once.</li>
<li><b>Grid paths:</b> dp[i][j] from dp[i−1][j] and dp[i][j−1].</li>
<li><b>Split into k segments:</b> dp[j][i] = best for the first i elements in j segments = max over the start l of the last segment of dp[j−1][l−1] + cost(l..i). That's O(k·n²), and it's the subtask solution for 11th E. The full solution speeds up the max with a segment tree (Pro level).</li></ul>`,
code:[{t:'0/1 knapsack (subset sum up to W)',py:String.raw`can = [False] * (W + 1)
can[0] = True
for w in weights:
    for s in range(W, w - 1, -1):      # downward: each item once
        if can[s - w]:
            can[s] = True`},
{t:'Split into K segments, value = max + min (11th E, slow version)',py:String.raw`def solve(a, K):
    n = len(a); NEG = -1
    dp = [[NEG] * (n + 1) for _ in range(K + 1)]
    dp[0][0] = 0
    for j in range(1, K + 1):
        for i in range(1, n + 1):
            mx, mn, best = -1, 10**18, NEG
            for l in range(i, 0, -1):          # last team is a[l..i]
                mx = max(mx, a[l - 1]); mn = min(mn, a[l - 1])
                if dp[j - 1][l - 1] >= 0:
                    best = max(best, dp[j - 1][l - 1] + mx + mn)
            dp[j][i] = best
    return dp[K][n]`}],
signals:['"split into k parts"','"choose items with total ≤ W"'],
mistakes:['Upward loop in 0/1 knapsack (uses an item many times)'],
practice:['189A','1195C','O11E']},

{id:'p4', level:'preadv', title:'Graphs: BFS, DFS, components', mins:75,
goal:'Store a graph and explore it.',
body:`
<p>A graph = <b>vertices</b> + <b>edges</b>. Store it as an adjacency list: <code>g[v]</code> = the list of neighbours.</p>
<ul><li><b>BFS</b> (queue): shortest distances when every edge has length 1.</li>
<li><b>DFS</b> (stack): explore everything reachable, find components, detect cycles.</li>
<li>In Python write DFS with an explicit stack, not recursion (depth limits!).</li>
<li>A grid is a graph too: neighbours are up/down/left/right.</li></ul>
<h3>11th grade D (stations)</h3>
<p>Every vertex has degree ≤ 2, so each component is a <b>path</b> or a <b>cycle</b>. With ≥ K components, take one station from each and the answer is "infinity". Otherwise binary search the distance d. A path of L stations fits (L−1)//d + 1, and a cycle of C fits max(1, C//d).</p>`,
code:[{t:'BFS distances and components',py:String.raw`from collections import deque
def bfs(g, s, n):
    dist = [-1] * (n + 1)
    dist[s] = 0
    q = deque([s])
    while q:
        v = q.popleft()
        for w in g[v]:
            if dist[w] == -1:
                dist[w] = dist[v] + 1
                q.append(w)
    return dist

def components(g, n):
    comp = [0] * (n + 1); c = 0
    for s in range(1, n + 1):
        if comp[s] == 0:
            c += 1; comp[s] = c; stack = [s]
            while stack:
                v = stack.pop()
                for w in g[v]:
                    if comp[w] == 0:
                        comp[w] = c; stack.append(w)
    return c, comp`}],
signals:['roads, cities, friends, "connected"','grids with walls'],
mistakes:['Recursive DFS on 10⁵ vertices in Python','1-indexed vertices in a 0-indexed list'],
practice:['580C','520B','1167C','O11D']},

{id:'p5', level:'preadv', title:'Stacks, queues and the monotonic stack', mins:50,
goal:'Use stack/queue structures and find "next bigger element" in O(n).',
body:`
<ul><li><b>Stack</b> (list: append/pop): last in, first out. Brackets, undo, DFS. The narrow lift in 10th C is a stack!</li>
<li><b>Queue</b> (<code>collections.deque</code>): first in, first out. BFS, simulations like the children's circle.</li>
<li><b>Monotonic stack:</b> keep a stack whose values are always decreasing. When a new value comes, pop everything smaller: for each popped element, the new one is its "next bigger". Every element is pushed and popped once, so it's O(n). The fast 11th E solution uses two such stacks.</li></ul>`,
code:[{t:'Next greater element',py:String.raw`def next_greater(a):
    res = [-1] * len(a)
    st = []                       # indices, values decreasing
    for i, x in enumerate(a):
        while st and a[st[-1]] < x:
            res[st.pop()] = i     # x is the next greater for it
        st.append(i)
    return res`},
{t:'Simulating the circle with a deque',py:String.raw`from collections import deque
def order(n):
    q = deque(range(1, n + 1)); res = []
    while q:
        q.append(q.popleft())     # this child stays (goes to the back)
        res.append(q.popleft())   # the next one leaves
    return res`}],
signals:['brackets, "nearest bigger to the left/right"','circles and queues'],
mistakes:['list.pop(0) is O(n): use deque.popleft()'],
practice:['O10D','5C']},

{id:'p6', level:'preadv', title:'Greedy with data structures: heaps and patience sorting', mins:55,
goal:'Make greedy fast using heapq and sorted lists.',
body:`
<ul><li><b>heapq</b>: always get the smallest element in O(log n) (use negative numbers for the largest).</li>
<li><b>Patience sorting (10th C):</b> put each item on the first pile whose top is ≥ it, or start a new pile. The pile tops stay sorted, so use bisect. The number of piles = the longest strictly increasing subsequence (LIS).</li></ul>
<p>Why is the lift answer minimal? People with strictly increasing floors (like 1 &lt; 4 &lt; 5) can never share a lift, so you need at least as many lifts as the longest such chain, and the greedy uses exactly that many.</p>`,
code:[{t:'heapq basics',py:String.raw`import heapq
h = []
heapq.heappush(h, 5); heapq.heappush(h, 1); heapq.heappush(h, 3)
smallest = heapq.heappop(h)        # 1
# k-th largest with a size-k min-heap
top = []
for x in a:
    heapq.heappush(top, x)
    if len(top) > k:
        heapq.heappop(top)`},
{t:'Longest increasing subsequence in O(n log n)',py:String.raw`from bisect import bisect_left
def lis(a):
    tails = []
    for x in a:
        j = bisect_left(tails, x)
        if j == len(tails): tails.append(x)
        else: tails[j] = x
    return len(tails)`}],
signals:['"always take the smallest/largest available"','piles, lifts, chains'],
mistakes:['Sorting again and again instead of using a heap'],
practice:['O10C','1760F','812C']}
);
