import { motion } from 'motion/react';
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
          <motion.div
            initial= { { y: 200, opacity: 0 } }
            whileInView= { { y: 0, opacity: 1 } }
            transition= { { delay: i * 0.15 } }
            viewport= { { once: true, amount: 0.3 } }
          >
            <div className= 'text-xs uppercase tracking-[0.3em]'>
              { label }
            </div>

            <div className= 'mt-10 -ml-1.5 text-7xl font-extralight tracking-tighter'>
              { title }
            </div>

            <div className= 'mt-2 text-xs uppercase tracking-[0.3em]'>
              { subtitle }
            </div>
          </motion.div>
        </div>
      ) ) }
    </div>
  );
}
