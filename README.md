# k6 Load Testing Report

**Оюутан:** B232270024 О.Дэлгэрмаа

## 1. Орчин

| Үзүүлэлт       | Мэдээлэл                     |
| -------------- | ---------------------------- |
| **OS**         | Debian GNU/Linux 13 (trixie) |
| **CPU / RAM**  | Intel Core i5-11400H / 16GB  |
| **Сүлжээ**     | Wi-Fi / 50 Mbps              |
| **Target**     | https://test.k6.io           |
| **k6 Version** | k6 v2.2.0                    |

---

## 2. Baseline хэмжилт

Baseline тестийг **5, 30, 100 VU**-гаар ажиллуулж, `p90`, `p95`, throughput болон error rate үзүүлэлтүүдийг хэмжсэн.

Үр дүнг дараах файлуудад хадгалсан:

```text
results/run-05vu.txt
results/run-30vu.txt
results/run-100vu.txt
```

### 2.1. 5 VU — 30 секунд

Анхны baseline хэмжилтийг 5 VU ашиглан 30 секунд ажиллуулсан.

| Үзүүлэлт       |     Үр дүн |
| -------------- | ---------: |
| **p90**        |  277.39 ms |
| **p95**        |  322.70 ms |
| **Throughput** | 7.14 req/s |
| **Error rate** |         0% |

### 2.2. 5 VU — 1 минут

5 VU-гаар тестийг 1 минут ажиллуулж дахин хэмжилт хийсэн.

| Үзүүлэлт       |     Үр дүн |
| -------------- | ---------: |
| **p90**        |  285.80 ms |
| **p95**        |  307.12 ms |
| **Throughput** | 7.31 req/s |
| **Error rate** |         0% |

### 2.3. 30 VU — Baseline

| Үзүүлэлт       |      Үр дүн |
| -------------- | ----------: |
| **p90**        |   229.25 ms |
| **p95**        |   237.08 ms |
| **Throughput** | 44.32 req/s |
| **Error rate** |          0% |

### 2.4. 100 VU — Baseline

| Үзүүлэлт       |       Үр дүн |
| -------------- | -----------: |
| **p90**        |    228.89 ms |
| **p95**        |    233.44 ms |
| **Throughput** | 149.91 req/s |
| **Error rate** |           0% |

---

## 3. Baseline дүгнэлт

Baseline хэмжилтийн үр дүнгээс харахад бүх VU түвшинд **error rate 0%** байсан.

5 VU үед p95 latency нь **322.70 ms** байсан бол 30 VU үед **237.08 ms**, 100 VU үед **233.44 ms** болж буурсан.

Мөн VU нэмэгдэхэд throughput:

```text
5 VU    → 7.14 req/s
30 VU   → 44.32 req/s
100 VU  → 149.91 req/s
```

хүртэл өссөн байна.

---

# 4. SLO ба Thresholds

Baseline 5 VU-ийн p95 latency-г үндсэн үзүүлэлт болгон ашигласан.

**Baseline p95 = 322.70 ms**

SLO threshold-ийг baseline-ийн p95-ийн **1.5 дахин** хэмжээгээр тооцсон:

```text
322.70 ms × 1.5 = 484.05 ms
```

Иймээс p95 latency нь **484.05 ms-ээс бага** байхыг шаардлага болгон авсан.

> **SLO:** p95 < 484.05 ms

---

## 5. Threshold тестийн үр дүн

### 5.1. PASS threshold

`thresholds-pass.js` тестийн шаардлага:

```text
p(95) < 461 ms
```

Үр дүн:

| Үзүүлэлт      |    Үр дүн |
| ------------- | --------: |
| **p95**       | 267.17 ms |
| **Threshold** |  < 461 ms |
| **Exit code** |         0 |
| **Status**    |    ✅ PASS |

p95 latency нь 461 ms threshold-ээс бага байсан тул тест амжилттай болсон.

### 5.2. FAIL threshold

`thresholds-fail.js` тестийн шаардлага:

```text
p(95) < 50 ms
```

Үр дүн:

| Үзүүлэлт      |    Үр дүн |
| ------------- | --------: |
| **p95**       | 251.65 ms |
| **Threshold** |   < 50 ms |
| **Exit code** |        99 |
| **Status**    |    ❌ FAIL |

p95 latency нь 50 ms threshold-ээс их байсан тул threshold зөрчигдөж, k6 **exit code 99**-тэйгээр дууссан.

---

# 6. Дүгнэлт

k6 ашиглан `https://test.k6.io` target дээр 5, 30 болон 100 VU-ийн baseline load testing хийсэн.

Baseline тестүүдийн бүх тохиолдолд **error rate 0%** гарсан бөгөөд VU-ийн тоо нэмэгдэхэд throughput мэдэгдэхүйц өссөн.

Мөн SLO-д суурилсан threshold тестийг хийж үзэхэд:

* `thresholds-pass.js` → **PASS**, exit code **0**
* `thresholds-fail.js` → **FAIL**, exit code **99**

Ингэснээр k6-ийн threshold ашиглан системийн гүйцэтгэлийн шаардлагыг автоматаар шалгах болон шаардлага хангаагүй үед тестийг амжилтгүй болгох боломжийг туршиж үзсэн.
