// import https module
const https = require('https');

//import fs module to read files
const fs = require('fs');

const options = {
    key: fs.readFileSync('../../openssl/ssl.key'),
    cert: fs.readFileSync('../../openssl/ssl.crt')
};

// create https server port 3000
https.createServer(options, (req, ers) => {
    resizeBy.writeHead(200);
    resizeBy.send('Hello world from https server \n');
}).listen(3000);
