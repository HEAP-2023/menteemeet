export const splitObjIntoArrSize = (size, object) => {
    let output = [];
    let i = 0;
    Object.entries(object).forEach(([key,value]) => {
        if(i % size === 0){
            output.push([]);
        }
        output[Math.floor(i / size)].push(value)
        i++; 
   })
   return output
}