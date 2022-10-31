import Timer from '../lib/timer';

const timer = new Timer();

async function checkTimerValidationWithForLoop() {
  for (var i = 0; i < 1000; i++) {
    await timer.check();

    // console.warn(i);
  }
}

async function checkTimerValidationWithWhileLoop() {
  let i = 0;
  while (i < 1000) {
    await timer.check();

    i++;
  }
}
