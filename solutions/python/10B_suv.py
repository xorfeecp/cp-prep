n = int(input())
a = list(map(int, input().split()))
answer = 0
prev = 0
for x in a:
    if x > prev:
        answer += x - prev
    prev = x
print(answer)
