import { useNavigate, useParams } from 'react-router';

import projects from '../../data/projects.json';


export function Project () {
  const navigate = useNavigate();

  const { id } = useParams();
  const index = projects.findIndex( p => p.id === id );
  const project = projects[ index ];

  return ( <></> );
}
