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
  link: 'pse-info.de'
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
  link: 'github.com/plsrc'
} ] as const;

const transition = {
  duration: 0.6,
  ease: [ 0.76, 0, 0.24, 1 ]
} as const;


export function Featured () {
  const [ current, setCurrent ] = useState( 0 );

  const previous = () => setCurrent( current === 0 ? PROJECTS.length - 1 : current - 1 );
  const next = () => setCurrent( ( current + 1 ) % PROJECTS.length );

  const project = PROJECTS[ current ];

  return (
    <div className= 'h-screen py-24'>
      <div className= 'flex flex-col justify-between h-full p-12 overflow-hidden bg-(--main) text-(--contrast)'>
        { /** Header */ }
        <div className= 'flex justify-between items-start text-xs uppercase tracking-[0.3em]'>
          <div>Featured project</div>

          <AnimatePresence mode= 'wait'>
            <motion.div
              key= { current }
              className= 'flex gap-2'
              initial= { { opacity: 0, y: 10 } }
              animate= { { opacity: 1, y: 0 } }
              exit= { { opacity: 0, y: -10 } }
              transition= { transition }
            >
              <span>{ String( current + 1 ).padStart( 2, '0' ) }</span>
              <span>/</span>
              <span>{ String( PROJECTS.length ).padStart( 2, '0' ) }</span>
            </motion.div>
          </AnimatePresence>
        </div>

        { /** Content */ }
        <div className= 'relative'>
          <AnimatePresence mode= 'wait'>
            <motion.div
              key= { project.uri }
              className= 'flex justify-between items-end gap-24'
              initial= { { opacity: 0, y: 80 } }
              animate= { { opacity: 1, y: 0 } }
              exit= { { opacity: 0, y: -80 } }
              transition= { transition }
            >
              <div>
                <div className= 'text-xs uppercase tracking-[0.3em]'>
                  { project.category }
                </div>

                <div className= 'mt-4 text-[clamp(5rem,12vw,12rem)] font-extralight leading-none tracking-tighter'>
                  { project.name }
                </div>

                <p className= 'mt-8 text-2xl font-light leading-relaxed'>
                  { project.desc }
                </p>
              </div>

              <Link
                to= { `/project/${ project.uri }` }
                className= {
                  'shrink-0 flex flex-col items-end gap-2 text-2xl uppercase ' +
                  'font-extralight tracking-[0.3em]'
                }
              >
                <span>View</span>
                <span>project</span>

                <ArrowUpRight
                  className= '-mr-3.5'
                  size= { 80 }
                  strokeWidth= { 0.3 }
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        { /** Navigation */ }
        <div className= 'flex justify-between items-end'>
          <AnimatePresence mode= 'wait'>
            <motion.div
              key= { project.uri }
              className= 'text-xs uppercase tracking-[0.3em]'
              initial= { { opacity: 0 } }
              animate= { { opacity: 1 } }
              exit= { { opacity: 0 } }
              transition= { transition }
            >
              { project.link }
            </motion.div>
          </AnimatePresence>

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
    </div>
  );
}
