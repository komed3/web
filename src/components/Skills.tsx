import {
  SiCplusplus, SiCss, SiJavascript, SiLinux, SiNodedotjs, SiOnlyoffice, SiPhp,
  SiPython, SiReact, SiTailwindcss, SiTypescript, SiWordpress
} from 'react-icons/si';


const SKILLS = [
  { label: 'Typescript', icon: SiTypescript },
  { label: 'JavaScript', icon: SiJavascript },
  { label: 'C++', icon: SiCplusplus },
  { label: 'PHP', icon: SiPhp },
  { label: 'Python', icon: SiPython },
  { label: 'Linux / Shell', icon: SiLinux },
  { label: 'Node.js', icon: SiNodedotjs },
  { label: 'React', icon: SiReact },
  { label: 'Tailwind', icon: SiTailwindcss },
  { label: 'Web Design', icon: SiCss },
  { label: 'SQL / NoSQL', icon: SiOnlyoffice },
  { label: 'Wordpress', icon: SiWordpress }
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
