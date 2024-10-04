// import http module for create server
const http = require('http');

//create server and api for test
http.createServer(function (req, res) {
    if (req.url === "/api/test" && req.method === "GET") {
        console.time('API_Without_cluster');
        let result = 0;
        for (let i =0; i < 5000000; i++) {
            result += i;
        }
        console.timeEnd('API_Without_cluster');
        console.log(`Result = ${result} - on process ${process.pid}`);
        res.end(`Result = ${result}`);
    }
}).listen(3001);