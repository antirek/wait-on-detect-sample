const express = require('express')
const app = express()
const port = 3000

let isReady = false;

app.get('/status', (req, res) => {
  console.log('/status', isReady);
  setTimeout(() => {
    isReady = true;
  }, 10 * 1000);

  if (!isReady) {
    console.log('isReady', isReady);
    // return res.status(300).json({status: 'fail'});
  }
  // res.json({status: 'ok'});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
