import { useState } from 'react';
import { Link } from 'react-router';


export function Header () {
  const [ menuOpen, setMenuOpen ] = useState( false )

  return (
    <>
      <header className= 'fixed inset-x-0 top-0 z-90 bg-white border-b border-black'>
        <div className= 'grid h-20 grid-cols-[1fr_auto_1fr] items-stretch'>

          { /** Title */ }
          <div className= 'flex items-center px-5 border-r border-black'>
            <Link
              to= '/'
              className= 'group flex items-center font-display text-4xl leading-none'
              aria-label= 'komed3 home'
            >
              <span className= 'text-brutal-blue'>k</span>omed3
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}
