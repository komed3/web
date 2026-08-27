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
    <></>
  );
}
