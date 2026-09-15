// Ачааллыг шатлан өсгөх (ramp-up / ramp-down)
// stages ajluulsan bugd neg summary ogne tgheer p95 salgaagu. script ni 3 udaa tus burt ajluulj baigaa

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // халаалт
    { duration: '1m',  target: 30 },  // өсгөлт
    { duration: '30s', target: 100 }, // оргил
    { duration: '30s', target: 0 },   // буулт
  ],
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
