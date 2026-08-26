import { Link } from 'react-router';

import { Logo } from '../components/Logo';


export function Footer () {
  return (
    <footer className= 'mx-12 p-12 text-(--bg) bg-(--text)'>
      { /** Meta */ }
      <div className= 'grid grid-cols-2 items-end'>
        { /** Logo */ }
        <div>
          <Link
            to= '/'
            aria-label= 'komed3'
          >
            <Logo className= 'w-48 h-auto' />
          </Link>
        </div>
      </div>
    </footer>
  );
}
