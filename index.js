const { promisify } = require('util');
const { exec } = require('child_process')

setInterval(async () => {
  const tempOut = await promisify(exec)('vcgencmd measure_temp');
  const temperature = parseFloat(tempOut.stdout.replace(/temp=([0-9\.]*)'C/, '$1'));
  
  const clockOut = await promisify(exec)('vcgencmd measure_clock arm');
  console.log('clockOut', clockOut);
  const clock = parseInt(clockOut.stdout.replace(/frequency.*=([0-9\.]*)/, '$1'));
  
  const voltOut = await promisify(exec)('vcgencmd measure_volts');
  const volt = parseFloat(voltOut.stdout.replace(/volt=([0-9\.]*)V$/, '$1'));
  
  console.log(`temperature: ${temperature} clock: ${clock} volt: ${volt}`)
}, 5000);
