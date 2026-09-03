import { motion } from 'motion/react';


const NUMBERS = [
  { label: 'Years experience', value: '15+' },
  { label: 'Projects', value: '100+' },
  { label: 'Lines of code', value: '2M+' }
] as const;


export function Numbers () {
  return (
    <div
      className= {
        'grid md:grid-cols-2 2xl:flex gap-6 sm:gap-12 px-6 sm:px-12 py-16 ' +
        'whitespace-nowrap md:divide-x divide-(--main)'
      }
    >
      { /** Label */ }
      <div
        className= {
          'shrink-0 flex md:flex-col flex-wrap gap-x-2 sm:px-12 py-6 md:py-0 ' +
          'text-2xl uppercase font-extralight tracking-widest'
        }
      >
        <span>By the</span>
        <span>numbers</span>
        <span>_</span>
      </div>

      { /** Numbers */ }
      { NUMBERS.map( ( { label, value }, i ) => (
        <div
          key= { label }
          className= 'flex-1 px-6 sm:px-12 pt-20 text-right'
        >
          <motion.div
            initial= { { y: 200, opacity: 0 } }
            whileInView= { { y: 0, opacity: 1 } }
            transition= { { delay: i * 0.15 } }
            viewport= { { once: true, amount: 0.3 } }
          >
            <div className= 'text-9xl font-extralight tracking-tighter'>
              { value }
            </div>

            <div className= 'text-lg uppercase font-light tracking-wide'>
              { label }
            </div>
          </motion.div>
        </div>
      ) ) }
    </div>
  );
}
