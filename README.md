ts-language-detection
=====================

A TypeScript source port of Nakatani Shuyo's excellent [language detection library in Java](https://code.google.com/p/language-detection/).

## Try it online
[http://laszlopandy.github.io/ts-language-detection/](http://laszlopandy.github.io/ts-language-detection/)

## Setup the web interface on localhost
```
# install dependencies
npm install tsc
npm install lazy

# compile TypeScript
tsc --target ES5 --out webinterface.js src/webinterface.ts

# run web server
python -m SimpleHTTPServer 8000 &

# open page
open http://localhost:8000/index.html

```
### Benchmarks
```sh
kanavdwevedi@Kanavs-MacBook-Pro ts-language-detection % wrk -t12 -c400 -d30s -s post.lua http://localhost:3000/detect

Running 30s test @ http://localhost:3000/detect
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   960.17ms  592.42ms   1.99s    57.48%
    Req/Sec    21.15     23.13   210.00     90.05%
  5549 requests in 30.05s, 1.56MB read
  Socket errors: connect 0, read 1095, write 0, timeout 2750
Requests/sec:    184.67
Transfer/sec:     53.04KB
kanavdwevedi@Kanavs-MacBook-Pro ts-language-detection % wrk -t4 -c40 -d20s -s post.lua http://localhost:3000/detect

Running 20s test @ http://localhost:3000/detect
  4 threads and 40 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   509.80ms   98.31ms   1.13s    93.15%
    Req/Sec    22.53     13.62    80.00     82.01%
  1551 requests in 20.07s, 445.41KB read
Requests/sec:     77.29
Transfer/sec:     22.20KB
kanavdwevedi@Kanavs-MacBook-Pro ts-language-detection % wrk -t2 -c20 -d20s -s post.lua http://localhost:3000/detect

Running 20s test @ http://localhost:3000/detect
  2 threads and 20 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   319.96ms   74.45ms 715.61ms   93.28%
    Req/Sec    30.90      5.60    40.00     69.85%
  1244 requests in 20.06s, 357.27KB read
Requests/sec:     62.02
Transfer/sec:     17.81KB
```
