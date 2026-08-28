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
        <div className= 'flex flex-col items-end gap-8'>
          { /** Navigation */ }
          <div className= 'grid grid-cols-2 gap-12'>
            <div>...</div>
            <div>...</div>
          </div>

          <div className= 'flex-1' />

          { /** Status */ }
          { project.status && (
            <div className= 'px-6 py-2 text-3xl font-extralight text-(--contrast) bg-(--main)'>
              { project.status }
            </div>
          ) }

          { /** Tags */ }
          { project.tags?.length > 0 && (
            <div
              className= {
                'flex justify-end flex-wrap gap-x-5 gap-y-2 max-w-sm ml-auto text-sm ' +
                'uppercase font-light tracking-[0.15em]'
              }
            >
              { project.tags.map( tag => (
                <span key= { tag }>{ tag }</span>
              ) ) }
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
