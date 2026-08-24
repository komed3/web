import { MouseIcon } from 'lucide-react';
import komed3 from '../assets/komed3.svg';


export function Intro () {
  return (
    <div className= 'relative flex flex-col justify-center gap-6 w-full h-screen p-24'>
      <img
        src= { komed3 }
        className= 'max-w-5xl pointer-events-none'
        loading= 'lazy'
        alt= 'komed3.'
      />

      <p className= 'max-w-5xl uppercase text-3xl'>
        Hi, I'm a freelance software developer focusing on Node.js, data visualization, and
        modern web technology.
      </p>

      <div className= 'absolute right-24 bottom-24'>
        <MouseIcon
          size= { 120 }
          strokeWidth= { 0.5 }
          className= 'rotate-180'
        />
      </div>
    </div>
  );
}
