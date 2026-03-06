"use client";
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import objectSupport from 'dayjs/plugin/objectSupport';
import duration from 'dayjs/plugin/duration';

// extend dayjs with all necessary plugins
dayjs.extend(objectSupport);
dayjs.extend(duration);

export default function Home() {

  // target time set to today's 5:00 PM local time
  const countdownTo = dayjs()
    .hour(17)
    .minute(0)
    .second(0)
    .millisecond(0);

  const [timeMode, setTimeMode] = useState<'zepet' | 'ph_time'>('ph_time');
  const [time, setTime] = useState(dayjs());

  // whether user is hovering over the image
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // keep the clock updated
    function updateTime() {
      setTime(dayjs())
    }

    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  // preload hover gif to avoid delay
  useEffect(() => {
    const pre = new Image();
    pre.src = '/gifs/chipe.gif';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col gap-4 items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <img
          className={
            `${hovered ? 'rounded-none' : 'rounded-full'}
            aspect-square object-cover object-top
            w-90 h-90`
          }
          alt='zepe'
          src={hovered ? '/gifs/chipe.gif' : '/images/chipe.jpg'}
          width={360}
          height={360}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <p className='tracking-widest text-lg'>Zepet</p>

        {timeMode === 'zepet' ? (
          (() => {
            const diff = countdownTo.diff(time); // milliseconds remaining
            if (diff <= 0) {
              return <p onClick={() => setTimeMode('ph_time')}>Time's up!</p>;
            }
            const dur = dayjs.duration(diff);
            const parts = [];
            if (dur.days() > 0) parts.push(`${dur.days()}d`);
            parts.push(
              `${String(dur.hours()).padStart(2, '0')}:${String(dur.minutes()).padStart(2, '0')}:${String(dur.seconds()).padStart(2, '0')}`
            );
            return (
              <p
                className='text-7xl text-center font-bold cursor-pointer'
                onClick={() => setTimeMode('ph_time')}
                suppressHydrationWarning
              >
                {parts.join(' ')}
              </p>
            );
          })()
        ) : (
          <p
            className='text-7xl text-center font-bold cursor-pointer'
            onClick={() => setTimeMode('zepet')}
            suppressHydrationWarning
          >
            <span className='text-lg font-normal'>{time.format('MMMM DD, YYYY')}</span>
            <br />
            {time.format('hh:mm:ss A')}
          </p>
        )}
      </main>
    </div>
  );
}
