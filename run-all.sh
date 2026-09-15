# Buh hemjiltuudiig daraallaar ni ajluulj /resukt dotor hadgalna

set -u
mkdir -p results

echo "k6 version"
k6 version | tee results/k6-version.txt

echo
echo "baseline (5 VU)"
k6 run script.js | tee results/run-05vu.txt

echo
echo "5, 30, 100 VU"
k6 run --vus 5   --duration 1m script.js | tee results/run-05vu.txt
k6 run --vus 30  --duration 1m script.js | tee results/run-30vu.txt
k6 run --vus 100 --duration 1m script.js | tee results/run-100vu.txt

