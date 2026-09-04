import { useMemo, useState } from 'react';

import projects from '../../data/projects.json';


interface ProjectFiltersProps {
  filters: string[];
  value: string;
  onChange: ( value: string ) => void;
}


function ProjectFilters ( { filters, value, onChange }: ProjectFiltersProps ) {
  const [ open, setOpen ] = useState( false );

  return (
    <div>
      { /** Trigger */ }

      { /** Filters */ }
    </div>
  );
}


export function Projects () {
  const [ filter, setFilter ] = useState( 'All' );
  const filters = useMemo( () => [ 'All', ...new Set( projects.map( p => p.type ) ) ], [] );

  return (
    <>
      { /** Filters */ }
      <ProjectFilters
        filters= { filters }
        value= { filter }
        onChange= { f => setFilter( f ) }
      />
    </>
  );
}
