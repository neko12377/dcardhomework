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
    };

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        return res.end();

    }

    if (['GET', 'POST'].indexOf(req.method) > -1) {
        res.writeHead(200, headers)
        // if (req.url === "/proxy_domain/posts") {
        //     https
        //         .get("https://www.dcard.tw/v2/posts?popular=true", response => {
        //             const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        //             console.log('Status Code:', res.statusCode);
        //             console.log('Date in Response header:', headerDate);
        //
        //             let body = [];
        //             response.on("data", chunk => {
        //                 body.push(chunk)
        //             });
        //             response.on("end", () => {
        //                 console.info(JSON.parse(Buffer.concat(body).toString()))
        //                 return res.end(error.toString())
        //             })
        //         })
        //         .on("error", error => {
        //             console.info(error)
        //             return res.end("failure")
        //         })
        // }

        if (req.url === "/proxy_domain/posts") {
            axios
                .get("https://www.dcard.tw/v2/posts?popular=true")
                .then(response => {
                    res.write(JSON.stringify(response.data))
                    return res.end();
                })
        }
    }

    // res.writeHead(405, headers);
    // return res.end(`${req.method} is not allowed for the request.`)
}

const server = http.createServer(router)

server.listen(5000);

