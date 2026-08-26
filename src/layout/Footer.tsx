import { ArrowUpRight } from 'lucide-react';

const NAV = [
  [ '00', 'Home', '/' ],
  [ '01', 'Work', '/work' ],
  [ '02', 'Projects', '/projects' ],
  [ '03', 'About', '/about' ],
  [ '04', 'Skillset', '/skills' ]
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
