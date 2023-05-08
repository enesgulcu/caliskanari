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

interface dateTypes {
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const TimeCountDown: React.FC<Props> = ({ data }) => {


  const [time, setTime] = useState<dateTypes>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

 

  useEffect(() => {
    
    const timeOut = setInterval(() => {
        if (data && data.endBannerTime) {
            const { months, days, hours, minutes, seconds } = CalculateTime(data.endBannerTime);
            if(months > 0 || days > 0 || hours > 0 || minutes > 0 || seconds > 0){
              setTime({
                months,
                days,
                hours,
                minutes,
                seconds,
              });
            }
            else{
              clearInterval(timeOut);
            }
          
        }
        clearInterval(timeOut);
      },1000);
    

  }, [time]);

  return (
    <div>
      {data && (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          {time.months != undefined && time.months > 0 && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content  border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.months}</span>
              </span>
              Ay
            </div>
          )}
          {time.days != undefined && time.days > 0 && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content  border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.days}</span>
              </span>
              Gün
            </div>
          )}
          {time.hours != undefined && time.hours > 0 && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.hours}</span>
              </span>
              Saat
            </div>
          )}
          {time.minutes != undefined && time.minutes > 0 && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content  border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.minutes}</span>
              </span>
              Dakika
            </div>
          )}
          {time.seconds != undefined && time.seconds >= 1 && (
            <div className="flex flex-col p-2 w-20 bg-neutral rounded-xl-box text-neutral-content  border-2 rounded-xl">
              <span className="countdown font-mono text-5xl">
                <span>{time.seconds}</span>
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
