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
    [ 'RTBNext', 'https://rtbnext.de', true ],
    [ 'Periodic Table', 'https://pse-info.de', true ],
    [ 'Pulsar', 'https://github.com/plsrc', true ]
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
    <footer className= 'relative z-1 mx-12 p-20 text-(--contrast) bg-(--main)'></footer>
  );
}
