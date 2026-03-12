import Countdown from './countdown';
import Display from './display';

export default async function HomePage() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col gap-4 items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <Display />
        <p className='text-xl text-gray-400 tracking-widest font-mono'>Zepet</p>
        <Countdown />
      </main>
    </div>
  )
}