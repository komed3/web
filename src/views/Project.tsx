import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import projects from '../../data/projects.json';


export function Project () {
  const navigate = useNavigate();

  const { id } = useParams();
  const index = projects.findIndex( p => p.id === id );
  const project = projects[ index ];

  useEffect(
    () => { if ( ! project ) navigate( '/index', { replace: true } ) },
    [ project, navigate ]
  );

  return project && (
    <div className= 'grid grid-cols-[1fr_1px_2fr] gap-20 px-6 sm:px-12 pt-36 pb-24'>
      <div className= ''>...</div>

      <div className= 'bg-(--main)' />

      <div className= ''>...</div>
    </div>
  );
}
