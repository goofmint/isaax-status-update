const { promisify } = require('util');
const { exec } = require('child_process')

setInterval(async () => {
  const {tempOut, tempError} = await promisify(exec)('vcgencmd measure_temp');
  const temperature = parseFloat(tempOut.replace(/temp=([0-9\.]*)'C/, '$1'));
  
  const {clockOut, clockError} = await promisify(exec)('vcgencmd measure_clock arm');
  const clock = parseInt(clockOut.replace(/frequency.*=([0-9\.]*)$/, '$1'));
  
  const {voltOut, voltError} = await promisify(exec)('vcgencmd measure_volts');
  const volt = parseFloat(voltOut.replace(/volt=([0-9\.]*)V$/, '$1'));
  
  console.log(`temperature: ${temperature} clock: ${clock} volt: ${volt}`)
}, 5000);
