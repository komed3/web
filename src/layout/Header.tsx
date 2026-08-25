import { ArrowUpRightIcon, MenuIcon, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { Link } from 'react-router';


const NAV = [
  { index: '01', label: 'WORK', href: '/work' },
  { index: '02', label: 'SKILLS', href: '/skills' },
  { index: '03', label: 'ABOUT', href: '/about' },
  { index: '04', label: 'STACK', href: '/stack' }
] as const;


export function Header () {
  const [ menuOpen, setMenuOpen ] = useState( false );
  const closeMenu = () => setMenuOpen( false );

  return (
    <>
      { /** Header */ }
      <header className= 'fixed inset-x-0 top-0 z-90 bg-white border-b border-black select-none'>
        <div className= 'grid h-20 grid-cols-[1fr_auto] md:grid-cols-[auto_auto_auto] items-stretch'>

          { /** Title */ }
          <div className= 'flex items-center px-5'>
            <Link
              to= '/'
              className= 'group flex items-center font-display text-4xl leading-none'
              aria-label= 'komed3 home'
            >
              <span className= 'text-brutal-blue'>k</span>omed3
            </Link>
          </div>

          { /** Quote */ }
          <div className= 'hidden md:flex items-center px-8 border-l border-black'>
            <span className= 'font-mono text-xs uppercase tracking-wide'>
              Leave the road, take the trails.
            </span>
          </div>

          { /** Links */ }
          <div className= 'flex items-stretch justify-end'>
            { /** GitHub */ }
            <a
              href= 'https://github.com/komed3'
              target= '_blank'
              rel= 'noreferrer'
              className= {
                'hidden lg:flex items-center gap-3 px-8 hover:text-white hover:bg-brutal-blue ' +
                'border-l border-black transition-colors'
              }
            >
              <SiGithub size= { 24 } />

              <span className= 'mr-4 font-mono text-xs uppercase tracking-wide'>
                GitHub
              </span>

              <ArrowUpRightIcon size= { 20 } strokeWidth= { 1.8 } />
            </a>

            { /** Menu Opener */ }
            <button
              aria-label= { menuOpen ? 'Close menu' : 'Open menu' }
              aria-expanded= { menuOpen }
              onClick= { () => setMenuOpen( ! menuOpen ) }
              className= {
                'group flex justify-center items-center w-20 border-l border-black transition-colors ' +
                ( menuOpen ? 'text-white bg-black' : 'hover:bg-brutal-yellow' )
              }
            >
              <AnimatePresence mode= 'wait' initial= { false }>
                { menuOpen ? (
                  <motion.div
                    key= 'close'
                    initial= { { rotate: -90, opacity: 0 } }
                    animate= { { rotate: 0, opacity: 1 } }
                    exit= { { rotate: 90, opacity: 0 } }
                    transition= { { duration: 0.18 } }
                  >
                    <XIcon size= { 32 } strokeWidth= { 1.2 } />
                  </motion.div>
                ) : (
                  <motion.div
                    key= 'menu'
                    initial= { { rotate: 90, opacity: 0 } }
                    animate= { { rotate: 0, opacity: 1 } }
                    exit= { { rotate: -90, opacity: 0 } }
                    transition= { { duration: 0.18 } }
                  >
                    <MenuIcon size= { 32 } strokeWidth= { 1.2 } />
                  </motion.div>
                ) }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      { /** Menu */ }
      <AnimatePresence>
        { menuOpen && (
          <motion.div
            className= 'fixed inset-0 z-80 text-white bg-black select-none'
            initial= { { clipPath: 'inset(0 0 100% 0)' } }
            animate= { { clipPath: 'inset(0 0 0% 0)' } }
            exit= { { clipPath: 'inset(0 0 100% 0)' } }
            transition= { { duration: 0.45, ease: [ 0.76, 0, 0.24, 1 ] } }
          >
            <div className= 'grid grid-rows-[5rem_1fr_auto] h-full pt-20'>
              { /** Header */ }
              <div className= 'grid grid-cols-2 font-mono text-[11px] uppercase tracking-widest border-b border-white/30'>
                <div className= 'flex items-center px-5 md:px-8 border-r border-white/30'>
                  <span>Explore the core</span>
                </div>

                <div className= 'flex justify-end items-center px-5 md:px-8'>
                  <span>Est. 2010</span>
                </div>
              </div>

              { /** Contents */ }
              <div className= 'grid lg:grid-cols-[1fr_24rem] min-h-0'>
                { /** Nav */ }
                <nav className= 'overflow-y-auto'>
                  { NAV.map( ( item, i ) => (
                    <motion.div
                      key= { item.index }
                      onClick= { closeMenu }
                      className= {
                        ''
                      }
                      initial= { { opacity: 0, x: -40 } }
                      animate= { { opacity: 1, x: 0 } }
                      transition= { {
                        delay: 0.12 + i * 0.055,
                        duration: 0.4,
                        ease: [ 0.22, 1, 0.36, 1 ]
                      } }
                    ></motion.div>
                  ) ) }
                </nav>
              </div>

              { /** Footer */ }
              <div className= 'grid md:grid-cols-2 border-t font-mono text-[11px] uppercase tracking-widest text-white/50 border-white/30'>
                <div className= 'p-6 border-b md:border-b-0 md:border-r border-white/30'>
                  <span>komed3 / Building open-source since 2010</span>
                </div>

                <div className= 'p-6 md:text-right'>
                  <span>Copyright { new Date().getFullYear() } by komed3</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) }
      </AnimatePresence>
    </>
  );
}
