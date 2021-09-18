const http = require("http");
const axios = require("axios");
const chalk = require("chalk")

const router = (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3333',
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

        if (req.url.includes("/proxy_domain_d_card/")) {
            const urlPath = req.url.replace("/proxy_domain_d_card/", "https://www.dcard.tw/v2/")
            axios
                .get(urlPath)
                .then(response => {
                    console.log(response);
                    res.write(JSON.stringify(response.data))
                    return res.end();
                })
                .catch(error => {
                    res.write(JSON.stringify(error))
                    return res.end();
                })
        }
    }
}

console.info(chalk.bold.hex("#21d9cc")("Proxy starting..."));
const server = http.createServer(router);

server.listen(5000);

