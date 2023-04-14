import React from 'react'


const secondCountDown = async (saniye:number): Promise<any> =>{
    var interval:NodeJS.Timer = setInterval(function() {
      if (saniye <= 0) {
        clearInterval(interval);
        return {second: 0, status: "done"};
      } else {
        saniye--;
        return {second: saniye, status: "counting"};
        
      }
    }, 1000);
}

export default secondCountDown;