import { motion } from 'motion/react';
import { SiGithub, SiLinux, SiNpm, SiPython } from 'react-icons/si';


const LINKS = [
  { url: 'https://github.com/komed3', label: 'GitHub', icon: SiGithub },
  { url: 'https://npmjs.com/~komed3', label: 'npm', icon: SiNpm },
  { url: 'https://deb.komed3.de', label: 'Linux', icon: SiLinux },
  { url: 'https://pypi.org/user/komed3', label: 'Pypi', icon: SiPython }
] as const;


export function External () {
  return (
    <div className= 'grid md:grid-cols-2 2xl:flex gap-6 sm:gap-12 px-6 sm:px-12 py-16 whitespace-nowrap'>
      { /** Label */ }
      <div
        className= {
          'shrink-0 md:col-span-2 flex 2xl:flex-col flex-wrap gap-x-2 text-xl sm:text-2xl uppercase ' +
          'font-extralight tracking-widest'
        }
      >
        <span>Visit</span>
        <span>my</span>
        <span>work</span>
        <span>at_</span>
      </div>

      { /** Links */ }
      { LINKS.map( ( { url, label, icon: Icon }, i ) => (
        <motion.a
          key= { url }
          href= { url }
          target= '_blank'
          rel= 'noreferrer'
          initial= { { y: 200, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          transition= { { delay: i * 0.15 } }
          viewport= { { once: true, amount: 0.3 } }
          className= 'flex-1'
        >
          <div className= 'text-(--contrast) bg-(--main) p-12'>
            <div className= 'flex justify-end mb-24'>
              <Icon size= { 64 } />
            </div>

            <div className= 'text-2xl uppercase font-extralight tracking-widest'>
              { label }
            </div>
          </div>
        </motion.a>
      ) ) }
    </div>
  );
}
