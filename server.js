const express = require('express');
const app = express();
const port = 3000;
const promClient = require('prom-client');

const register = new promClient.Registry();

const httpRequestsTotal = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

register.registerMetric(httpRequestsTotal);

app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestsTotal.inc({
            method: req.method,
            route: req.route ? req.route.path : req.url,
            status_code: res.statusCode
        });
    });
    next();
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
