const { promisify } = require('util');
const { exec } = require('child_process')

setInterval(async () => {
  // CPU温度
  const tempOut = await promisify(exec)('vcgencmd measure_temp');
  const temperature = parseFloat(tempOut.stdout.replace(/temp=([0-9\.]*)'C/, '$1'));
  
  // CPU
  const clockOut = await promisify(exec)('vcgencmd measure_clock arm');
  const clock = parseInt(clockOut.stdout.replace(/frequency.*=([0-9\.]*)/, '$1'));
  
  // 電圧
  const voltOut = await promisify(exec)('vcgencmd measure_volts');
  const volt = parseFloat(voltOut.stdout.replace(/volt=([0-9\.]*)V/, '$1'));
  
  // メモリー
  const memOut = await promisify(exec)('free');
  const lines = memOut.stdout.split(/\r\n|\r|\n/);
  let params = lines[1].split(/\s+/);
  const memory = {
    total: params[1],
    used: params[2],
    free: params[3],
    shared: params[4],
    cache: params[5],
    available: params[6]
  };
  params = lines[2].split(/\s+/);
  const swap = {
    total: params[1],
    used: params[2],
    free: params[3]
  }
  console.log(`temperature: ${temperature} clock: ${clock} volt: ${volt} memory: ${JSON.stringify(memory)} swap: ${JSON.stringify(swap)}`);
}, 5000);
