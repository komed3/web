import { SiGithub, SiNpm } from 'react-icons/si';


const LINKS = [
  { url: 'https://github.com/komed3', label: 'GitHub', icon: SiGithub },
  { url: 'https://npmjs.com/~komed3', label: 'npm', icon: SiNpm }
] as const;


export function External () {
  return (
    <div className= 'flex'>
      { LINKS.map( ( { url, label, icon: Icon } ) => (
        <a
          key= { url }
          href= { url }
          target= '_blank'
          rel= 'noreferrer'
          className= 'group flex-1 p-12'
        >
          <div className= 'text-(--bg) bg-(--text) p-12'>
            <div className= 'flex justify-end mb-24'>
              <Icon size= { 64 } />
            </div>

            <div className= 'text-2xl uppercase font-extralight tracking-widest'>
              { label }
            </div>
          </div>
        </a>
      ) ) }
    </div>
  );
}
