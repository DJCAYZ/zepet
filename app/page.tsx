"use client";
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import objectSupport from 'dayjs/plugin/objectSupport';
import duration from 'dayjs/plugin/duration';

import Chipe from './chipe.jpg';
import Image from 'next/image';

// extend dayjs with all necessary plugins
dayjs.extend(objectSupport);
dayjs.extend(duration);

export default function Home() {

  // target time can be any dayjs object; update as needed
  const countdownTo = dayjs("2026-03-06 17:00");

  const [time, setTime] = useState(dayjs());

  // toggle between showing image and showing video
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    function updateTime() {
      setTime(dayjs())
    }

    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col gap-4 items-center justify-center py-32 px-16 bg-white dark:bg-black">
        {showVideo ? (
          <video
            className='rounded-full'
            width={240}
            height={240}
            controls
            autoPlay
            onClick={() => setShowVideo(false)} // click video to go back to image
          >
            <source src="/video/yeah.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <Image
              className='rounded-full cursor-pointer'
              alt='zepe'
              src={Chipe}
              height={240}
              onClick={() => setShowVideo(true)}
            />
            <p className='tracking-widest'>Zep Et</p>
          </>
        )}
        {/* compute difference and format using duration plugin */}
        {
          (() => {
            const diff = countdownTo.diff(time); // milliseconds remaining
            if (diff <= 0) {
              return <p>Time's up!</p>;
            }
            const dur = dayjs.duration(diff);
            const parts = [];
            if (dur.days() > 0) parts.push(`${dur.days()}d`);
            parts.push(
              `${String(dur.hours()).padStart(2, '0')}:${String(dur.minutes()).padStart(2, '0')}:${String(dur.seconds()).padStart(2, '0')}`
            );
            return <p className='text-7xl text-center font-bold'>{parts.join(' ')}</p>;
          })()
        }
      </main>
    </div>
  );
}
