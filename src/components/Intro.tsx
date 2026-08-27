import { motion } from 'motion/react';
import { type ReactNode } from 'react';


export function Intro ( { text }: { text: ReactNode } ) {
  return (
    <div className= 'relative w-full h-screen'>
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= 'centered pt-10'
      >
        <p className= 'max-w-6xl text-5xl uppercase font-extralight tracking-widest leading-snug'>
          { text }
        </p>
      </motion.div>
    </div>
  );
}
