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
