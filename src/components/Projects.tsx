import { useMemo, useRef, useState } from 'react';

import projects from '../data/projects.json';


const PAGE_SIZE = 8;


export function Projects () {
  const [ filter, setFilter ] = useState( 'All' );
  const [ search, setSearch ] = useState( '' );
  const [ visible, setVisible ] = useState( PAGE_SIZE );
  const [ columns, setColumns ] = useState( 3 );

  const filters = useMemo( () => [ 'All', ...new Set( projects.map( project => project.type ) ) ], [] );
  const loader = useRef< HTMLDivElement >( null );

  return (
    <div className= 'px-12 py-32 space-y-24'>
      { /** Header */ }
      <div className= 'flex justify-between items-end'>
        { /** Title */ }
        <div className= 'space-y-6'>
          <div className= 'text-xs uppercase tracking-[0.3em]'>
            Selected work
          </div>

          <div className= '-ml-6 text-[clamp(6rem,14vw,13rem)] font-extralight leading-[0.8] tracking-tighter'>
            Projects
          </div>
        </div>

        { /** Search */ }
        <div className= 'shrink-0 pb-1'>
          <input
            value= { search }
            onChange= { event => setSearch( event.target.value ) }
            placeholder= 'Type to search_'
            className= {
              'w-72 py-3 text-right text-md font-light tracking-wide placeholder:text-(--main) ' +
              'bg-transparent border-b border-(--main) outline-none'
            }
          />
        </div>
      </div>

      { /** Filters */ }
      <div className= 'flex justify-between gap-24'>
        <div className= 'text-[11px] uppercase tracking-[0.3em] opacity-70'>
          Filter
        </div>
      </div>
    </div>
  );
}
