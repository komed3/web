import { motion } from 'motion/react';
import { type ReactNode } from 'react';


interface IntroProps {
  text: ReactNode;
}


export function Intro ( { text }: IntroProps ) {
  return (
    <div className= 'relative w-full h-screen'>
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= 'centered w-full px-6 sm:px-12 lg:px-20 pt-10'
      >
        <p
          className= {
            'max-w-5xl mx-auto text-balance text-[clamp(2rem,5vw,3rem)] uppercase ' +
            'font-extralight tracking-widest leading-snug'
          }
        >
          { text }
        </p>
      </motion.div>
    </div>
  );
}
