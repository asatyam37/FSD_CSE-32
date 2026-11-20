const http = require('http')

const server = http.createServer((req, res)=>{
    res.writeHead(200, {"content-type": "text/plain"});
    res.end("Hello World");

});

server.listen(3000, ()=>{
    console.log("Sever is running at port 3000")
})
