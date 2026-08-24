import { MenuIcon } from 'lucide-react';
import komed3 from '../assets/komed3.svg';


export function Header () {
  return (
    <header className= 'sticky top-0 flex justify-between h-28 text-white bg-black'>
      <div className= 'flex items-center h-full p-7'>
        <img
          src= { komed3 }
          className= 'w-auto h-12 invert-100 pointer-events-none'
          loading= 'lazy'
          alt= 'komed3.'
        />
      </div>

      <button
        className= 'flex justify-center items-center h-full aspect-square bg-brutal-blue'
      >
        <MenuIcon size= { 40 } />
      </button>
    </header>
  );
}
