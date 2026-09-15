// Лаб 2 — Алхам 2: Анхны тест (baseline хэмжилт)
// Алхам 3-т мөн энэ файлыг --vus / --duration туглаар дахин ашиглана.
//
// ЧУХАЛ: энд options дотор stages БАЙХГҮЙ. Учир нь stages байвал
// командын мөрийн --vus / --duration ЧИМЭЭГҮЙ үл тоогдоно.

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
};

export default function () {
  const res = http.get('https://test.k6.io'); // зөвшөөрөгдсөн бай

  check(res, {
    'status 200 байна': (r) => r.status === 200,
  });

  sleep(1);
}
