import { motion } from 'motion/react';
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
    <div className= 'grid grid-cols-4 gap-px my-16 bg-(--main)'>
      { SKILLS.map( ( { label, icon: Icon }, i ) => (
        <div
          key= { label }
          className= 'p-12 bg-(--accent)'
        >
          <motion.div
            initial= { { y: 40, opacity: 0 } }
            whileInView= { { y: 0, opacity: 1 } }
            transition= { { delay: i * 0.03 } }
            viewport= { { once: true, amount: 0.3 } }
          >
            <div className= 'flex justify-end mb-16'>
              <Icon size= { 64 } />
            </div>

            <div className= 'text-2xl uppercase font-extralight tracking-widest'>
              { label }
            </div>
          </motion.div>
        </div>
      ) ) }
    </div>
  );
}
