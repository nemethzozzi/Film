require("dotenv").config();

const express = require('express')


const server = express()
server.use(express.json())

server.get('/', (req, res) => {
  res.json({ message: 'I am Son of Hal and am always watching!' })
})



module.exports = server

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n*** Server running on port ${port} ***\n`);
});
