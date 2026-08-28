import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

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
      { /** Project Header */ }
      <div className= 'grid grid-cols-[1fr_1px_2fr] gap-12 w-full h-screen p-12 pt-36'>
        { /** Aside */ }
        <div className= 'flex flex-col items-end'>
          <div className= 'flex-1' />

          { project.status && (
            <div className= 'text-(--contrast) bg-(--main)'>
              { project.status }
            </div>
          ) }
        </div>

        <div className= 'bg-(--main)' />

        { /** Title */ }
        <div className= 'flex flex-col justify-end'>
          <div className= '-ml-2 text-[clamp(4rem,8vw,8rem)] font-extralight leading-none tracking-tighter'>
            { project.title }
          </div>

          { project.desc && (
            <p className= 'mt-8 max-w-5xl text-3xl font-light leading-snug'>
              { project.desc }
            </p>
          ) }
        </div>
      </div>
    </>
  );
}
