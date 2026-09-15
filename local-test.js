// Локал сервер рүү тест
// /fast ба /slow хоёрын latency-г тусад нь хэмжинэ

import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE = 'http://localhost:3000';

export const options = {
  vus: 20,
  duration: '30s',
  thresholds: {
    'http_req_duration{endpoint:fast}': ['p(95)<50'],
    'http_req_duration{endpoint:slow}': ['p(95)<200'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const fast = http.get(`${BASE}/fast`, { tags: { endpoint: 'fast' } });
  check(fast, { 'fast 200': (r) => r.status === 200 });

  const slow = http.get(`${BASE}/slow`, { tags: { endpoint: 'slow' } });
  check(slow, { 'slow 200': (r) => r.status === 200 });

  sleep(1);
}
