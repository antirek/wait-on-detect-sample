var waitOn = require('wait-on');

var opts = {
  resources: [
    'http-get://localhost:3000/status',
  ],
  interval: 2 * 1000,
  timeout: 30 * 1000,
  verbose: true,
};

async function start() {
  try {
    const result = await waitOn(opts);
  } catch (err) {
    console.log('error on start', err);
    process.exit(1);
  }
  console.log('started');
}

(start)();
