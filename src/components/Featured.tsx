import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';


const PROJECTS = [ {
  uri: 'airportmap',
  name: 'Airportmap',
  category: 'Data / Web',
  desc: 'The free and open-source airport database',
  link: 'airportmap.de'
}, {
  uri: 'pseinfo',
  name: 'Periodic Table',
  category: 'Data / Education',
  desc: 'Interactive open-source periodic table and chemical database',
  link: 'pse-info.de',
}, {
  uri: 'rtbnext',
  name: 'RTBNext',
  category: 'API / Data',
  desc: 'Open infrastructure for real-time billionaire data',
  link: 'rtbnext.de'
}, {
  uri: 'pulsar',
  name: 'Pulsar',
  category: 'Programming',
  desc: 'Programming language focused on mathematical problems',
  link: undefined
} ] as const;


export function Featured () {
  const [ current, setCurrent ] = useState( 0 );
  const project = PROJECTS[ current ];

  const previous = () => setCurrent( current === 0 ? PROJECTS.length - 1 : current - 1 );
  const next = () => setCurrent( ( current + 1 ) % PROJECTS.length );

  return (
    <div className= 'h-screen pt-36 pb-12'>
      <div className= 'relative h-full overflow-hidden bg-(--main) text-(--contrast)'>
        <AnimatePresence mode= 'wait'>
          <motion.div
            key= { project.uri }
            initial= { { opacity: 0, y: 80 } }
            animate= { { opacity: 1, y: 0 } }
            exit= { { opacity: 0, y: -80 } }
            transition= { { duration: 0.6, ease: [ 0.76, 0, 0.24, 1 ] } }
            className= 'absolute inset-0'
          >
            <div className= 'absolute inset-0 flex flex-col justify-between p-12'>
              { /** Header */ }
              <div className= 'flex justify-between items-start text-xs uppercase tracking-[0.3em]'>
                <div>Featured project</div>
                <div>{ String( current + 1 ).padStart( 2, '0' ) } / { String( PROJECTS.length ).padStart( 2, '0' ) }</div>
              </div>

              { /** Content */ }
              <div>
                <div className= 'text-xs uppercase tracking-[0.3em]'>
                  { project.category }
                </div>

                <div className= 'mt-4 text-[clamp(5rem,12vw,12rem)] font-extralight leading-none tracking-tighter'>
                  { project.name }
                </div>

                <div className= 'mt-8 flex justify-between items-end gap-12'>
                  <p className= 'max-w-3xl text-xl font-light leading-relaxed'>
                    { project.desc }
                  </p>

                  <Link
                    to= { `/project/${ project.uri }` }
                    className= 'shrink-0 flex items-center gap-3 text-sm uppercase tracking-[0.3em]'
                  >
                    View project
                    <ArrowUpRight size= { 20 } />
                  </Link>
                </div>
              </div>

              { /** Navigation */ }
              <div className= 'flex justify-between items-end'>
                <div className= 'text-xs uppercase tracking-[0.3em]'>
                  { project.link ? project.link : 'Coming soon' }
                </div>

                <div className= 'flex border border-(--contrast) divide-x divide-(--contrast)'>
                  <button
                    onClick= { previous }
                    className= 'flex size-14 justify-center items-center'
                    aria-label= 'Previous project'
                  >
                    <ChevronLeft size= { 20 } />
                  </button>

                  <button
                    onClick= { next }
                    className= 'flex size-14 justify-center items-center'
                    aria-label= 'Next project'
                  >
                    <ChevronRight size= { 20 } />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
