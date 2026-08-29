import { ArrowUpLeft, ArrowUpRight, Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router';
import remarkGfm from 'remark-gfm';

import projects from '../data/projects.json';


export function Project () {
  const navigate = useNavigate();
  const navigationRef = useRef< 'prev' | 'next' | null >( null );
  const contentRef = useRef< HTMLDivElement >( null );

  const { id } = useParams();
  const index = projects.findIndex( p => p.id === id );
  const project = projects[ index ];

  const prev = projects[ index - 1 ];
  const next = projects[ index + 1 ];

  useEffect(
    () => { if ( ! project ) navigate( '/index', { replace: true } ) },
    [ project, navigate ]
  );

  useEffect( () => {
    const element = contentRef.current;
    if ( ! element ) return;

    const handleClick = ( event: MouseEvent ) => {
      if ( event.button !== 0 ) return;
      if ( event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) return;

      const link = ( event.target as HTMLElement ).closest< HTMLAnchorElement >( 'a[data-navigation]' );
      if ( ! link ) return;

      event.preventDefault();
      event.stopPropagation();

      const direction = link.dataset.navigation as 'prev' | 'next', target = link.href;
      navigationRef.current = direction;

      element.style.transition = 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)';
      element.style.transform = `translate3d(${ direction === 'next' ? '-' : '' }200px, 0, 0)`;
      element.style.opacity = '0';

      window.setTimeout( () => {
        window.scrollTo( 0, 0 );
        navigate( new URL( target ).pathname );
      }, 500 );
    };

    element.addEventListener( 'click', handleClick );
    return () => { element.removeEventListener( 'click', handleClick ) };
  }, [ navigate ] );

  useEffect( () => {
    const element = contentRef.current, direction = navigationRef.current;
    if ( ! element || ! direction ) return;

    navigationRef.current = null;

    element.style.transition = 'none';
    element.style.transform = `translate3d(${ direction === 'next' ? '' : '-' }200px, 0, 0)`;
    element.style.opacity = '0';

    requestAnimationFrame( () => {
      element.style.transition = 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)';
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.opacity = '1';
    } );
  }, [ id ] );

  return project && (
    <div ref= { contentRef }>
      { /** Header */ }
      <div className= 'grid grid-cols-[5fr_3fr] h-screen pt-24'>
        { /** Hero */ }
        <div className= 'flex flex-col justify-end p-12'>
          { /** Type */ }
          <div className= 'mb-4 text-2xl font-light uppercase tracking-[0.3em]'>
            { project.type }
          </div>

          { /** Title */ }
          <div className= '-ml-3 max-w-4xl text-[clamp(4rem,8vw,8rem)] font-extralight leading-none tracking-tighter'>
            { project.title }
          </div>

          { /** Info */ }
          <div className= 'flex justify-between items-end gap-24 mt-20'>
            <div>
              { /** Description */ }
              { project.desc && (
                <p className= 'max-w-xl text-2xl font-light leading-relaxed'>
                  { project.desc }
                </p>
              ) }
            </div>

            <div>
              { /** Project Link */ }
              { project.link && (
                <a
                  href= { project.link }
                  target= '_blank'
                  rel= 'noreferrer'
                  className= {
                    'inline-block px-8 text-lg font-light uppercase leading-16 ' +
                    'tracking-[0.2em] text-(--contrast) bg-(--main)'
                  }
                >
                  Visit
                </a>
              ) }
            </div>
          </div>
        </div>

        { /** Aside */ }
        <div className= 'flex flex-col justify-between p-12 text-(--contrast) bg-(--main)'>
          <div>
            { /** Meta */ }
            <div className= 'space-y-6 text-lg uppercase tracking-widest'>
              { [
                [ 'Version', project.meta?.version ],
                [ 'License', project.meta?.license ],
                [ 'Status', project.status ],
                [ 'Language', project.meta?.langs?.join( ', ' ) ],
                [ 'Year', project.meta?.year ]
              ].map( ( [ label, value ] ) => value && (
                <div
                  key= { label }
                  className= 'flex justify-between gap-8'
                >
                  <span className= 'font-extralight'>{ label }</span>
                  <b className= 'text-right font-medium'>{ value }</b>
                </div>
              ) ) }
            </div>

            { /** Tags */ }
            { project.tags?.length > 0 && (
              <div className= 'mt-20 ml-auto max-w-xl text-right uppercase'>
                <div className= 'mb-4 text-[11px] font-medium tracking-[0.3em]'>
                  Tags
                </div>

                <div className= 'flex flex-wrap justify-end gap-x-6 gap-y-3 text-lg font-extralight tracking-widest'>
                  { project.tags.map( tag => ( <span key= { tag }>{ tag }</span> ) ) }
                </div>
              </div>
            ) }
          </div>

          { /** GitHub */ }
          { project.github && (
            <div className= 'flex items-center justify-between gap-8'>
              <a
                href= { `https://github.com/${ project.github }` }
                target= '_blank'
                rel= 'noreferrer'
                className= {
                  'inline-block px-8 text-lg font-light uppercase leading-16 ' +
                  'tracking-[0.2em] text-(--main) bg-(--contrast)'
                }
              >
                GitHub
              </a>

              { /** Stars */ }
              { project.meta?.stars > 0 && (
                <div className= 'flex items-center gap-4 text-lg font-light'>
                  <Star size= { 20 } />
                  <span>{ project.meta.stars.toLocaleString() }</span>
                </div>
              ) }
            </div>
          ) }
        </div>
      </div>

      { /** Project Navigation */ }
      { ( prev || next ) && (
        <div className= 'flex justify-between my-24 px-12 uppercase font-extralight tracking-[0.3em]'>
          <div>
            { /** Previous */ }
            { prev && (
              <Link
                to= { `/project/${ prev.id }` }
                data-navigation= 'prev'
                className= 'flex flex-col gap-3 w-fit max-w-80 text-2xl'
              >
                <ArrowUpLeft
                  className= '-ml-5'
                  size= { 80 }
                  strokeWidth= { 0.3 }
                />

                <span>{ prev.title }</span>
              </Link>
            ) }
          </div>

          <div>
            { /** Next */ }
            { next && (
              <Link
                to= { `/project/${ next.id }` }
                data-navigation= 'next'
                className= 'flex flex-col items-end gap-3 w-fit max-w-80 text-right text-2xl'
              >
                <ArrowUpRight
                  className= '-mr-3.5'
                  size= { 80 }
                  strokeWidth= { 0.3 }
                />

                <span>{ next.title }</span>
              </Link>
            ) }
          </div>
        </div>
      ) }

      { /** Content */ }
      { project.content && (
        <div className= 'my-16 py-16 bg-white shadow-[0_100vmax_0_100vmax_white]'>
          <div className= 'min-w-0 max-w-6xl mx-auto markdown-body'>
            <ReactMarkdown remarkPlugins= { [ remarkGfm ] }>
              { project.content }
            </ReactMarkdown>
          </div>
        </div>
      ) }
    </div>
  );
}
