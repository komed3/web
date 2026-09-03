import { motion } from 'motion/react';
import { SiGithub, SiLinux, SiNpm, SiPython } from 'react-icons/si';


const LINKS = [
  { url: 'https://github.com/komed3', label: 'GitHub', icon: SiGithub },
  { url: 'https://npmjs.com/~komed3', label: 'npm', icon: SiNpm },
  { url: 'https://deb.komed3.de', label: 'APT Repo', icon: SiLinux },
  { url: 'https://pypi.org/user/komed3', label: 'Pypi', icon: SiPython }
] as const;
