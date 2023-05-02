import React from "react";

interface dateTypes {
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

// verinin aldığı tip -> "2023-05-12T17:44" şeklinde bir sitring ifade benzeri olmalıdır.
const calculateTime = (time:string): dateTypes => {
    const date = new Date(time); // gelen string ifadeyi Date objesine çevirme
    const now = new Date(); // şu anki tarih ve zaman
  
    // farkı hesapla
    const diffInMilliseconds = Math.abs(now.getTime() - date.getTime()); // farkı milisaniye cinsinden hesapla
  
    // sonucu hesapla
    const seconds = Math.floor(diffInMilliseconds / 1000) % 60;
    const minutes = Math.floor(diffInMilliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) % 30; // varsayılan olarak ayın son gününe kadar hesaplanıyor
    const months = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
  
    return {
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  }

    export default calculateTime;