import { motion } from 'motion/react';


const RESOURCES = [ {
  label: 'Main workstation',
  title: '5900XT',
  subtitle: '16C / 32T',
  items: [
    [ 'Memory', '64GB DDR4 3200 MT/s' ],
    [ 'Graphics', 'RTX 3080 Strix 10GB OC' ],
    [ 'System', 'Windows 11 Home' ]
  ]
}, {
  label: 'Home server',
  title: '4600G',
  subtitle: '6C / 12T',
  items: [
    [ 'Memory', '16GB DDR4' ],
    [ 'System', 'Ubuntu Server 24.04 LTS' ]
  ]
}, {
  label: 'Mobile gear',
  title: '02',
  subtitle: 'legacy laptops',
  items: [
    [ 'System', 'Ubuntu Linux' ],
    [ 'Purpose', [
      'Field testing',
      'Remote network management',
      'Sandbox environments'
    ] ]
  ]
} ] as const;


export function Hardware () {
  return (
    <div className= 'grid md:grid-cols-2 2xl:flex gap-px my-16 bg-(--main)'>
      { /** Label */ }
      <div
        className= {
          'shrink-0 flex md:flex-col flex-wrap gap-x-2 px-6 sm:px-12 py-6 2xl:py-0 ' +
          'text-2xl uppercase font-extralight tracking-widest bg-(--accent)'
        }
      >
        <span>Hardware</span>
        <span>resources</span>
        <span>_</span>
      </div>

      { /** Resources */ }
      { RESOURCES.map( ( { label, title, subtitle, items }, i ) => (
        <div
          key= { label }
          className= 'flex-1 px-6 sm:px-12 py-6 2xl:py-0 text-right bg-(--accent)'
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

            <div className= 'mt-10 text-5xl sm:text-7xl font-extralight tracking-tighter'>
              { title }
            </div>

            <div className= 'mt-2 text-xs uppercase tracking-[0.3em]'>
              { subtitle }
            </div>

            <div className= 'mt-16 space-y-8'>
              { items.map( ( [ label, value ] ) => (
                <div key= { `${ label }-${ value }` }>
                  <div className= 'text-[11px] uppercase tracking-[0.3em] opacity-70'>
                    { label }
                  </div>

                  <div className= 'text-lg font-light'>
                    { Array.isArray( value ) ? value.map( ( item, j ) => (
                      <div key= { j }>{ item }</div>
                    ) ) : value }
                  </div>
                </div>
              ) ) }
            </div>
          </motion.div>
        </div>
      ) ) }
    </div>
  );
}
