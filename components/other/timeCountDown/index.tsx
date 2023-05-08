"use client";

import React, { useEffect, useState } from "react";
import CalculateTime from "@/functions/other/calculateTime";

interface dataProps {
  startBannerTime?: string;
  endBannerTime?: string;
  mainText?: string;
  detailText?: string;
  isActive?: boolean;

  mainTextColor?: string;
  underTextColor?: string;
  buttonColor?: string;
  backgroundColor?: string;

  error?: any;
}

interface Props {
  data?: dataProps;
}


export const TimeCountDown: React.FC<Props> = ({ data }) => {


  // veri tabanından gelen verileri üzerinde güncel tutacak olan state.
  const [time, setTime] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  
// ilk başlatma anında props olarak gelen verileri "CalculateTime" e gönderir ve (ay - gün - saat - dakika - saniye) olarak ayrıştırır.
// ve bu değerleri "time" state'ine atar.
  useEffect(() => {
    if (data && data.endBannerTime) {
      const { months, days, hours, minutes, seconds } = CalculateTime(data.endBannerTime);

      if(months != 0 || days != 0 || hours != 0 || minutes != 0 || seconds != 0){
        setTime({
          months,
          days,
          hours,
          minutes,
          seconds,
        });
      } 
    }
  }, [])

 
// her saniye başı çalışır ve "time" state'indeki değerleri günceller.
  useEffect(() => {
    
    if(time.seconds != 0 || time.minutes != 0 || time.hours != 0 || time.days != 0 || time.months != 0){
      const timeOut = setInterval(() => {

        let data = {
          months: time.months,
          days: time.days,
          hours: time.hours,
          minutes: time.minutes,
          seconds: time.seconds,
        }
        
        if(data.seconds != 0 && data.seconds != undefined){
          data.seconds = data.seconds - 1;
        }else if(data.minutes != 0 && data.minutes != undefined){
          data.minutes = data.minutes - 1;
          data.seconds = 59;
        }else if(data.hours != 0 && data.hours != undefined){
          data.hours = data.hours - 1;
          data.minutes = 59;
          data.seconds = 59;
        }else if(data.days != 0 && data.days != undefined){
          data.days = data.days - 1;
          data.hours = 23;
          data.minutes = 59;
          data.seconds = 59;
        }else if(data.months != 0 && data.months != undefined){
          data.months = data.months - 1;
          data.days = 30;
          data.hours = 23;
          data.minutes = 59;
          data.seconds = 59;
        }
        setTime(data);   
  
          clearInterval(timeOut);
        },1000);
    }
    
  }, [time]);

  return (
    <div>
      {data && (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          {time.months > 0 && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content  border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.months < 10 && 0}{time.months}</span>
              </span>
              Ay
            </div>
          )}
          {(time.days > 0 || time.months > 0) && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content  border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.days < 10 && 0}{time.days}</span>
              </span>
              Gün
            </div>
          )}
          {(time.hours > 0 || time.days > 0 || time.months > 0) && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.hours < 10 && 0}{time.hours}</span>
              </span>
              Saat
            </div>
          )}
          {(time.minutes > 0 || time.hours > 0 || time.days > 0 || time.months > 0) && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content  border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.minutes < 10 && 0}{time.minutes}</span>
              </span>
              Dakika
            </div>
          )}
          {(time.seconds >= 0 || time.minutes > 0 || time.hours > 0 || time.days > 0 || time.months > 0) && (time.seconds != 0 || time.minutes != 0 || time.hours != 0 || time.days != 0 || time.months != 0) && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content  border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.seconds < 10 && 0}{time.seconds}</span>
              </span>
              Saniye
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeCountDown;
