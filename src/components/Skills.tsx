import { SiCplusplus, SiJavascript, SiNodedotjs, SiPhp, SiTypescript } from 'react-icons/si';


const SKILLS = [
  { label: 'Typescript', icon: SiTypescript },
  { label: 'JavaScript', icon: SiJavascript },
  { label: 'C++', icon: SiCplusplus },
  { label: 'PHP', icon: SiPhp },
  { label: 'Node.js', icon: SiNodedotjs }
] as const;


export function Skills () {
  return (
    <div className= 'py-40'>
      <div className= 'grid grid-cols-4 gap-px bg-(--main)'>
        { SKILLS.map( ( { label, icon: Icon } ) => (
          <div
            key= { label }
            className= 'p-12 bg-(--accent)'
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
    </div>
  );
}
