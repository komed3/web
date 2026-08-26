import { Link } from 'react-router';

import { Logo } from '../components/Logo';


export function Header () {
  return (
    <header className= 'fixed inset-x-0 top-0 z-90 h-24'>
      { /** Tech Stack */ }
      <div className= 'centered-y left-10'>
        <Link
          className= 'inline-flex justify-center items-center w-fit h-10 px-6 text-lg font-black'
          to= '/stack'
        >
          <span>Tech Stack</span>
        </Link>
      </div>

      { /** Logo */ }
      <div className= 'centered'>
        <Link
          className= 'inline-flex justify-center items-center w-20 h-20 font-display text-4xl'
          to= '/'
          aria-label= 'komed3'
        >
          <Logo className= 'w-18 h-auto' />
        </Link>
      </div>

      { /** Projects */ }
      <div className= 'centered-y right-10'>
        <Link
          className= 'inline-flex justify-center items-center w-fit h-10 px-6 text-lg font-black'
          to= '/index'
        >
          <span>Projects</span>
        </Link>
      </div>
    </header>
  );
}
