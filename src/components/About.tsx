import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';


export function About () {
  return (
    <div className= 'px-12 py-40'>
      { /** Statement */ }
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= 'flex flex-col text-7xl uppercase font-black tracking-tight leading-[0.9]'
      >
        <span>Building</span>
        <span>free & open</span>
        <span>source</span>
      </motion.div>
    </div>
  );
}
