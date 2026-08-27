import { motion } from 'motion/react';


interface PageTransitionProps {
  color: string;
  onComplete: () => void;
}


export function PageTransition ( { color, onComplete }: PageTransitionProps ) {
  return (
    <motion.div
      className= 'fixed inset-0 z-9999 pointer-events-none'
      style= { { backgroundColor: color } }
      initial= { { y: '100%' } }
      animate= { { y: '0%' } }
      transition= { { duration: 0.8, ease: [ 0.76, 0, 0.24, 1 ] } }
      onAnimationComplete= { onComplete }
    />
  );
}
