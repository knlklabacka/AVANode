// Import cluster module
const cluster = require('cluster');

// Import https module for create server
const http = require('http');

// Check if it is master process then create child process through fork() method
if (cluster.isMaster){
    const numWorkers = require('os').cpus().length;
    console.log(`Master ${process.pid} started`);
    console.log(`Number of workers => ${numWorkers}`);

    for (let i = 0; i < numWorkers; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's form another worker!");
        cluster.fork();
    });
}else{
    // it is worker process so run multiple process with same 3000 port
    console.log(`Worker ${process.pid} started`);
    http.createServer(function (req, res) {
        if (req.url === "/api/test" && req.method === "GET") {
            console.time('API_with_cluster')
            let result = 0

            for (let i = 0; i < 5000000; i++) {
                result += 1;
            }

            console.timeEnd('API_with_cluster');
            console.log(`Result = ${result} - on process ${process.pid}`);
            res.end(`Result = ${result}`);

        }
    }).listen(3000);
}

