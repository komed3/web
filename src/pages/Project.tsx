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
        <div className= 'p-12 '></div>

        { /** Aside */ }
        <div className= 'p-12 bg-(--main)'></div>
      </div>

      <div className= 'my-16'></div>
    </>
  );
}
