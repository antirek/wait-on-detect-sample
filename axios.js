const axios = require('axios');

async function start () {
  try {
    await axios.get('http://localhost:3000/status', {
      timeout: 500,
    });
  }catch (error) {
    console.log(error);
    console.log(error.code);
  }
}

(start)();
