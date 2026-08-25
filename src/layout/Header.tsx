import { motion, usePresence } from 'motion/react';
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

      <span className= 'relative w-14 h-12'>
        <motion.span
          initial= { { top: '17px', rotate: 0, scaleX: 1 } }
          transition= { { duration: 0.7, ease: [ 0.76, 0, 0.24, 1 ] } }
          animate= { active ? {
            top: [ '17px', '24px', '24px' ],
            rotate: [ 0, 0, 45 ],
            scaleX: [ 1, 1, 0.9 ]
          } : {
            top: [ '24px', '24px', '17px' ],
            rotate: [ 45, 0, 0 ],
            scaleX: [ 0.9, 1, 1 ]
          } }
          className= 'absolute left-0 w-14 h-px origin-center bg-current'
        />

        <motion.span
          initial= { { top: '31px', rotate: 0, scaleX: 1 } }
          transition= { { duration: 0.7, ease: [ 0.76, 0, 0.24, 1 ] } }
          animate= { active ? {
            top: [ '31px', '24px', '24px' ],
            rotate: [ 0, 0, -45 ],
            scaleX: [ 1, 1, 0.9 ]
          } : {
            top: [ '24px', '24px', '31px' ],
            rotate: [ -45, 0, 0 ],
            scaleX: [ 0.9, 1, 1 ]
          } }
          className= 'absolute left-0 w-14 h-px origin-center bg-current'
        />
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
