import { motion } from 'motion/react';
import { SiGimp, SiGit, SiGithub, SiInkscape, SiKrita } from 'react-icons/si';
import { VscVscodeInsiders } from 'react-icons/vsc';


const SOFTWARE = [ {
  label: 'Visual Studio Code',
  desc: 'Development environment',
  icons: [ VscVscodeInsiders ]
}, {
  label: 'Git / GitHub',
  desc: 'Version control',
  icons: [ SiGit, SiGithub ]
}, {
  label: 'Inkscape',
  desc: 'Vector graphics',
  icons: [ SiInkscape ]
}, {
  label: 'Krita / Gimp',
  desc: 'Digital graphics',
  icons: [ SiKrita, SiGimp ]
} ] as const;


export function Software () {
  return (
    <div className= 'py-16 text-(--contrast) bg-(--main)'>
      { /** Label */ }
      <div className= 'px-12 mb-32'>
        <div className= 'text-sm uppercase tracking-[0.3em]'>
          Software
        </div>

        <div className= 'mt-6 -ml-1.5 text-6xl font-extralight'>
          Built with open tools_
        </div>
      </div>

      { /** Content */ }
      <div className= 'px-12'>
        { SOFTWARE.map( ( { label, desc, icons }, i ) => (
          <motion.div
            key= { label }
            className= 'relative min-h-60 py-12 border-t border-(--contrast)'
            initial= { { opacity: 0, y: 30 } }
            whileInView= { { opacity: 1, y: 0 } }
            transition= { { delay: i * 0.05 } }
            viewport= { { once: true, amount: 0.3 } }
          >
            { /** Description */ }
            <div>
              <div className= '-ml-1 text-5xl uppercase font-extralight tracking-widest'>
                { label }
              </div>

              <div className= 'mt-4 text-sm uppercase tracking-[0.2em]'>
                { desc }
              </div>
            </div>

            { /** Icons */ }
            <div className= 'absolute right-0 bottom-10 flex items-end gap-6'>
              { icons.map( ( Icon, j ) => (
                <Icon key= { j } size= { 64 } />
              ) ) }
            </div>
          </motion.div>
        ) ) }
      </div>
    </div>
  );
}
