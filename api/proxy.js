const http = require("http");
const https = require('https');
const axios = require("axios");

const options = {
    hostname: 'www.dcard.tw',
    path: '/v2/posts?popular=true',
    method: 'GET'
}


const router = (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days,
        'Content-Type': "application/json; charset=utf-8",
        /** add other headers as per requirement */
    };

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (['GET', 'POST'].indexOf(req.method) > -1) {
        res.writeHead(200, headers)
        const body = [];
        if (req.url === "/proxy_domain/posts") {
            axios.get("https://www.dcard.tw/v2/posts?popular=true")
                .then(response => {
                    res.write(JSON.stringify(response.data))
                    res.end();
                })
        }
    }

    // res.writeHead(405, headers);
    // return res.end(`${req.method} is not allowed for the request.`)
}

const server = http.createServer(router)

server.listen(5000);

