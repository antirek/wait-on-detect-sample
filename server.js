const express = require('express')
const app = express()
const port = 3000

let fail = false;

app.get('/status', (req, res) => {
  console.log('/status', fail);
  setTimeout(() => {
    fail = true;
  }, 20 * 1000);

  if (!fail) {
    console.log('fail', fail);
    return res.status(300).json({status: 'fail'});
  }
  res.json({status: 'ok'});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
