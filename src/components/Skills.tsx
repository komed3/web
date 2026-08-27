import { SiTypescript } from 'react-icons/si';


const SKILLS = [
  { label: 'Typescript', icon: SiTypescript }
] as const;


export function Skills () {
  return (
    <div className= 'grid grid-cols-4 divide-x divide-y divide-(--text)'></div>
  );
}
