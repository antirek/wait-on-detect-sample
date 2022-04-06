const delay = require('delay');

class Manager {
  constructor() {
    this.queueNotReady = [];
    this.queueReady = [];
    this.counter = 0;
  }
  
  ready (id) {
    const ready = this.queueReady.find(c => c.id === id );
    if (ready) {
      if (this.queueReady.find(c => c.counter < ready.counter)) {
        return false;
      } else {
        return true;
      }
    }

    if (this.queueNotReady.find(c => c.id === id )) {
      return false;
    }

    this.counter++;

    const timeout = (this.queueNotReady.length + 1) * 15 * 1000;
    const notReadyObj = {
      id,
      callback: () => {
        setTimeout(() => {
          this.queueNotReady = this.queueNotReady.filter(c => c.id !== id);
          const readyObj = {
            id,
            counter: this.counter,
            callback: setTimeout(() => {
              this.queueReady = this.queueReady.filter(c => c.id !== id)
            }, 15 * 1000),
          };          
          this.queueReady.push(readyObj);
        }, timeout);
      }
    };
    notReadyObj.callback();
    this.queueNotReady.push(notReadyObj);

    return false;
  }

  getNotReadyQueue () {
    return this.queueNotReady;
  }
  getReadyQueue () {
    return this.queueReady;
  }
}


const start = async () => {
  const m = new Manager();

  const r1 = '1212';
  const r2 = '1213';
  const r3 = '1214';

  console.log('start', r1, m.ready(r1),);
  await delay(2 * 1000);
  console.log(r2, m.ready(r2));
  await delay(3 * 1000);
  console.log(r3, m.ready(r3));

  for (const r of [...Array(100).keys()]) {
    console.log(r, r1, m.ready(r1), r2, m.ready(r2), r3, m.ready(r3),);  
    console.log(r, m.getNotReadyQueue().length, m.getReadyQueue().length);
    //console.log(r, m.getNotReadyQueue(), m.getReadyQueue());
    await delay(1 * 1000);
  }
}

(start)();
