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
      ></motion.div>
    </div>
  );
}
