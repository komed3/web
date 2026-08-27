import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';


const PROJECTS = [ {
  uri: 'airportmap',
  name: 'Airportmap',
  category: 'Data / Web',
  description: 'The free and open-source airport database',
  link: 'airportmap.de'
}, {
  uri: 'pseinfo',
  name: 'Periodic Table',
  category: 'Data / Education',
  description: 'Interactive open-source periodic table',
  link: 'pse-info.de',
}, {
  uri: 'rtbnext',
  name: 'RTBNext',
  category: 'API / Data',
  description: 'Tracking the wealthiest people on the planet',
  link: 'rtbnext.de'
}, {
  uri: 'pulsar',
  name: 'Pulsar',
  category: 'Programming',
  description: 'Programming language focused on maths problems',
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
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
