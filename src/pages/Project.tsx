import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import projects from '../data/projects.json';


export function Project () {
  const navigate = useNavigate();

  const { id } = useParams();
  const project = projects.find( p => p.id === id );

  useEffect( () => {
    if ( ! project ) navigate( '/index', { replace: true } );
  }, [ id, projects, navigate ] );

  return (
    <></>
  );
}
