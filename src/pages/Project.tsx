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
    () => { if ( ! project ) navigate( '/index', { replace: true } ) },
    [ project, navigate ]
  );

  return project && (
    <>
      { /** Header */ }
      <div className= 'grid grid-cols-[5fr_3fr] h-screen pt-24'>

        { /** Hero */ }
        <div className= 'flex flex-col justify-end p-12'>
          { /** Type */ }
          <div className= 'mb-6 text-2xl font-light uppercase tracking-[0.3em]'>
            { project.type }
          </div>

          { /** Title */ }
          <div className= '-ml-3 text-[clamp(4rem,8vw,8rem)] font-extralight leading-[0.8] -tracking-widest'>
            { project.title }
          </div>

          { /** Description */ }
          <div className= 'flex justify-between items-end gap-24 mt-24'>
            <div>
              { project.desc && (
                <p className= 'max-w-xl text-2xl font-light leading-relaxed'>
                  { project.desc }
                </p>
              ) }
            </div>
          </div>
        </div>

        { /** Aside */ }
        <div className= 'p-12 bg-(--main)'></div>
      </div>

      <div className= 'my-16'></div>
    </>
  );
}
