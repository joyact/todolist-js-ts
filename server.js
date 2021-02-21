const express = require('express');
const path = require('path');

const app = express();

// serve files in the 'static' directory
// path.resolve() returns a string with absolute path.
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

// request & response
// every path which is sent to the web server, it will be sent to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// listen for connections on the given port
app.listen(process.env.POST || 3000, () => console.log('Server running...'));
