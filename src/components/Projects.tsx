import { ChevronDown, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';

import projects from '../../data/projects.json';
import type { Project } from '../../shared/types';


interface ProjectFiltersProps {
  filters: string[];
  value: string;
  onChange: ( value: string ) => void;
  count: number;
}

interface ProjectGridProps {
  projects: Project[];
}


function ProjectFilters ( { filters, value, onChange, count }: ProjectFiltersProps ) {
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
          { count }
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
  const [ visible, setVisible ] = useState( 8 );
  const loaderRef = useRef< HTMLDivElement >( null );
  const shown = projects.slice( 0, visible );

  useEffect( () => setVisible( 8 ), [ projects ] );

  useEffect( () => {
    if ( visible >= projects.length || ! loaderRef.current ) return;

    const observer = new IntersectionObserver( ( [ entry ] ) => {
      if ( ! entry.isIntersecting ) return;
      setVisible( current => Math.min( current + 8, projects.length ) );
    }, { rootMargin: '400px' } );

    observer.observe( loaderRef.current );
    return () => observer.disconnect();
  }, [ visible, projects.length ] );

  return (
    <div className= 'my-24 px-6 sm:px-12'>
      { /** Grid */ }
      <div className= 'grid grid-flow-dense md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-12'>
        <AnimatePresence mode= 'popLayout'>
          { shown.map( ( { id, title, type, desc, status, meta } ) => (
            <motion.div
              key= { id }
              initial= { { y: 60, opacity: 0 } }
              whileInView= { { y: 0, opacity: 1 } }
              transition= { { duration: 0.8, ease: [ 0.22, 1, 0.36, 1 ] } }
              viewport= { { once: true, amount: 0.2 } }
              className= {
                'min-h-100 bg-(--main) text-(--contrast) ' +
                ( status === 'FEATURED' ? 'xl:col-span-2' : '' )
              }
            >
              <Link
                to= { `/project/${ id }` }
                className= 'flex flex-col justify-between w-full h-full p-6 sm:p-10'
              >
                <div className= 'flex justify-between items-center text-xs uppercase font-light tracking-[0.3em]'>
                  <div>{ type }</div>

                  { ( meta?.stars ?? 0 ) > 0 && (
                    <div className= 'flex items-center gap-3'>
                      <Star size= { 18 } />
                      <span>{ meta.stars!.toLocaleString() }</span>
                    </div>
                  ) }
                </div>

                <div>
                  <h2 className= 'text-4xl sm:text-5xl font-extralight tracking-tight'>
                    { title }
                  </h2>

                  { desc && (
                    <p className= 'mt-6 max-w-xl text-lg font-light leading-relaxed'>
                      { desc }
                    </p>
                  ) }
                </div>
              </Link>
            </motion.div>
          ) ) }
        </AnimatePresence>
      </div>

      { /** Trigger */ }
      { visible < projects.length && (
        <div
          ref= { loaderRef }
          className= 'h-px'
        />
      ) }
    </div>
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
