B232270024 О.Дэлгэрмаа

## Орчин

OS: Debian GNU/Linux 13 (trixie)
CPU/RAM: i5-11400H / 16GB
Сүлжээ: WiFi 50Mbps
Target: https://test.k6.io
k6 version: k6 v2.2.0

## Baseline хэмжилт

5 VU:

* 30 sec: p90 = 277.39ms, p95 = 322.7ms, throughput = 7.14 req/s, error rate = 0%
* 1 min: p90 = 285.8ms, p95 = 307.12ms, throughput = 7.31 req/s, error rate = 0%

30 VU:

* p90 = 229.25ms
* p95 = 237.08ms
* throughput = 44.32 req/s
* error rate = 0%

100 VU:

* p90 = 228.89ms
* p95 = 233.44ms
* throughput = 149.91 req/s
* error rate = 0%

Үр дүнгийн файлууд:

```text
results/run-05vu.txt
results/run-30vu.txt
results/run-100vu.txt
```

## SLO ба Thresholds

5 VU baseline-ийн p95 = 322.7ms.

Baseline p95 × 1.5 = 461ms гэж авч threshold тохируулсан.

`thresholds-pass.js`:

* p95 = 267.17ms
* threshold = p(95) < 461ms
* Exit = 0
* PASS

`thresholds-fail.js`:

* p95 = 251.65ms
* threshold = p(95) < 50ms
* Exit = 99
* FAIL

## Дүгнэлт

5, 30, 100 VU-аар baseline тест хийж үзэхэд бүх тестийн error rate 0% байсан. VU нэмэгдэхэд throughput мөн нэмэгдсэн.

Threshold тест дээр PASS нөхцөл амжилттай биелсэн, харин FAIL нөхцөл дээр threshold зөрчигдөж exit code 99 гарсан.
