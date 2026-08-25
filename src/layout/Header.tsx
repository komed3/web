import { AnimatePresence, motion, usePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';


interface MenuButtonProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  presence?: boolean;
}


function MenuButton ( { label, isOpen, onClick, presence }: MenuButtonProps ) {
  const [ isPresent ] = usePresence();
  const open = presence ? isPresent : isOpen;

  const lineAnimation = ( top: string, rotate: number ) => ( {
    initial: false,
    animate: open ? {
      top: [ top, '24px', '24px' ],
      rotate: [ 0, 0, rotate ],
      scaleX: [ 1, 1, 0.9 ]
    } : {
      top: [ '24px', '24px', top ],
      rotate: [ rotate, 0, 0 ],
      scaleX: [ 0.9, 1, 1 ]
    },
    transition: {
      duration: 0.7,
      ease: [ 0.76, 0, 0.24, 1 ] as const
    }
  } );

  return (
    <button
      type= 'button'
      onClick= { onClick }
      className= 'flex items-center gap-4 h-12'
      aria-label= { label }
    >
      <span className= 'font-mono text-[11px] font-500 tracking-[0.18em]'>
        { label }
      </span>

      <span className= 'relative w-14 h-12'>
        { [ lineAnimation( '17px', 45 ), lineAnimation( '31px', -45 ) ].map( ( animation, index ) => (
          <motion.span
            key= { index } { ...animation }
            className= 'absolute left-0 w-14 h-px origin-center bg-current'
          />
        ) ) }
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
            label= 'MENU'
            isOpen= { menuOpen }
            onClick= { () => setMenuOpen( true ) }
            presence= { false }
          />
        </div>
      </header>

      { /** Menu */ }
      <AnimatePresence>
        { menuOpen && (
          <motion.div
            className= 'fixed inset-0 z-99 h-dvh text-white bg-brutal-blue'
            initial= { { clipPath: 'circle(0% at 100% 0%)' } }
            transition= { { duration: 0.7, ease: [ 0.76, 0, 0.24, 1 ] } }
            animate= { { clipPath: 'circle(150% at 100% 0%)' } }
            exit= { { clipPath: 'circle(0% at 100% 0%)' } }
          >
            { /** Menu Header */ }
            <div className= 'flex flex-col min-h-0 h-full'>
              <div className= 'shrink-0 flex justify-between items-center h-24 px-7 md:px-12 lg:px-16 border-b border-white'>
                { /** Title */ }
                <Link
                  to= '/'
                  onClick= { () => setMenuOpen( false ) }
                  className= 'font-display text-2xl font-800 tracking-wider'
                >
                  komed3
                </Link>

                { /** Menu Closer */ }
                <MenuButton
                  label= 'CLOSE'
                  isOpen= { menuOpen }
                  onClick= { () => setMenuOpen( false ) }
                  presence= { true }
                />
              </div>
            </div>
          </motion.div>
        ) }
      </AnimatePresence>
    </>
  );
}
