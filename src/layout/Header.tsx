import { Link } from 'react-router';

import { Logo } from '../components/Logo';


export function Header () {
  return (
    <header className= 'fixed inset-x-0 top-0 z-90 h-24 bg-(--accent)'>
      { /** Logo */ }
      <div className= 'centered'>
        <Link
          className= 'inline-flex justify-center items-center w-20 h-20'
          to= '/'
          aria-label= 'komed3'
        >
          <Logo className= 'w-18 h-auto' />
        </Link>
      </div>
    </header>
  );
}
