const express = require('express');

const app = express();

app.use(express.static('./static/front-end'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'static/front-end' }
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)