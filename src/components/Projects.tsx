import { useState } from 'react';

import projects from '../../data/projects.json';


const PAGE_SIZE = 8;


export function Projects () {
  const [ visible, setVisible ] = useState( PAGE_SIZE );
  const [ columns, setColumns ] = useState( 3 );

  return (
    <>
      <div className= 'grid grid-cols-3 gap-6'></div>
    </>
  );
}
