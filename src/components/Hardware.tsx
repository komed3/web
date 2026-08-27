import { SiAmd } from 'react-icons/si';


const RESOURCES = [ {
  label: 'Main workstation',
  icon: SiAmd,
  title: '5900XT',
  subtitle: '16C / 32T',
  items: [
    [ 'Memory', '64GB DDR4 3200 MT/s' ],
    [ 'Graphics', 'RTX 3080 Strix 10GB OC' ],
    [ 'System', 'Windows 11 Home' ]
  ]
} ] as const;


export function Hardware () {
  return (
    <div className= 'flex items-stretch py-16 divide-x divide-(--main)'>
      { /** Label */ }
      <div className= 'shrink-0 flex flex-col px-12 text-2xl uppercase font-extralight tracking-widest'>
        <span>Hardware</span>
        <span>resources</span>
        <span>_</span>
      </div>

      { /** Resources */ }
      { RESOURCES.map( ( { label, icon: Icon, title, subtitle, items }, i ) => (
        <div
          key= { label }
          className= 'flex-1 px-12'
        >
          ...
        </div>
      ) ) }
    </div>
  );
}
