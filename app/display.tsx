"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function Display() {
  const [displayGif, setDisplayGif] = useState(false);

  return (
    <div className='rounded-full w-80 h-80 p-2 bg-gray-600 flex justify-center items-center'
      onClick={() => setDisplayGif(!displayGif)}
    >
      {!displayGif ? (
        <Image
          src={'/images/chipe.jpg'}
          alt='chipe'
          width={2975}
          height={3480}
          className='rounded-full w-full h-full object-cover object-top'
        />
      ) : (
        <p>GIF here</p>
      )}
    </div>
  )
}