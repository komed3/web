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
    <div className= 'my-20 h-screen'>
      <div className= 'flex flex-col justify-between h-full p-12 overflow-hidden bg-(--main) text-(--contrast)'>
        //
      </div>
    </div>
  );
}
