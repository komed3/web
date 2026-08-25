import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { Link } from 'react-router';


export function Header () {
  const [ menuOpen, setMenuOpen ] = useState( false )

  return (
    <>
      <header className= 'fixed inset-x-0 top-0 z-90 bg-white border-b border-black select-none'>
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

          { /** Quote */ }
          <div className= 'hidden md:flex items-center px-8'>
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
                'hidden lg:flex items-center gap-3 px-8 hover:text-white hover:bg-black ' +
                'border-l border-black transition-colors'
              }
            >
              <SiGithub size= { 24 } />

              <span className= 'mr-4 font-mono text-xs uppercase tracking-wide'>
                GitHub
              </span>

              <ArrowUpRight size= { 20 } strokeWidth= { 1.8 } />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
