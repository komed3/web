import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';


export function Header () {
  const [ menuOpen, setMenuOpen ] = useState( false );
  const location = useLocation();

  useEffect( () => setMenuOpen( false ), [ location.pathname ] );

  useEffect( () => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [ menuOpen ] );

  return (
    <>
      { /** Header */ }
      <header className= 'fixed inset-x-0 top-0 z-98 bg-white'>
        <div className= 'flex justify-between items-center h-24 px-7 md:px-12 lg:px-16'>
          { /** Title */ }
          <Link
            to= '/'
            className= 'font-display text-2xl font-800 tracking-wider'
          >
            komed3
          </Link>
        </div>
      </header>
    </>
  );
}
