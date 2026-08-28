import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import projects from '../data/projects.json';


export function Project () {
  const navigate = useNavigate();

  const { id } = useParams();
  const index = projects.findIndex( p => p.id === id );
  const project = projects[ index ];

  useEffect( () => {
    if ( index < 0 || ! project ) navigate( '/index', { replace: true } );
  }, [ id, projects, navigate ] );

  return project && (
    <>
      { /** Header */ }
      <div className= 'flex flex-col w-full h-screen p-12 pt-36'>
        { /** Navigation */ }
        <div className= 'flex-1'></div>

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
