const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
