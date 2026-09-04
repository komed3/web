import { motion } from 'motion/react';


export function NotFound () {
  return (
    <div className= 'w-full h-screen'>
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= 'centered w-full px-6 sm:px-12 lg:px-20'
      >
        <div
          className= {
            'max-w-5xl mx-auto text-right text-balance uppercase ' +
            'font-extralight tracking-widest leading-snug'
          }
        >
          <div className= 'text-[clamp(4rem,10vw,8rem)]'>
            404
          </div>

          <div className= 'text-[clamp(1.6rem,4vw,2rem)]'>
            Some bytes get lost
          </div>
        </div>
      </motion.div>
    </div>
  );
}
