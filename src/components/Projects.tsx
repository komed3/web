import { useState } from 'react';


const PAGE_SIZE = 8;


export function Projects () {
  const [ filter, setFilter ] = useState( 'All' );
  const [ search, setSearch ] = useState( '' );
  const [ visible, setVisible ] = useState( PAGE_SIZE );
  const [ columns, setColumns ] = useState( 3 );

  return (
    <div className= 'px-12 py-32'>
      { /** Header */ }
      <div className= 'flex justify-between items-end pb-20'>
        { /** Title */ }
        <div className= 'space-y-6'>
          <div className= 'text-xs uppercase tracking-[0.3em]'>
            Selected work
          </div>

          <div className= '-ml-6 text-[clamp(6rem,14vw,13rem)] font-extralight leading-[0.8] tracking-tighter'>
            Projects
          </div>
        </div>

        { /** Search */ }
        <div className= 'shrink-0 pb-1'>
          <input
            value= { search }
            onChange= { event => setSearch( event.target.value ) }
            placeholder= 'Type to search_'
            className= {
              'w-72 py-3 text-right text-md font-light tracking-wide placeholder:text-(--main) ' +
              'bg-transparent border-b border-(--main) outline-none'
            }
          />
        </div>
      </div>
    </div>
  );
}
