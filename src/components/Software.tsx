import { motion } from 'motion/react';
import { SiGit, SiInkscape, SiKrita } from 'react-icons/si';
import { VscVscodeInsiders } from 'react-icons/vsc';


const SOFTWARE = [ {
  label: 'Visual Studio Code',
  desc: 'Development environment',
  icon: VscVscodeInsiders
}, {
  label: 'Git / GitHub',
  desc: 'Version control',
  icon: SiGit
}, {
  label: 'Inkscape',
  desc: 'Vector graphics',
  icon: SiInkscape
}, {
  label: 'Krita / Gimp',
  desc: 'Digital graphics',
  icon: SiKrita
} ] as const;


export function Software () {
  return (
    <div className= 'my-20 py-16 text-(--contrast) bg-(--main)'>
      { /** Header */ }
      <div className= 'px-12'>
        <div className= 'text-xs uppercase tracking-[0.3em]'>
          Software
        </div>

        <div className= 'mt-6 -ml-1.5 text-5xl font-extralight'>
          Built with open tools_
        </div>
      </div>

      { /** Content */ }
      <div className= 'grid grid-cols-2 gap-px mx-12 my-16 bg-(--contrast)'>
        { SOFTWARE.map( ( { label, desc, icon: Icon }, i ) => (
          <div
            key= { i }
            className= 'flex justify-between items-center gap-12 py-12 bg-(--main)'
            style= { {
              paddingLeft: i % 2 == 0 ? 0 : 48,
              paddingRight: i % 2 == 0 ? 48 : 0
            } }
          >
            <motion.div
              className= 'space-y-2'
              initial= { { y: 40, opacity: 0 } }
              whileInView= { { y: 0, opacity: 1 } }
              transition= { { delay: i * 0.03 } }
              viewport= { { once: true, amount: 0.3 } }
            >
              <div className= 'text-xs uppercase tracking-[0.3em]'>
                { desc }
              </div>

              <div className= 'text-3xl font-light tracking-tight'>
                { label }
              </div>
            </motion.div>

            <Icon size= { 48 } />
          </div>
        ) ) }
      </div>

      { /** Footer */ }
      <div className= 'px-12 text-xs uppercase tracking-[0.3em]'>
        Open source / free software / independent tools
      </div>
    </div>
  );
}
