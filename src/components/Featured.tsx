import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';


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
      </div>
    </div>
  );
}
