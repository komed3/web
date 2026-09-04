import { useState } from 'react';


interface ProjectFiltersProps {
  filters: string[];
  value: string;
  onChange: ( value: string ) => void;
}


function ProjectFilters ( { filters, value, onChange }: ProjectFiltersProps ) {
  const [ open, setOpen ] = useState( false );
}


export function Projects () {
  return (
    <></>
  );
}
