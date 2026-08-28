import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import projects from '../data/projects.json';


export function Project () {
  const navigate = useNavigate();

  const { id } = useParams();
  const index = projects.findIndex( p => p.id === id );
  const project = projects[ index ];

  const prev = projects[ index - 1 ];
  const next = projects[ index + 1 ];

  useEffect(
    () => { if ( index < 0 || ! project ) navigate( '/index', { replace: true } ) },
    [ id, projects, navigate ]
  );

  return project && (
    <>
      { /** Header */ }
      <div className= 'flex flex-col w-full h-screen p-12 pt-36'>
        { /** Navigation */ }
        <div className= 'flex justify-end items-center gap-4 uppercase text-md font-light tracking-widest'>
          { prev && (
            <Link
              className= 'inline-flex items-center gap-3 px-4 py-1'
              to= { `/project/${ prev.id }` }
            >
              <ArrowLeft size= { 32 } strokeWidth= { 0.8 } />
              <span>{ prev.title }</span>
            </Link>
          ) }

          { prev && next && (
            <div className= 'w-14 h-px bg-(--main)' />
          ) }

          { next && (
            <Link
              className= 'inline-flex items-center gap-3 px-4 py-1'
              to= { `/project/${ next.id }` }
            >
              <span>{ next.title }</span>
              <ArrowRight size= { 32 } strokeWidth= { 0.8 } />
            </Link>
          ) }
        </div>

        <div className= 'flex-1' />

        { /** Title */ }
        <div className= '-ml-3 text-[clamp(5rem,10vw,10rem)] font-extralight leading-none tracking-tighter'>
          { project.title }
        </div>

        { /** Description */ }
        { project.desc && (
          <p className= 'mt-12 max-w-5xl text-3xl font-light leading-snug'>
            { project.desc }
          </p>
        ) }
      </div>
    </>
  );
}
