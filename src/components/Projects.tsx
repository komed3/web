import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import projects from '../../data/projects.json';
import type { Project } from '../../shared/types';


interface ProjectFiltersProps {
  filters: string[];
  value: string;
  onChange: ( value: string ) => void;
}

interface ProjectGridProps {
  projects: Project[];
}


function ProjectFilters ( { filters, value, onChange }: ProjectFiltersProps ) {
  const [ open, setOpen ] = useState( false );

  return filters.length > 0 && (
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
              className= 'hidden sm:flex items-center gap-8 ml-6'
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
        animate= {
          open
            ? { marginTop: 40, height: 'auto', opacity: 1 }
            : { marginTop: 0, height: 0, opacity: 0 }
        }
        transition= { { duration: 0.5, ease: [ 0.22, 1, 0.36, 1 ] } }
        className= { open ? '' : 'pointer-events-none' }
      >
        <div className= 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-12 gap-y-6'>
          { filters.map( filter => (
            <button
              key= { filter }
              onClick= { () => onChange( filter ) }
              className= 'flex items-center gap-3 text-sm uppercase font-light tracking-[0.15em]'
            >
              <span className= 'relative w-3 h-4 shrink-0'>
                { value === filter && (
                  <motion.span
                    layoutId= 'active-filter'
                    layout= 'position'
                    transition= { { type: 'spring', stiffness: 500, damping: 30, mass: 0.7 } }
                    className= 'absolute top-0 left-0 w-1 h-full bg-(--main) rounded'
                  />
                ) }
              </span>

              <span>{ filter }</span>
            </button>
          ) ) }
        </div>
      </motion.div>
    </div>
  );
}


function ProjectGrid ( { projects }: ProjectGridProps ) {
  return (
    <></>
  );
}


export function Projects () {
  const [ filter, setFilter ] = useState( 'All' );
  const filters = useMemo( () => [ 'All', ...new Set( projects.map( p => p.type ) ) ], [] );

  const result = useMemo< Project[] >(
    () => projects.filter( p => filter === 'All' || p.type === filter ) as any,
    [ filter ]
  );

  return (
    <>
      { /** Filters */ }
      <ProjectFilters
        filters= { filters }
        value= { filter }
        onChange= { f => setFilter( f ) }
      />

      { /** Grid */ }
      <ProjectGrid
        projects= { result }
      />
    </>
  );
}
