import { usePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';


function MenuButton ( { open, onClick }: { open: boolean, onClick: () => void } ) {
  const [ isPresent, safeToRemove ] = usePresence();

  useEffect( () => {
    if ( isPresent ) return;

    const timer = window.setTimeout( safeToRemove, 700 );
    return () => window.clearTimeout( timer );
  }, [ isPresent, safeToRemove ] );

  const active = open && isPresent;

  return (
    <button
      type= 'button'
      onClick= { onClick }
      className= { 'flex items-center gap-4 h-12 ' + ( open && 'text-white' ) }
      aria-label= { open ? 'Close menu' : 'Open menu' }
    >
      <span className= 'font-mono text-[11px] font-500 tracking-[0.2em]'>
        { open ? 'CLOSE' : 'MENU' }
      </span>
    </button>
  );
}


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

          { /** Menu Opener */ }
          <MenuButton
            open= { false }
            onClick= { () => setMenuOpen( true ) }
          />
        </div>
      </header>
    </>
  );
}
