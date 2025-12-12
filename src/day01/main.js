const { encryptInputFile, getInputFile} = require('../helper');

const lines = getInputFile(1).split("\n");

const countZeros = (stepByStep) => {
    let position = 50;
    let zeroCount = 0;
  
    for (const line of lines) {
      const distance = parseInt(line.substring(1));
      const step = line[0] === "L" ? -1 : 1;
  
      if (stepByStep) {
        for (let i = 0; i < distance; i++) {
          position = (position + step + 100) % 100;
          if (position === 0) zeroCount++;
        }
      } else {
        position = (position + step * distance + 100) % 100;
        if (position === 0) zeroCount++;
      }
    }
  
    return zeroCount;
  };

  const countZerosGolfed =(l,s,p=50,z=0)=>{
    for(const x of l){
      let d=+x.slice(1),k=x[0]=="L"?-1:1
      if(s)for(;d--;)((p=(p+k+100)%100)||0)||z++
      else((p=(p+k*d+100)%100)||0)||z++
    }
    return z
  }
  
  console.log(countZeros(false));
  console.log(countZeros(true));
  console.log(countZerosGolfed(lines, true))
  console.log(countZerosGolfed(lines, false))