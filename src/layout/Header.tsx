import { AnimatePresence, motion, usePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';


const NAV = [
  [ '01', 'Work', '/work' ],
  [ '02', 'Projects', '/projects' ],
  [ '03', 'About', '/about' ],
  [ '04', 'Skillset', '/skills' ]
] as const;


interface MenuButtonProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  presence?: boolean;
}


function MenuButton ( { label, isOpen, onClick, presence }: MenuButtonProps ) {
  const [ isPresent ] = usePresence();

  const [ wasOpen, setWasOpen ] = useState( isOpen );
  useEffect( () => { if ( isOpen ) setWasOpen( true ) }, [ isOpen ] );

  const open = presence ? isPresent : isOpen;

  const lineAnimation = ( top: string, rotate: number ) => ( {
    initial: {
      top,
      rotate: 0,
      scaleX: 1
    },
    animate: open ? {
      top: [ top, '24px', '24px' ],
      rotate: [ 0, 0, rotate ],
      scaleX: [ 1, 1, 0.9 ]
    } : wasOpen ? {
      top: [ '24px', '24px', top ],
      rotate: [ rotate, 0, 0 ],
      scaleX: [ 0.9, 1, 1 ]
    } : {
      top,
      rotate: 0,
      scaleX: 1
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
        { [
          lineAnimation( '17px', 45 ),
          lineAnimation( '31px', -45 )
        ].map( ( animation, index ) => (
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
            <div className= 'flex flex-col min-h-0 h-full'>
              { /** Menu Header */ }
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

              { /** Main Navigation */ }
              <nav className= 'flex-1 flex flex-col justify-center min-h-0 px-[8vw] py-[3vh]'>
                { NAV.map( ( [ number, label, path ], i ) => (
                  <motion.div
                    key= { path }
                    className= 'flex-1 min-h-0'
                    initial= { { x: i % 2 === 0 ? '-4vw' : '4vw', y: '3vh' } }
                    animate= { { x: 0, y: 0 } }
                    transition= { {
                      duration: 0.55,
                      delay: 0.18 + i * 0.06,
                      ease: [ 0.16, 1, 0.3, 1 ]
                    } }
                  >
                    <Link
                      to= { path }
                      onClick= { () => setMenuOpen( false ) }
                      className= {
                        'group flex items-center gap-7 h-full min-h-0 font-sans font-800 ' +
                        'leading-[0.8] -tracking-widest hover:text-brutal-yellow transition-colors ' +
                        ( i % 2 === 1 && 'ml-[10vw] ' ) + ( i === 3 && 'ml-[5vw]' )
                      }
                    >
                      <span className= 'shrink-0 font-mono text-[11px] tracking-normal'>
                        { number }
                      </span>

                      <span className= 'whitespace-nowrap uppercase text-[clamp(3rem,9vw,10rem)]'>
                        { label }
                      </span>
                    </Link>
                  </motion.div>
                ) ) }
              </nav>

              { /** Menu Footer */ }
              <div
                className= {
                  'shrink-0 flex justify-between px-7 md:px-12 lg:px-16 py-6 border-t ' +
                  'border-white font-mono text-[11px] uppercase tracking-widest'
                }
              >
                <span>Building open-source since 2010</span>
                <span>Copyright { new Date().getFullYear() } by komed3</span>
              </div>
            </div>
          </motion.div>
        ) }
      </AnimatePresence>
    </>
  );
}
