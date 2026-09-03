import { Link } from 'react-router';

import { Logo } from '../components/Logo';


const NAV = [ {
  label: 'Navigation',
  items: [
    [ 'About', '/' ],
    [ 'Tech Stack', '/stack' ],
    [ 'Projects', '/index' ]
  ]
}, {
  label: 'Packages',
  items: [
    [ 'Node.js', 'https://npmjs.com/~komed3', true ],
    [ 'Linux', 'https://deb.komed3.de/', true ],
    [ 'Python', 'https://pypi.org/user/komed3', true ]
  ]
}, {
  label: 'Projects',
  items: [
    [ 'Airportmap', 'https://airportmap.de', true ],
    [ 'Periodic Table', 'https://pse-info.de', true ],
    [ 'Pulsar', 'https://github.com/plsrc', true ],
    [ 'RTBNext', 'https://rtbnext.de', true ]
  ]
}, {
  label: 'Socials',
  items: [
    [ 'GitHub', 'https://github.com/komed3', true ],
    [ 'Twitter', 'https://x.com/komed3dev', true ],
    [ 'Ko-Fi', 'https://ko-fi.com/komed3', true ]
  ]
} ] as const;


export function Footer () {
  const build = process.env.VITE_BUILD_ID ?? 'XXXXXXXX-XXXX';
  const hash = process.env.VITE_COMMIT_SHA ?? 'XXXXXXX';

  return (
    <footer className= 'relative z-1 sm:mx-12 p-12 sm:p-20 text-(--contrast) bg-(--main)'>
      { /** Links */ }
      <div className= 'grid sm:grid-cols-2 lg:flex justify-end items-end gap-20 sm:mt-16 mb-36'>
        { NAV.map( ( { label, items } ) => (
          <div
            key= { label }
            className= 'xl:flex-1'
          >
            <nav className= 'flex flex-col items-end gap-4 text-right'>
              { items.map( ( [ text, url, external = false ] ) => external ? (
                <a
                  key= { url }
                  href= { url }
                  target= '_blank'
                  rel= 'noreferrer'
                  className= 'font-bold'
                >
                  { text }
                </a>
              ) : (
                <Link
                  key= { url }
                  className= 'font-bold'
                  to= { url }
                >
                  { text }
                </Link>
              ) ) }
            </nav>
      
            <div className= 'mt-10 text-right text-[10px] uppercase font-light tracking-widest'>
              <span className= 'pt-1 border-t'>
                { label }
              </span>
            </div>
          </div>
        ) ) }
      </div>

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

        { /** Copyright + Build Info */ }
        <div className= 'flex flex-col justify-end items-end text-sm uppercase font-extralight'>
          <div className= 'tracking-[0.4rem]'>
            Designed and developed by komed3
          </div>

          <div className= 'font-mono text-[11px] tracking-widest'>
            Build { build } / { hash }
          </div>
        </div>
      </div>
    </footer>
  );
}
