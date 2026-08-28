import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import projects from '../data/projects.json';


const PAGE_SIZE = 8;


export function Projects () {
  const [ filter, setFilter ] = useState( 'All' );
  const [ search, setSearch ] = useState( '' );
  const [ visible, setVisible ] = useState( PAGE_SIZE );
  const [ columns, setColumns ] = useState( 3 );

  // --- filter ---

  const filters = useMemo( () => [ 'All', ...new Set( projects.map( project => project.type ) ) ], [] );
  const loader = useRef< HTMLDivElement >( null );

  const result = useMemo( () => {
    const value = search.trim().toLowerCase();

    return projects.filter( project => {
      if ( filter !== 'All' && project.type !== filter ) return false;
      if ( ! value ) return true;

      return [ project.title, project.desc, project.type, project.status, ...( project.tags ?? [] ) ]
        .filter( Boolean ).some( item => item!.toLowerCase().includes( value ) );
    } );
  }, [ filter, search ] );

  // --- masonry ---

  useEffect( () => setVisible( PAGE_SIZE ), [ filter, search ] );

  useEffect( () => {
    const updateColumns = () => setColumns( window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1 );
    updateColumns();

    window.addEventListener( 'resize', updateColumns );
    return () => window.removeEventListener( 'resize', updateColumns );
  }, [] );

  useEffect( () => {
    if ( ! loader.current ) return;

    const observer = new IntersectionObserver( entries => {
      if ( ! entries[ 0 ].isIntersecting ) return;
      setVisible( value => Math.min( value + PAGE_SIZE, result.length ) );
    }, { rootMargin: '600px' } );

    observer.observe( loader.current );
    return () => observer.disconnect();
  }, [ result.length ] );

  const visibleProjects = result.slice( 0, visible );
  const masonry = Array.from( { length: columns }, () => [] as typeof visibleProjects );

  visibleProjects.forEach( project => {
    const shortest = masonry.reduce( ( idx, col, i ) => col.length < masonry[ idx ].length ? i : idx, 0 );
    masonry[ shortest ].push( project );
  } );

  return (
    <div className= 'px-12 py-32 space-y-24'>
      { /** Header */ }
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= 'flex justify-between items-end'
      >
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
              'w-72 py-3 text-right text-md font-mono font-light tracking-wide outline-none ' +
              'placeholder:text-(--main) bg-transparent border-b border-(--main)'
            }
          />
        </div>
      </motion.div>

      { /** Filters */ }
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= 'flex justify-between gap-24'
      >
        <div className= 'text-[11px] uppercase tracking-[0.3em]'>
          Filter
        </div>

        <div className= 'flex flex-wrap justify-end items-baseline gap-x-10 gap-y-4 max-w-5xl'>
          { filters.map( value => (
            <button
              key= { value }
              onClick= { () => setFilter( value ) }
              className= {
                'relative text-sm uppercase tracking-[0.2em] transition-colors ' +
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
      </motion.div>

      { /** Masonry */ }
      <div className= 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16'>
        { masonry.map( ( column, columnIndex ) => (
          <div
            key= { columnIndex }
            className= 'flex flex-col gap-10'
          >
            <AnimatePresence mode= 'popLayout'>
              { column.map( ( project, i ) => {
                const featured = project.status === 'FEATURED';

                return ( <></> );
              } ) }
            </AnimatePresence>
          </div>
        ) ) }
      </div>
    </div>
  );
}
