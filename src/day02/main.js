const { getInputFile} = require('../helper');
const lines = getInputFile(2);
const pairs = lines.split(",")
let sum = 0;
pairs.forEach((el) => {
    const [start, end] = el.split("-").map(Number);
  
    for (let i = start; i <= end; i++) {
      const s = i.toString();
  
      if (s.length % 2 !== 0) continue;
  
      const half = s.length / 2;
      const firstHalf = s.slice(0, half);
      const secondHalf = s.slice(half);
  
      if (firstHalf === secondHalf) {
        sum += i;
      }
    }
  });
  console.log(sum)
sum = 0;
  function isInvalidId(num) {
    const s = num.toString();
    const len = s.length;
  
    for (let chunkLen = 1; chunkLen <= len / 2; chunkLen++) {
      if (len % chunkLen !== 0) continue;
  
      const chunk = s.slice(0, chunkLen);
      const repeats = len / chunkLen;
  
      if (chunk.repeat(repeats) === s) {
        return true;
      }
    }
  
    return false;
  }
  
  pairs.forEach((el) => {
    const [start, end] = el.split("-").map(Number);
  
    for (let i = start; i <= end; i++) {
      if (isInvalidId(i)) {
        sum += i;
      }
    }
  });