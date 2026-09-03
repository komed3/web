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
    <div className= 'my-24 py-12 text-(--contrast) bg-(--main)'>
      { /** Header */ }
      <div className= 'px-6 sm:px-12'>
        <div className= 'text-xs uppercase tracking-[0.3em]'>
          Software
        </div>

        <div className= 'mt-6 -ml-1.5 text-4xl sm:text-5xl font-extralight'>
          Built with open tools_
        </div>
      </div>

      { /** Footer */ }
      <div className= 'px-6 sm:px-12 text-xs uppercase tracking-[0.3em]'>
        Open source / free software / independent tools
      </div>
    </div>
  );
}
