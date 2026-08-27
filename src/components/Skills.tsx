import { SiCplusplus, SiJavascript, SiPhp, SiTypescript } from 'react-icons/si';


const SKILLS = [
  { label: 'Typescript', icon: SiTypescript },
  { label: 'JavaScript', icon: SiJavascript },
  { label: 'C++', icon: SiCplusplus },
  { label: 'PHP', icon: SiPhp }
] as const;


export function Skills () {
  return (
    <div className= 'grid grid-cols-4 py-40 divide-x divide-y divide-(--text)'>
      { SKILLS.map( ( { label, icon: Icon } ) => (
        <div
          key= { label }
          className= 'p-12'
        >
          <div className= 'flex justify-end mb-16'>
            <Icon size= { 64 } />
          </div>

          <div className= 'text-2xl uppercase font-extralight tracking-widest'>
            { label }
          </div>
        </div>
      ) ) }
    </div>
  );
}
