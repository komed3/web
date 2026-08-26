import { Mouse } from 'lucide-react';


export function Home () {
  return (
    <>
      { /** Intro */ }
      <div className= 'relative flex flex-col justify-center gap-8 h-page p-12 pb-36 bg-white'>
        <h1 className= 'max-w-3xl text-7xl uppercase font-bold'>
          Building free & open-source.
        </h1>

        <p className= 'max-w-3xl text-3xl uppercase'>
          Hi, I'm a freelance software developer focusing on Node.js, data visualization, and
          modern web technology.
        </p>
      </div>
    </>
  );
}
