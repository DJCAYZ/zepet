"use client";

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Orbitron } from 'next/font/google';

import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ["latin"],
});

const countdownToEOD = dayjs()
  .hour(19)
  .minute(0)
  .second(0);

export default function Countdown() {
  const [time, setTime] = useState(dayjs());
  
  const diff = countdownToEOD.diff(time);
  
  useEffect(() => {
    function updateTime() {
      setTime(dayjs());
    }

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className={`text-7xl tracking-widest ${orbitron.className}`}
      suppressHydrationWarning
    >
      {diff > 0
        ? dayjs.duration(countdownToEOD.diff(time)).format("HH:mm:ss")
        : time.format('hh:mm:ss A')
      }
    </p>
  )
}