# Benchmarks

- **Machine:** darwin arm64 | 8 vCPUs | 32.0GB Mem
- **Node:** `v16.13.1`
- **Run:** Sat Jun 18 2022 17:24:47 GMT+0200 (Central European Summer Time)
- **Method:** `autocannon -c 100 -d 40 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|                          |  Version | Router | Requests/s | Latency | Throughput/Mb |
| :----------------------- | -------: | -----: | :--------: | ------: | ------------: |
| connect                  |    3.7.0 |      ✗ |  93081.6   |   10.77 |         16.60 |
| micro                    |    9.3.4 |      ✗ |  91648.0   |   11.01 |         16.34 |
| connect-router           |    1.3.7 |      ✓ |  90854.4   |   11.11 |         16.20 |
| micro-route              |    2.5.0 |      ✓ |  86720.0   |   11.65 |         15.47 |
| fastify                  |   3.29.0 |      ✓ |  84147.2   |   11.88 |         15.00 |
| koa                      |   2.13.4 |      ✗ |  77619.2   |   13.32 |         13.85 |
| nest-fastify             |    8.4.3 |      ✓ |  75145.6   |   12.81 |         12.61 |
| koa-isomorphic-router    |    1.0.1 |      ✓ |  70848.0   |   14.08 |         12.64 |
| koa-router               |   10.1.1 |      ✓ |  69324.8   |   14.68 |         12.36 |
| restify                  |    8.6.1 |      ✓ |  67004.8   |   14.73 |         12.08 |
| microrouter              |    3.1.3 |      ✓ |  57475.2   |   17.12 |         10.25 |
| hapi                     |   20.2.2 |      ✓ |  50534.4   |   19.26 |          9.02 |
| express                  |   4.18.1 |      ✓ |  20784.0   |   48.98 |          3.71 |
| nest                     |    8.4.3 |      ✓ |  19212.8   |   54.05 |          4.38 |
| express-route-prefix     |   4.18.1 |      ✓ |  18840.8   |   52.59 |          6.97 |
| express-with-middlewares |   4.18.1 |      ✓ |  17724.8   |   57.96 |          6.59 |
| tsed-koa                 | 6.114.17 |      ✓ |  16972.8   |   60.24 |          3.30 |
| fastify-big-json         |   3.29.0 |      ✓ |  13408.8   |   73.67 |        154.30 |
| tsed-express             | 6.114.17 |      ✓ |  11788.8   |   87.82 |          2.16 |
| tsed-express-crypto-uuid | 6.114.17 |      ✓ |  11704.0   |   88.13 |          2.53 |
| tsed-express-uuid        | 6.114.17 |      ✓ |  11478.4   |   88.04 |          2.44 |
