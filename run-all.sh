#!/usr/bin/env bash
# Лаб 2 — бүх хэмжилтийг дарааллаар нь ажиллуулж, гаралтыг results/-д хадгална.
#
# ЗӨВЛӨМЖ: энэ файлыг нэг дор бүгдийг ажиллуулахад бус,
# алхам алхмаар гараар ажиллуулж, хооронд нь commit хийхэд ашигла.
# (Ажлын явцыг харуулсан 3+ commit нь үнэлгээний шаардлага.)

set -u
mkdir -p results

echo "=== k6 version ==="
k6 version | tee results/k6-version.txt

echo
echo "=== Алхам 2: baseline (5 VU) ==="
k6 run script.js | tee results/run-05vu.txt

echo
echo "=== Алхам 3: 5 / 30 / 100 VU тусад нь ==="
k6 run --vus 5   --duration 1m script.js | tee results/run-05vu.txt
k6 run --vus 30  --duration 1m script.js | tee results/run-30vu.txt
k6 run --vus 100 --duration 1m script.js | tee results/run-100vu.txt

echo
echo "=== Алхам 3: stages (ерөнхий зураг) ==="
k6 run stages.js | tee results/run-stages.txt

echo
echo "=== Алхам 4: threshold PASS ==="
k6 run thresholds-pass.js | tee results/run-threshold-pass.txt
echo "exit code: $?"

echo
echo "=== Алхам 4: threshold FAIL (exit code 99 хүлээгдэж байгаа) ==="
k6 run thresholds-fail.js | tee results/run-threshold-fail.txt
echo "exit code: $?"

echo
echo "Дууслаа. results/ доторх файлуудыг README-гийн хүснэгттэй тулгаж шалга."
