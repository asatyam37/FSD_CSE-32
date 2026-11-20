const express = require('express')
const http = require('http')

const app = express();


const server  = http.createServer((req, res) => {
    console.log(`Server running on http://localhost:4000`);
})


