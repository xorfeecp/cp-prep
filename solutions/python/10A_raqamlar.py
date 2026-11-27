n = int(input())
for x in range(100, 1000):
    a, b, c = x // 100, x // 10 % 10, x % 10
    if a + b + c == n and a != b and b != c and a != c:
        print(x)
        break
