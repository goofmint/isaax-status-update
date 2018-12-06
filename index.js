const { promisify } = require('util');
const { exec } = require('child_process')

setInterval(async () => {
  const tempOut = await promisify(exec)('vcgencmd measure_temp');
  const temperature = parseFloat(tempOut.stdout.replace(/temp=([0-9\.]*)'C/, '$1'));
  
  const clockOut = await promisify(exec)('vcgencmd measure_clock arm');
  const clock = parseInt(clockOut.stdout.replace(/frequency.*=([0-9\.]*)/, '$1'));
  
  const voltOut = await promisify(exec)('vcgencmd measure_volts');
  const volt = parseFloat(voltOut.stdout.replace(/volt=([0-9\.]*)V/, '$1'));
  
  const memOut = await promisify(exec)('free');
  const lines = memOut.stdout.split(/\r\n|\r|\n/);
  console.log('lines.0', lines[0].split(/\s+/))
  console.log('lines.1', lines[1].split(/\s+/))
  console.log('lines.2', lines[2].split(/\s+/))
  console.log(`temperature: ${temperature} clock: ${clock} volt: ${volt}`)
}, 5000);
