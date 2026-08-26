import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

const NAV = [
  [ '00', 'Home', '/' ],
  [ '01', 'Work', '/work' ],
  [ '02', 'Projects', '/projects' ],
  [ '03', 'About', '/about' ],
  [ '04', 'Skillset', '/skills' ]
] as const;


const PROJECTS = [
  [ 'Airportmap', 'https://airportmap.de' ],
  [ 'RTBNext', 'https://rtbnext.de' ],
  [ 'Periodic Table', 'https://pse-info.de' ],
  [ 'npm Packages', 'https://npmjs.com/~komed3' ]
] as const;


const SOCIALS = [
  [ 'GITHUB', 'https://github.com/komed3' ],
  [ 'TWITTER', 'https://x.com/komed3dev' ],
  [ 'KO-FI', 'https://ko-fi.com/komed3' ]
] as const;


export function Footer () {
  return (
    <footer className= 'bg-white border-t border-black'>
      { /** Wordmark */ }
      <div className= 'p-7 md:p-12 lg:p-16 pt-20 md:pt-28 lg:pt-36'>
        <div className= 'font-display text-right text-9xl font-800 tracking-wider'>
          <span className= 'text-brutal-blue'>k</span>
          <span>omed3</span>
        </div>
      </div>

      { /** External Links */ }
      <nav className= 'grid md:grid-cols-3 border-t border-black'>
        { SOCIALS.map( ( [ label, href ] ) => (
          <a
            key= { href }
            href= { href }
            target= '_blank'
            rel= 'noreferrer'
            className= {
              'group flex justify-between items-center gap-6 px-7 md:px-12 lg:px-16 py-6 font-sans ' +
              'text-3xl md:text-4xl font-800 tracking-tight hover:text-brutal-blue border-b ' +
              'md:border-b-0 md:border-r border-black last:border-r-0 transition-colors'
            }
          >
            <span>{ label }</span>

            <ArrowUpRight
              size= { 28 }
              strokeWidth= { 1.15 }
              className= {
                'shrink-0 transition-transform duration-300 ' +
                'group-hover:translate-x-1 group-hover:-translate-y-1'
              }
            />
          </a>
        ) ) }
      </nav>

      { /** Navigation & Projects */ }
      <div className= 'grid gap-12 md:grid-cols-2 px-7 md:px-12 lg:px-16 py-12 md:py-16 border-t border-black'>
        { /** Navigation */ }
        <nav>
          <div className= 'mb-6 font-mono text-[11px] uppercase tracking-[0.18em]'>
            Navigation
          </div>

          <div className= 'flex flex-col gap-2'>
            { NAV.map( ( [ number, label, path ] ) => (
              <Link
                key= { path }
                to= { path }
                className= {
                  'group flex items-baseline gap-5 font-sans text-lg font-700 ' +
                  'hover:text-brutal-blue transition-colors'
                }
              >
                <span className= 'shrink-0 w-5 font-mono text-[11px] font-400'>
                  { number }
                </span>

                <span>{ label }</span>
              </Link>
            ) ) }
          </div>
        </nav>

        { /** Projects */ }
        <nav>
          <div className= 'mb-6 font-mono text-[11px] uppercase tracking-[0.18em]'>
            Projects
          </div>

          <div className= 'flex flex-col gap-2'>
            { PROJECTS.map( ( [ label, href ] ) => (
              <a
                key= { href }
                href= { href }
                target= '_blank'
                rel= 'noreferrer'
                className= {
                  'group flex items-baseline gap-5 font-sans text-lg font-700 ' +
                  'hover:text-brutal-blue transition-colors'
                }
              >
                <span>{ label }</span>

                <ArrowUpRight
                  size= { 16 }
                  strokeWidth= { 1.15 }
                  className= {
                    'opacity-0 transition-all duration-300 ' +
                    'group-hover:translate-x-1 group-hover:-translate-y-1 ' +
                    'group-hover:opacity-100'
                  }
                />
              </a>
            ) ) }
          </div>
        </nav>
      </div>

      { /** Meta */ }
      <div
        className= {
          'flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-7 md:px-12 lg:px-16 ' +
          'py-6 font-mono text-[11px] uppercase tracking-[0.18em] border-t border-black'
        }
      >
        { /** Copyright */}
        <span>Copyright { new Date().getFullYear() } by komed3</span>

        { /** Build Info */ }
        <div className= 'flex gap-6'>
          <span>Build { process.env.VITE_BUILD_ID ?? 'XXXXXXXX-XXXX' }</span>
          <span>Commit { process.env.VITE_COMMIT_SHA ?? 'XXXXXXX' }</span>
        </div>
      </div>
    </footer>
  );
}
