import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';

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
              { column.map( ( { desc, id, meta, status, tags, title, type }, i ) => {
                const featured = status === 'FEATURED';

                return (
                  <motion.div
                    key= { id }
                    initial= { { opacity: 0, y: 60 } }
                    whileInView= { { opacity: 1, y: 0 } }
                    exit= { { opacity: 0, y: -20, scale: 0.95 } }
                    transition= { {
                      opacity: { duration: 0.35, delay: i * 0.025 },
                      y: { duration: 0.55, delay: i * 0.025, ease: [ 0.76, 0, 0.24, 1 ] },
                      scale: { duration: 0.35 }
                    } }
                    viewport= { { once: true, amount: 0.3 } }
                  >
                    <Link
                      to= { `/project/${ id }` }
                      className= {
                        'group block p-10 ' +
                        ( featured ? 'bg-(--main) text-(--contrast)' : 'bg-(--main)/10' )
                      }
                    >
                      { /** Item Header */ }
                      <div className= 'flex justify-between text-xs uppercase tracking-[0.25em]'>
                        <span>{ type }</span>
                        { status && ( <span>{ status }</span> ) }
                      </div>

                      { /** Title */ }
                      <div
                        className= {
                          'mt-12 font-extralight tracking-tighter ' +
                          ( featured ? 'text-6xl' : 'text-5xl' )
                        }
                      >
                        { title }
                      </div>

                      { /** Description */ }
                      { desc && (
                        <p className= 'mt-6 max-w-sm text-base font-light leading-relaxed'>
                          { desc }
                        </p>
                      ) }

                      { /** Tags */ }
                      { tags?.length > 0 && (
                        <div
                          className= {
                            'flex justify-end flex-wrap gap-x-4 gap-y-2 max-w-sm ml-auto text-[10px] ' +
                            'uppercase tracking-[0.15em] ' + ( featured ? 'mt-48' : 'mt-12' )
                          }
                        >
                          { tags.map( tag => (
                            <span key= { tag }>{ tag }</span>
                          ) ) }
                        </div>
                      ) }

                      { /** Item Footer */ }
                      <div className= 'flex justify-between items-center mt-12 pt-4 border-t border-current/20'>
                        <span className= 'text-xs uppercase tracking-[0.2em]'>
                          { meta?.stars !== undefined
                            ? `${ meta.stars.toLocaleString() } stars`
                            : 'Project'
                          }
                        </span>

                        <ArrowUpRight
                          className= '-mr-1.5'
                          size= { 24 }
                          strokeWidth= { 0.8 }
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              } ) }
            </AnimatePresence>
          </div>
        ) ) }
      </div>

      { /** Trigger */ }
      { visible < result.length && (
        <div
          ref= { loader }
          className= 'h-32'
        />
      ) }
    </div>
  );
}
