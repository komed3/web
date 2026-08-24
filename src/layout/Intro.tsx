import komed3 from '../assets/komed3.svg';


export function Intro () {
  return (
    <div className= 'flex flex-col justify-center gap-6 w-full h-screen p-24'>
      <img
        src= { komed3 }
        className= 'max-w-5xl'
        loading= 'lazy'
        alt= 'komed3.'
      />

      <p className= 'max-w-5xl uppercase text-3xl'>
        Hi, I'm a freelance software developer focusing on Node.js, data visualization, and
        modern web technology.
      </p>
    </div>
  );
}
