import { Link } from 'react-router';

import { Logo } from '../components/Logo';


const NAV = [ {
  label: 'Navigation',
  items: [
    [ 'Home', '/' ],
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
    [ 'RTBNext', 'https://rtbnext.de', true ],
    [ 'Periodic Table', 'https://pse-info.de', true ],
    [ 'Pulsar', '#', true ]
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
    <footer className= 'mx-12 p-12 text-(--bg) bg-(--text)'>
      { /** Links */ }
      <div className= 'flex justify-end items-end gap-12 mb-32'>
        { NAV.map( ( { label, items } ) => (
          <div
            key= { label }
            className= ''
          ></div>
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
        <div className= 'flex flex-col justify-end items-end text-xs uppercase tracking-widest'>
          <div>Designed and developed by komed3</div>

          <div className= 'text-[10px] font-mono opacity-75'>
            Build { build } / { hash }
          </div>
        </div>
      </div>
    </footer>
  );
}
