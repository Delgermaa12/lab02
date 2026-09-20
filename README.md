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
Screenshot1 нь: screenshot/5 vu/Screenshot From 2026-09-20 21-57-34.png
Screenshot2 нь: screenshot/5 vu/Screenshot From 2026-09-20 21-57-43.png


30 VU:

* p90 = 229.25ms
* p95 = 237.08ms
* throughput = 44.32 req/s
* error rate = 0%
Screenshot1 нь: screenshot/30 vu/Screenshot From 2026-09-20 22-00-25.png
Screenshot2 нь: screenshot/30 vu/Screenshot From 2026-09-20 21-57-34.png

100 VU:

* p90 = 228.89ms
* p95 = 233.44ms
* throughput = 149.91 req/s
* error rate = 0%
Screenshot1 нь: screenshot/100vu/Screenshot From 2026-09-20 22-02-09.png
Screenshot2 нь: screenshot/100vu/Screenshot From 2026-09-20 22-02-29.png


Үр дүнгийн файлууд:

```text
results/run-05vu.txt
results/run-30vu.txt
results/run-100vu.txt
```
stage:
Screenshot1 нь: screenshot/stages/Screenshot From 2026-09-20 22-06-56.png
Screenshot2 нь: screenshot/stages/Screenshot From 2026-09-20 22-07-04.png

## SLO ба Thresholds

5 VU baseline-ийн p95 = 322.7ms.

Baseline p95 × 1.5 = 461ms гэж авч threshold тохируулсан.

`thresholds-pass.js`:

* p95 = 267.17ms
* threshold = p(95) < 461ms
* Exit = 0
* PASS
Screenshot1 нь: screenshot/stages/Screenshot From 2026-09-20 22-08-26.png
Screenshot2 нь: screenshot/stages/Screenshot From 2026-09-20 22-09-04.png


`thresholds-fail.js`:

* p95 = 251.65ms
* threshold = p(95) < 50ms
* Exit = 99
* FAIL
Screenshot1 нь: screenshot/stages/Screenshot From 2026-09-20 22-10-04.png
Screenshot2 нь: screenshot/stages/Screenshot From 2026-09-20 22-10-07.png


delgermaa@debian:~/lab02$ grep "p(95)" thresholds-pass.js
    http_req_duration: ['p(95)< 461'], // baseline p95 x 1.5

## 4. Локал сервер

`local-server/server.js` — Express, `/fast` (шууд) ба `/slow` (100ms саатал).

| Endpoint | p95 (ms) | Throughput | Error rate |
| --- | --- | --- | --- |
| /fast | 7.19 | 36.16 req/s (нийт) | 0.00% |
| /slow | 106.27 | 36.16 req/s (нийт) | 0.00% |

Гаралт: `results/run-local.txt`
Screenshot1 нь: screenshot/stages/Screenshot From 2026-09-20 23-11-32.png
Screenshot2 нь: screenshot/stages/Screenshot From 2026-09-20 22-11-38.png

/slow endpoint-д код дотор 100ms-ийн зориудаар оруулсан `setTimeout` саатал
p95-д шууд тусгагдсан: /fast-ийн p95 (7.19ms)-тай харьцуулахад ~99ms-ээр
өндөр гарсан нь хэмжилтийн үнэн зөв байдлыг баталгаажуулж байна. Throughput
нь endpoint тус бүрээр биш, нийт HTTP хүсэлтээр (fast+slow хамт) 36.16
req/s гарсан — учир нь k6 скрипт нэг iteration тутамд хоёр endpoint рүү
дараалан хандаж байгаа тул `http_reqs` нийт хоёрыг нэгтгэсэн тоо гаргадаг.
Мөн thresholds хоёулаа (`p(95)<50` fast-д, `p(95)<200` slow-д) амжилттай
хангагдсан (PASS, exit code 0).


## Дүгнэлт

Энэхүү ачааллын тестийн зорилго нь test.k6.io сайтын гүйцэтгэлийг өөр өөр хэмжээний хэрэглэгчийн ачаалал дор үнэлэхээр байсан. 5, 30, 100 VU-тай гурван baseline тест хийж үзэхэд бүх тохиолдолд алдааны хувь 0% байсан нь сервер тогтвортой ажиллаж байгааг харуулж байгаа. VU тоо нэмэгдэх тусам throughput мэдэгтэй хэмжээгээр өссөн 5 VU дээр ойролцоогоор 7.1-7.3 req/s байсан бол 100 VU дээр 150 орчим req/s хүрсэн нь сервер параллель хүсэлтийг сайн зохицуулж чадаж байгааг илтгэнэ. Сонирхолтой нь, VU тоо нэмэгдэхэд latency (p90, p95) буурсан буюу тогтвортой байсан — жишээ нь 5 VU дээр p95 нь 322.7ms байсан бол 100 VU дээр 233.44ms болж буурсан, энэ нь магадгүй сервер тал дахь кэшлэлт эсвэл холболтын дулаарал (connection warm-up)-тай холбоотой байж болно. Threshold тестийн хувьд, thresholds-pass.js скрипт дээр p(95)<461ms гэсэн нөхцөлийг тавьж ажиллуулахад бодит p95 утга 267.17ms гарсан тул тест амжилттай (PASS, exit code 0) дууссан. Харин thresholds-fail.js скрипт дээр зориудаар маш хатуу p(95)<50ms гэсэн нөхцөл тавихад бодит p95 нь 251.65ms гарсан тул threshold зөрчигдөж, тест FAIL болж, exit code 99-ээр дуусав. Энэ хоёр тест нь k6-ийн threshold механизм зөв ажиллаж байгааг батлаж, CI/CD орчинд гүйцэтгэлийн доройтлыг автоматаар илрүүлэх боломжтойг харуулж байна. Ерөнхийдөө, тестийн үр дүнгээс харахад тухайн сервер бага ачаалалтай үед ч, өндөр ачаалалтай (100 VU) үед ч тогтвортой, найдвартай ажиллаж байгаа нь харагдлаа. Цаашид сервер дээрх нөөцийн ашиглалт (CPU, memory)-ыг зэрэгцүүлэн хэмжиж, өндөр ачааллын нөхцөлд ямар нөөц хязгаарлалт үүсэж болохыг судлах нь илүү бүрэн дүн шинжилгээ өгөх байсан.

AI хэсэг:
Энэ лабыг хийхдээ би claude ашигласан бөгөөд эхэндээ өөрийнхөө бичсэн скриптүүд ажиллагааг хийсний үр дүнгээ явуулж хянуулсан араас нь readme бичсний араас readme бичээд git рүү push хийхээр бичигнүүд нь бүгд өөр өөр эмх цэгцгүй болоод байсан учир readme явуулж илүү загвартай болгосон.
