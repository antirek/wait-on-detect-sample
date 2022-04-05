var waitOn = require('wait-on');

var opts = {
  resources: [
    'http-get://localhost:3000/status',
  ],
  interval: 2 * 1000,
};

async function start() {
  const result = await waitOn(opts);
  console.log('started');
}

(start)();
