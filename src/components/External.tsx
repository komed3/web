import { motion } from 'motion/react';
import { SiGithub, SiLinux, SiNpm, SiPython } from 'react-icons/si';


const LINKS = [
  { url: 'https://github.com/komed3', label: 'GitHub', icon: SiGithub },
  { url: 'https://npmjs.com/~komed3', label: 'npm', icon: SiNpm },
  { url: 'https://deb.komed3.de', label: 'APT Repo', icon: SiLinux },
  { url: 'https://pypi.org/user/komed3', label: 'Pypi', icon: SiPython }
] as const;


export function External () {
  return (
    <div className= 'flex gap-12 px-12 py-16'>
      { /** Label */ }
      <div className= 'shrink-0 flex flex-col text-2xl uppercase font-extralight tracking-widest'>
        <span>Visit</span>
        <span>my</span>
        <span>work</span>
        <span>at_</span>
      </div>
    </div>
  );
}
