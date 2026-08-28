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

  return (
    <></>
  );
}
