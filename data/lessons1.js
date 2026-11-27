/* Lessons part 1: Start here, Beginner, Intermediate */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(

/* ───────────── START HERE ───────────── */
{id:'s1', level:'start', title:'How an online judge works', mins:20,
goal:'Know what happens to your code after you press Submit, and what every verdict means.',
body:`
<p>An olympiad or Codeforces problem is checked by a program called a <b>judge</b>. It runs your code on many hidden tests. For each test it gives your program an <b>input</b> and compares your <b>output</b> with the correct answer.</p>
<h3>The verdicts</h3>
<table class="t"><tr><th>Verdict</th><th>What it means</th><th>Usual cause</th></tr>
<tr><td><b>Accepted (AC)</b></td><td>All tests correct and fast enough</td><td>-</td></tr>
<tr><td><b>Wrong Answer (WA)</b></td><td>Your output was different on some test</td><td>a logic bug, a missed case (n = 1, all equal, negatives), wrong output format</td></tr>
<tr><td><b>Time Limit Exceeded (TLE)</b></td><td>Too slow</td><td>the algorithm does too many steps (see lesson "Will it be fast enough?")</td></tr>
<tr><td><b>Runtime Error (RE)</b></td><td>The program crashed</td><td>index out of range, division by zero, recursion too deep, reading input wrongly</td></tr>
<tr><td><b>Memory Limit (MLE)</b></td><td>Used too much memory</td><td>a huge list, like 10⁸ elements</td></tr></table>
<h3>Rules that never change</h3>
<ul><li>Print <b>only</b> what the problem asks. No "Enter n:" text and no extra words.</li>
<li>Read input <b>exactly</b> in the given format.</li>
<li>Time limits are per test (usually 1–2 seconds).</li>
<li>Examples are only a few tests. Passing them doesn't mean your code is right.</li></ul>
<h3>Subtasks and superscore</h3>
<p>In olympiads, tests are grouped into <b>subtasks</b> with extra limits (like "n ≤ 1000"). You get a subtask's points when you pass <b>all</b> its tests. With <b>superscore</b>, your score for a problem is the best result per subtask from all your submissions, so a submission can only add points.</p>`,
code:[],
signals:['Read the "Kiruvchi / Chiquvchi" (input/output) section twice.','Check the subtask table before writing any code.'],
mistakes:['Printing extra text like "Answer:"','Assuming the examples are all the tests'],
practice:['4A','71A']},

{id:'s2', level:'start', title:'Reading input and printing output', mins:30,
goal:'Read any input format quickly and correctly in Python.',
body:`
<p>Most wrong answers at the beginner level come from reading the input wrongly. Learn these patterns by heart.</p>
<h3>The patterns</h3>
<table class="t"><tr><th>Input looks like</th><th>Code</th></tr>
<tr><td>one number</td><td><code>n = int(input())</code></td></tr>
<tr><td>two numbers on a line</td><td><code>a, b = map(int, input().split())</code></td></tr>
<tr><td>a list on one line</td><td><code>a = list(map(int, input().split()))</code></td></tr>
<tr><td>a word or string</td><td><code>s = input()</code> (use <code>.strip()</code> to be safe)</td></tr>
<tr><td>n lines, one number each</td><td><code>a = [int(input()) for _ in range(n)]</code></td></tr>
<tr><td>t test cases</td><td><code>for _ in range(t):</code> and read each case inside</td></tr></table>
<h3>Fast input (use it when n is 10⁵ or more)</h3>
<p><code>input()</code> is slow for huge inputs. Read everything at once instead.</p>`,
code:[{t:'Fast input template (works for any layout)',py:String.raw`import sys

def main():
    data = sys.stdin.buffer.read().split()   # every number in the input, as bytes
    n = int(data[0])
    a = list(map(int, data[1:1 + n]))
    # ... solve ...
    print(sum(a))

main()`},
{t:'Printing many answers fast',py:String.raw`out = []
for x in answers:
    out.append(str(x))
print("\n".join(out))          # one big print instead of 100000 small ones

print(*a)                      # prints a list separated by spaces: 1 2 3`}],
signals:['n up to 10⁵ or more: use sys.stdin','many output lines: collect, then print once'],
mistakes:['Using input() inside a loop of 2·10⁵ lines (slow)','Forgetting that strings from sys.stdin.buffer are bytes: use int() or .decode()'],
practice:['282A','231A']},

{id:'s3', level:'start', title:'Contest strategy and subtasks ("olma terish")', mins:25,
goal:'Get the most points possible in 4 hours, even without full solutions.',
body:`
<p>This is the strategy your teacher described, and it is the most valuable lesson for an olympiad.</p>
<ol><li><b>First 15 minutes: read all problems.</b> On paper, write each subtask, its points, and an idea. The order isn't sorted by difficulty, so don't assume A is easiest.</li>
<li><b>Round 1: collect the easy subtasks of every problem.</b> Small n means brute force. Special cases ("all equal", "monotone", "k = 1", "n = 3") usually have a short formula.</li>
<li><b>Round 2: go deeper</b> on the problem where the next subtask feels closest.</li>
<li><b>Don't get stuck:</b> 30–40 minutes without progress means switch. But don't jump every 5 minutes either.</li>
<li><b>Use the scoreboard</b> if visible: problems many people solved are usually easier.</li>
<li><b>Stay until the end.</b> Leaving early never adds points.</li></ol>
<h3>Real example: the 10th-grade regional olympiad</h3>
<p>Problem C (lifts) needed <code>bisect</code> for 100 points. But the simple "check every lift" code was fast enough for subtasks 1, 2 and 3 (n ≤ 1000, floors ≤ 10, answer ≤ 10), which gave <b>53 points with beginner code</b>. Problem B had a 7-point subtask (monotone array) whose answer is just the biggest number.</p>
<h3>Questions to the jury</h3><p>Ask early, keep the question simple (yes/no), only about the statement, and keep working while you wait.</p>`,
code:[],
signals:['Each subtask row is a hint about the intended idea'],
mistakes:['Fighting one problem for 2 hours','Leaving early'],
practice:['O10C','O10B']},

/* ───────────── BEGINNER ───────────── */
{id:'b1', level:'beginner', title:'Python essentials for problem solving', mins:60,
goal:'Use variables, if, loops, lists and strings without thinking.',
body:`
<p>You only need a small part of Python for olympiads, but you must know it well.</p>
<h3>The core tools</h3>
<ul><li><b>Integers have no limit</b> in Python: 10¹⁸ × 10¹⁸ works. (C++ is different, see the C++ track.)</li>
<li><code>//</code> integer division, <code>%</code> remainder, <code>**</code> power, <code>abs()</code>, <code>min()</code>, <code>max()</code>, <code>sum()</code>.</li>
<li><code>range(a, b)</code> goes a, a+1, …, b−1. <code>range(n)</code> = 0…n−1.</li>
<li>Lists: <code>a[i]</code>, <code>a[-1]</code> (last), <code>a[l:r]</code> (slice), <code>len(a)</code>, <code>a.append(x)</code>, <code>a.sort()</code>.</li>
<li><code>for i, x in enumerate(a)</code> gives index and value together.</li>
<li>Strings work like lists of characters: <code>s[0]</code>, <code>s[::-1]</code> (reversed), <code>s.count('a')</code>.</li></ul>`,
code:[{t:'Examples you should be able to write without looking',py:String.raw`n = int(input())
a = list(map(int, input().split()))

total = 0
for x in a:                 # loop over values
    if x % 2 == 0:
        total += x
print(total)                # sum of even numbers

best = a[0]
for i in range(1, n):       # loop over indices
    best = max(best, a[i])

evens = [x for x in a if x % 2 == 0]   # list comprehension
print(len(evens), sorted(a), a[::-1])`}],
signals:[],mistakes:['Off-by-one with range: range(1, n) stops at n−1','Changing a list while looping over it'],
practice:['4A','50A','617A','546A','791A']},

{id:'b2', level:'beginner', title:'Simulation: do exactly what the statement says', mins:45,
goal:'Turn a story into code step by step. This alone wins many subtask points.',
body:`
<p><b>Simulation</b> means writing code that does exactly what the statement describes, one step at a time. It's often slow, but it's correct, and that's enough for the small subtasks.</p>
<h3>Method</h3>
<ol><li>Underline every rule in the statement.</li>
<li>Decide what to store: the "state" (for example, the last floor of every lift).</li>
<li>Write a loop that applies the rules in order.</li>
<li>Test it on the examples by hand.</li></ol>
<h3>Example: the lifts problem (10th grade, C)</h3>
<p>Each person goes to the first lift whose last floor is ≥ theirs, or opens a new lift. Simulate exactly that:</p>`,
code:[{t:'The "copy the story" solution: 53 points in the olympiad',py:String.raw`n = int(input())
f = list(map(int, input().split()))
last = []            # last floor in each lift
ans = []
for x in f:
    placed = False
    for j in range(len(last)):       # try lifts from the left
        if last[j] >= x:
            last[j] = x
            ans.append(j + 1)
            placed = True
            break
    if not placed:                   # no lift accepted: open a new one
        last.append(x)
        ans.append(len(last))
print(len(last))
print(*ans)`}],
signals:['"Each step…", "then…", "repeat until…"','small limits (n ≤ 1000)'],
mistakes:['Trying to be clever before having a correct slow version'],
practice:['977A','266A','69A','O10C']},

{id:'b3', level:'beginner', title:'Digits and number tricks', mins:40,
goal:'Take numbers apart with // and %, and loop over candidates.',
body:`
<p>Many easy problems are about digits. The two tools are:</p>
<ul><li><code>x % 10</code> = last digit, <code>x // 10</code> = remove the last digit.</li>
<li>For a 3-digit x: hundreds <code>x // 100</code>, tens <code>x // 10 % 10</code>, units <code>x % 10</code>.</li>
<li>Or simply use a string: <code>str(x)</code>, then <code>sum(map(int, str(x)))</code> is the digit sum.</li></ul>
<h3>Try all candidates</h3>
<p>If the answer is a number in a small range (all 3-digit numbers, all years up to 9000…), <b>try them all in increasing order</b> and stop at the first one that works. That's how the 10th-grade problem A is solved.</p>`,
code:[{t:'10th grade A: smallest 3-digit number with digit sum n and different digits',py:String.raw`n = int(input())
for x in range(100, 1000):              # smallest first, so the first hit is the answer
    a, b, c = x // 100, x // 10 % 10, x % 10
    if a + b + c == n and a != b and b != c and a != c:
        print(x)
        break`},
{t:'Digit loop for any size',py:String.raw`def digit_sum(x):
    s = 0
    while x > 0:
        s += x % 10       # take the last digit
        x //= 10          # drop it
    return s

def all_different(x):
    s = str(x)
    return len(set(s)) == len(s)`}],
signals:['"digits", "digit sum", "smallest number such that…"'],
mistakes:['Forgetting 0 has no digits in the while loop','Checking candidates in the wrong order (need smallest → loop upwards)'],
practice:['O10A','271A','110A','1352A']},

{id:'b4', level:'beginner', title:'Strings', mins:35,
goal:'Handle text problems: counting, comparing, building strings.',
body:`
<ul><li><code>s.lower()</code>, <code>s.upper()</code>, <code>s.count(c)</code>, <code>s.find(t)</code>, <code>s.replace(a, b)</code>.</li>
<li><code>c in "aeiou"</code> checks membership. <code>ord('a')</code> = 97 and <code>chr(97)</code> = 'a' convert between letters and numbers.</li>
<li>Strings can't be changed in place. Build a list of characters and <code>''.join(lst)</code> at the end (fast).</li>
<li>Comparing strings with <code>&lt;</code> uses <b>dictionary order</b>, and uppercase letters come before lowercase ('Z' &lt; 'a'). The football problem (10th E) uses exactly this.</li></ul>`,
code:[{t:'Common string patterns',py:String.raw`s = input().strip()
vowels = sum(1 for c in s if c in "aeiouAEIOU")
same_adjacent = sum(1 for i in range(len(s) - 1) if s[i] == s[i + 1])
rev = s[::-1]
is_pal = s == rev
res = []
for c in s:
    if c.lower() not in "aoyeui":
        res.append("." + c.lower())
print("".join(res))           # build, then join once`}],
signals:['letters, words, palindromes'],
mistakes:['s += c inside a big loop (slow); use a list','Forgetting .strip() after input (hidden spaces)'],
practice:['71A','118A','112A','236A','266A']},

{id:'b5', level:'beginner', title:'Functions: cleaner, reusable and faster code', mins:50,
goal:'Write solutions with functions, and know why main() makes Python faster.',
body:`
<p>A <b>function</b> is a named piece of code that takes inputs (<b>parameters</b>) and gives back a result with <code>return</code>.</p>
<h3>Why use functions in olympiads</h3>
<ol><li><b>Speed.</b> Python finds <b>local</b> variables (inside a function) faster than <b>global</b> ones. Putting your whole solution inside <code>def main():</code> often makes it <b>10–30% faster</b> for free. That's the "faster" thing you heard about.</li>
<li><b>Reuse.</b> Write <code>check(x)</code> once and call it from binary search, brute force and stress tests.</li>
<li><b>Testing.</b> A function like <code>solve(a)</code> can be called with many inputs to compare with a brute force.</li>
<li><b>Recursion.</b> A function can call itself, which you'll need later (D10, DP).</li></ol>
<h3>Rules</h3>
<ul><li><code>return</code> ends the function immediately.</li>
<li>Variables made inside a function disappear when it ends.</li>
<li>Lists passed to a function can be changed by it (numbers can't).</li></ul>`,
code:[{t:'The standard olympiad template',py:String.raw`import sys

def solve(n, a):
    # pure logic: no input/print here, easy to test
    best = 0
    for x in a:
        best = max(best, x)
    return best

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0])
    a = list(map(int, data[1:1 + n]))
    print(solve(n, a))

main()`},
{t:'Functions as "questions" (used in binary search later)',py:String.raw`def is_prime(x):
    if x < 2:
        return False
    d = 2
    while d * d <= x:          # only up to the square root
        if x % d == 0:
            return False
        d += 1
    return True

def count_good(x):             # how many numbers <= x are not divisible by 3 or 5
    return x - x // 3 - x // 5 + x // 15

print(is_prime(97), count_good(15))   # True 8`},
{t:'Recursion: a function calling itself',py:String.raw`import sys
sys.setrecursionlimit(10000)   # Python stops at depth ~1000 by default

def fact(n):
    if n == 0:                 # base case: stop here
        return 1
    return n * fact(n - 1)     # smaller copy of the same problem`}],
signals:['you write the same logic twice','you need check(x) for binary search'],
mistakes:['Forgetting return (the function gives None)','Deep recursion without setrecursionlimit (Runtime Error)'],
practice:['1475A','26A']},

{id:'b6', level:'beginner', title:'Will it be fast enough? (complexity)', mins:40,
goal:'Look at the limits and know which methods will pass.',
body:`
<p>Count how many basic steps your idea does for the <b>biggest</b> input. Python does about <b>10⁷ simple steps per second</b>. C++ does about <b>10⁸–10⁹</b>.</p>
<table class="t"><tr><th>Limit</th><th>Allowed</th><th>Typical method</th></tr>
<tr><td>n ≤ 10</td><td>O(n!)</td><td>try all orders</td></tr>
<tr><td>n ≤ 20</td><td>O(2ⁿ)</td><td>try all subsets</td></tr>
<tr><td>n ≤ 300–500</td><td>O(n³)</td><td>three loops</td></tr>
<tr><td>n ≤ 2000–5000</td><td>O(n²)</td><td>two loops (Python: up to ~3000)</td></tr>
<tr><td>n ≤ 2·10⁵–10⁶</td><td>O(n log n), O(n)</td><td>sorting, prefix sums, two pointers, binary search</td></tr>
<tr><td>n ≤ 10¹⁸</td><td>O(1), O(log n)</td><td>formula, binary search on the answer</td></tr></table>
<p><b>Read the subtask table with this in mind:</b> "n ≤ 1000" invites O(n²). "n ≤ 2·10⁵" demands O(n log n).</p>
<p><b>log n is tiny:</b> log₂(10⁶) ≈ 20 and log₂(10¹⁸) ≈ 60. Sorting 2·10⁵ numbers is instant.</p>`,
code:[],
signals:['always compute: (biggest n)² or n·log n, compared with 10⁷ per second in Python'],
mistakes:['Using list.index / "x in list" inside a loop (each is O(n), hidden)','Slicing a[l:r] inside a loop (copies, O(n))'],
practice:['1A','158A']},

/* ───────────── INTERMEDIATE ───────────── */
{id:'i1', level:'intermediate', title:'Sorting and sort keys', mins:40,
goal:'Sort by anything, and recognise when sorting unlocks a problem.',
body:`
<p>Sorting costs O(n log n), and many problems become easy once the data is sorted.</p>
<ul><li><code>a.sort()</code> sorts in place. <code>sorted(a)</code> returns a new list. Add <code>reverse=True</code> for big → small.</li>
<li>A <b>key</b> says what to sort by: <code>pairs.sort(key=lambda p: (p[1], -p[0]))</code> sorts by second value, then first value descending.</li>
<li>Tuples compare item by item, so sorting a list of tuples sorts by the 1st item, then the 2nd, and so on. The football table (10th E) is sorted exactly like this: (−points, −goal difference, −goals, name).</li></ul>
<h3>When sorting helps</h3>
<ul><li>"Choose the k biggest/smallest" (11th B: answer = the sum of the k biggest loads).</li>
<li>"Minimum difference between any two" (after sorting, only neighbours matter).</li>
<li>Greedy choices ("always take the cheapest first").</li></ul>`,
code:[{t:'Sorting patterns',py:String.raw`a.sort()                                  # small -> big
a.sort(reverse=True)                      # big -> small
k_biggest = sorted(a, reverse=True)[:k]

people = [("Ali", 15), ("Vali", 12), ("Gani", 15)]
people.sort(key=lambda p: (-p[1], p[0]))  # older first, then by name

b = sorted(a)
min_gap = min(b[i + 1] - b[i] for i in range(len(b) - 1))`}],
signals:['"choose", "pair up", "minimum difference", "order does not matter"'],
mistakes:['Sorting inside a loop (n · n log n)','Forgetting the original order matters for the output (keep indices: sort (value, index) pairs)'],
practice:['339A','1360B','230A','O11B']},

{id:'i2', level:'intermediate', title:'Greedy: take the best choice now', mins:45,
goal:'Recognise problems where a simple local rule is optimal.',
body:`
<p>A <b>greedy</b> algorithm makes the choice that looks best right now and never goes back. It's fast and short, but it must be <b>right</b>: always test it on small cases (or against a brute force).</p>
<h3>Typical greedy rules</h3>
<ul><li>Fill the biggest/smallest first (taxi groups, coins).</li>
<li>Always do the task that ends earliest.</li>
<li>Put each item in the first place where it fits (the lifts problem, 10th C!).</li></ul>
<h3>How to convince yourself</h3>
<p>Ask: "if an optimal solution does something different, can I swap it to match my greedy choice without making it worse?" If yes, the greedy is safe.</p>`,
code:[{t:'Taxi (158B): groups of 1–4 people, cars of 4',py:String.raw`n = int(input())
s = list(map(int, input().split()))
c = [0] * 5
for x in s:
    c[x] += 1
cars = c[4] + c[3]                # each 4 and each 3 needs its own car
ones = max(0, c[1] - c[3])        # 1s sit with the 3s first
cars += c[2] // 2                 # two 2s share a car
if c[2] % 2:                      # one 2 left: it can take two 1s
    cars += 1
    ones = max(0, ones - 2)
cars += (ones + 3) // 4           # remaining 1s, four per car
print(cars)`}],
signals:['"minimum number of…", "maximum number of…" with a natural order'],
mistakes:['Trusting a greedy without testing small cases'],
practice:['158B','230A','492B','1335C']},

{id:'i3', level:'intermediate', title:'Counting with dict, Counter and set', mins:40,
goal:'Count things in O(n) instead of O(n²).',
body:`
<ul><li><code>set</code>: is x present? (instant). The number of distinct values = <code>len(set(a))</code>.</li>
<li><code>dict</code> / <code>Counter</code>: how many times each value appears.</li></ul>
<h3>The "pairs with sum K" trick</h3>
<p>Walking left to right, for each x you need the number of earlier values equal to K − x. Keep a dict of counts: O(n) instead of two loops.</p>`,
code:[{t:'Counting patterns',py:String.raw`from collections import Counter
cnt = Counter(a)                  # cnt[x] = how many times x appears
most_value, most_count = cnt.most_common(1)[0]

seen = {}
pairs = 0
for x in a:                       # pairs i<j with a[i] + a[j] == K
    pairs += seen.get(K - x, 0)
    seen[x] = seen.get(x, 0) + 1`}],
signals:['"how many pairs", "distinct", "most frequent"'],
mistakes:['Using list.count(x) inside a loop: O(n²)'],
practice:['1335C','4C']},

{id:'i4', level:'intermediate', title:'Prefix sums', mins:45,
goal:'Answer "sum from l to r" questions instantly.',
body:`
<p>Make <code>pre[i]</code> = a[0] + … + a[i−1]. Then the sum of a[l..r] (0-based, inclusive) is <code>pre[r+1] − pre[l]</code>, one subtraction for each question.</p>
<p>It works for anything you can "count up": the number of '#' characters, the number of positions where s[i] == s[i+1], and so on.</p>
<p><b>Prefix sums are sorted</b> when all values are positive, so you can binary search on them (Worms, 474B).</p>`,
code:[{t:'Prefix sums with queries',py:String.raw`import sys
def main():
    data = sys.stdin.buffer.read().split()
    n, q = int(data[0]), int(data[1])
    a = data[2:2 + n]
    pre = [0] * (n + 1)
    for i in range(n):
        pre[i + 1] = pre[i] + int(a[i])
    out = []
    p = 2 + n
    for _ in range(q):
        l, r = int(data[p]), int(data[p + 1]); p += 2   # 1-indexed, inclusive
        out.append(pre[r] - pre[l - 1])
    print("\n".join(map(str, out)))
main()`}],
signals:['many questions about sums of ranges','"count in segment [l, r]"'],
mistakes:['Off-by-one: decide 0- or 1-indexing and stick to it'],
practice:['313B','474B','816B']},

{id:'i5', level:'intermediate', title:'Difference arrays and "count the rises"', mins:50,
goal:'Handle "add/subtract on a segment" fast, and solve the water problem (10th B).',
body:`
<p>Prefix sums answer "sum on a segment". The <b>difference array</b> does the opposite: it applies "add v to every element of [l, r]" in O(1).</p>
<p>Keep <code>d</code> with <code>d[l] += v</code> and <code>d[r+1] −= v</code>. After all updates, the prefix sums of d give the final values.</p>
<h3>The rises idea (10th grade B, water)</h3>
<p>Operation: "subtract 1 from a whole segment" (x litres for x energy is the same as x operations of 1). How many operations empty the array?</p>
<p>Draw the array as columns of blocks. Each operation removes <b>one connected horizontal strip</b>. A new strip <b>starts</b> at column i for every level that column i has above column i−1. So the answer is the <b>sum of rises</b>:</p>
<p class="big">answer = Σ max(0, a[i] − a[i−1]), with a[0] = 0</p>
<p>The same idea solves LeetCode 1526 and AtCoder ABC116 C.</p>`,
code:[{t:'Range additions (816B Karen and Coffee style)',py:String.raw`N = 200001
d = [0] * (N + 1)
for (l, r) in segments:          # each segment adds 1 to [l, r]
    d[l] += 1
    d[r + 1] -= 1
cover = [0] * N
run = 0
for i in range(N):
    run += d[i]
    cover[i] = run                # how many segments cover i`},
{t:'10th grade B: the full solution',py:String.raw`n = int(input())
a = list(map(int, input().split()))
answer = 0
prev = 0
for x in a:
    if x > prev:                  # a rise: new strips start here
        answer += x - prev
    prev = x
print(answer)`}],
signals:['"add/subtract on a segment"','"minimum number of segment operations"'],
mistakes:['Forgetting d needs size n+2 (r+1 can be n)'],
practice:['O10B','816B','448C']},

{id:'i6', level:'intermediate', title:'Math 1: divisibility, gcd, primes, sieve', mins:60,
goal:'Know the number theory that appears in most easy and medium problems.',
body:`
<ul><li><code>math.gcd(a, b)</code>, and lcm = a // gcd(a, b) * b.</li>
<li><b>Divisors</b> come in pairs (d, n/d), so you only need to check d up to √n: O(√n).</li>
<li><b>Prime check</b>: try divisors up to √n.</li>
<li><b>Sieve of Eratosthenes</b>: all primes up to N in O(N log log N). Use it when you need many prime checks.</li>
<li>Parity tricks: odd + odd = even, a number is a power of 2 iff <code>n &amp; (n − 1) == 0</code>.</li>
<li><b>Ceil division</b> without floats: <code>(a + b − 1) // b</code>.</li></ul>`,
code:[{t:'Sieve and divisors',py:String.raw`def sieve(N):
    is_p = bytearray([1]) * (N + 1)
    is_p[0] = is_p[1] = 0
    i = 2
    while i * i <= N:
        if is_p[i]:
            is_p[i * i::i] = bytearray(len(range(i * i, N + 1, i)))   # cross out multiples
        i += 1
    return is_p

def divisors(n):
    small, big = [], []
    d = 1
    while d * d <= n:
        if n % d == 0:
            small.append(d)
            if d != n // d:
                big.append(n // d)
        d += 1
    return small + big[::-1]`}],
signals:['"divisible", "prime", "gcd", "multiple"'],
mistakes:['Using float sqrt for big numbers: use math.isqrt','Using / instead of // (float!)'],
practice:['1475A','26A','230B','1A']},

{id:'i7', level:'intermediate', title:'Counting multiples and inclusion–exclusion', mins:40,
goal:'Count numbers up to x that satisfy divisibility rules, instantly.',
body:`
<p><code>x // d</code> = how many numbers from 1 to x are divisible by d.</p>
<p><b>Inclusion–exclusion</b>: the numbers divisible by 3 <b>or</b> 5 = (÷3) + (÷5) − (÷15), because multiples of 15 were counted twice.</p>
<p>So the numbers ≤ x divisible by <b>neither</b> 3 nor 5 = <code>x − x//3 − x//5 + x//15</code>.</p>
<p>For three numbers: remove the singles, add back the pairs, remove the triple. For "divisible by both a and b" use lcm(a, b), not a·b, when they share factors.</p>
<p>Combined with binary search (Medium level) this solves "find the k-th number that…" problems, like the first problem you were given.</p>`,
code:[{t:'Count good numbers',py:String.raw`def count_not_3_or_5(x):
    return x - x // 3 - x // 5 + x // 15

def count_div_2_or_3(x):
    return x // 2 + x // 3 - x // 6

# blocks idea for the k-th good number (period 15, 8 good numbers per block)
good = [1, 2, 4, 7, 8, 11, 13, 14]
k = int(input()) - 1
print(k // 8 * 15 + good[k % 8])`}],
signals:['"not divisible by…", "k-th number such that"'],
mistakes:['Forgetting to add back the overlap','Using a·b instead of lcm when a and b share factors'],
practice:['1352C','O10K']}
);
