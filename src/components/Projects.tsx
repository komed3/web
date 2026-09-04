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
