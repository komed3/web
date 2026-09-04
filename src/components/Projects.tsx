import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';

import projects from '../../data/projects.json';


interface ProjectFiltersProps {
  filters: string[];
  value: string;
  onChange: ( value: string ) => void;
}


function ProjectFilters ( { filters, value, onChange }: ProjectFiltersProps ) {
  const [ open, setOpen ] = useState( false );

  return filters && (
    <div className= 'px-6 sm:px-12'>
      { /** Trigger */ }
      <button
        onClick= { () => setOpen( current => ! current ) }
        className= 'flex items-center gap-3 text-sm uppercase font-light tracking-[0.2em]'
      >
        <ChevronDown
          className= { 'transition-transform ' + ( open && 'rotate-180' ) }
          size= { 22 }
          strokeWidth= { 1.6 }
        />

        <span>Filter</span>

        <span className= 'text-xs'>
          { filters.length }
        </span>

        <AnimatePresence mode= 'wait'>
          { ! open && (
            <motion.span
              key= { value }
              initial= { { y: 8, opacity: 0 } }
              animate= { { y: 0, opacity: 1 } }
              exit= { { y: -8, opacity: 0 } }
              transition= { { duration: 0.2 } }
              className= 'flex items-center gap-8 ml-6'
            >
              <span className= 'w-8 h-px bg-(--main)' />
              <span>{ value }</span>
            </motion.span>
          ) }
        </AnimatePresence>
      </button>

      { /** Filters */ }
      <motion.div
        initial= { false }
        animate= { open ? { height: 'auto', marginTop: 40 } : { height: 0, marginTop: 0 } }
        transition= { { duration: 0.5, ease: [ 0.22, 1, 0.36, 1 ] } }
        className= 'overflow-hidden'
      >
        <div className= 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-6'>
          { filters.map( filter => (
            <button
              key= { filter }
              onClick= { () => onChange( filter ) }
              className= 'flex items-center gap-3 text-sm uppercase font-light tracking-[0.15em]'
            >
              <span>{ filter }</span>
            </button>
          ) ) }
        </div>
      </motion.div>
    </div>
  );
}


export function Projects () {
  const [ filter, setFilter ] = useState( 'All' );
  const filters = useMemo( () => [ 'All', ...new Set( projects.map( p => p.type ) ) ], [] );

  return (
    <>
      { /** Filters */ }
      <ProjectFilters
        filters= { filters }
        value= { filter }
        onChange= { f => setFilter( f ) }
      />
    </>
  );
}
