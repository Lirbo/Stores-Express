const express = require('express');
const PORT = process.env.PORT || 3500;
const server = express();
server.use(express.json());

server.use(`/api/stores`, require('./routes/stores'));

server.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
});