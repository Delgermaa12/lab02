B232270024 О.Дэлгэрмаа

Орчин:
OC: Debian GNU/Linux 13 (trixie)
CPU/RAM: i5-11400H/ 16GB
Сүлжээ: WIFI 50Mbps
target: https://test.k6.io

k6 version: k6 v2.2.0

Baseline хэмжилт:
VU
5-	results/run-05vu.txt
30- 	results/run-30vu.txt
100- 	results/run-100vu.txt

Anhnii hemjilt buyu 30 sec ajluulsan 5vu baseline хэмжилт: 
p90: 277.39ms
p95: 322.7ms
throughput: 7.14req/s
error rate: 0%


1min ajluulsan ni 5vu baseline хэмжилт: 
p90: 285.8ms
p95: 307.12ms
throughput: 7.31req/s
error rate: 0%

30vu baseline хэмжилт: 
p90: 229.25ms
p95: 237.08ms
throughput: 44.32req/s
error rate: 0%

100vu baseline хэмжилт: 
p90: 228.89ms
p95: 233.44ms
throughput: 149.91req/s
error rate: 0%


SLO ба Thresholds
Baseline 5vu ni p=95 deer 322.7x1.5=461ms

                                       p95        Exit
PASS  thresholds-pass.js (p(95)<461)  267.17ms   0
FAIL  thresholds-fail.js (p(95)<50)   251.65ms   99
