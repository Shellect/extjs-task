const http = require('http');
const {URL} = require('url');
const {faker} = require('@faker-js/faker');

const hostname = '127.0.0.1';
const port = 3000;

class Router {

    constructor() {
        this.routes = [];
    }

    get(path, callback) {
        return this.setRoute({method: "GET", path, callback});
    }

    post(path, callback) {
        return this.setRoute({method: "POST", path, callback});
    }

    options(path, callback) {
        return this.setRoute({method: "OPTIONS", path, callback});
    }

    setRoute({method, path, callback}) {
        this.routes.push({method, path, callback});
    }

    use(middleware) {
        this.middleware = middleware;
    }

    handler() {
        return (function (req, res) {
            const method = req.method;
            const url = (new URL(req.url, `http://${hostname}:${port}`));
            this.handle({method, url, req, res});
        }).bind(this)
    }

    handle({method, url, req, res}) {
        if (typeof this.middleware === "function") {
            this.middleware(res);
        }
        const route = this.routes.find(route => route.method === method && (route.path === '*' || route.path === url.pathname));
        if (route) {
            route.callback(req, res, url);
        } else {
            res.writeHead(404).end("404 Page Not Found");
        }
    }
}

let router = new Router();

router.use(res => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
});

router.options('*', (req, res) => {
    res.end();
})

router.get('/users', (req, res, url) => {
    const content = JSON.stringify([
        {"username": faker.person.fullName(), "id": 1},
        {"username": faker.person.fullName(), "id": 2},
    ]);
    const searchParams = url.searchParams;
    const callback = searchParams.get('callback');
    if (callback) {
        res.setHeader('Content-Type', 'text/javascript');
        res.end(`${callback}(${content});`);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(content);
    }
});

router.get('/products', (req, res) => {
    const content = []
    for (let i = 1; i < 10; i++) {
        content.push({
            id: i,
            city: faker.location.city(),
            person: faker.person.firstName(),
            product: faker.commerce.product(),
            value: faker.commerce.price()
        });
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({rows: content}));
});

router.get('/task9', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: 1, test2: [0, 1], text1: 'asd', text2: 'dfg', cmb: 3}));
});

router.get('/articles', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const cnt = Math.floor(Math.random() * 7 + 3);
    let articles = [...Array(cnt)].map(() => {
        return {title: faker.lorem.slug(), content: faker.lorem.text()}
    });
    let likes = [...Array(cnt)].map(() => {
        return {person: faker.person.fullName(), vote: faker.number.int()}
    })
    res.end(JSON.stringify({data: {articles, likes}}))
});

router.get('/long-load', (req, res) => {
    setTimeout(() => res.end("Success"), 2000);
})

http.createServer(router.handler()).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});