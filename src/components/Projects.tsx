import { motion } from 'motion/react';
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

        <div className= 'flex flex-wrap justify-end items-baseline gap-x-10 gap-y-4 max-w-5xl'>
          { filters.map( value => (
            <button
              key= { value }
              onClick= { () => setFilter( value ) }
              className= {
                'relative text-sm uppercase tracking-[0.2em] transition-colors delay-75 ' +
                ( filter === value && 'text-(--contrast)' )
              }
            >
              <div className= 'relative z-1'>
                { value }
              </div>

              { filter === value && (
                <motion.span
                  layoutId= 'active-filter'
                  transition= { { duration: 0.3, ease: [ 0.76, 0, 0.24, 1 ] } }
                  className= 'absolute -inset-x-2 -inset-y-1 bg-(--main)'
                />
              ) }
            </button>
          ) ) }
        </div>
      </div>
    </div>
  );
}
