import { motion } from 'motion/react';
import { useState } from 'react';


interface PageTransitionProps {
  color: string;
  onComplete: () => void;
}


const PATH_START = 'M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z';
const PATH_WAVE  = 'M 0 80 Q 50 25 100 80 L 100 100 L 0 100 Z';
const PATH_END   = 'M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z';


export function PageTransition ( { color, onComplete }: PageTransitionProps ) {
  const [ fading, setFading ] = useState( false );

  return (
    <motion.div
      className= 'fixed inset-0 z-9999 pointer-events-none'
      style= { { backgroundColor: color } }
      initial= { { y: '100%' } }
      animate= {
        fading
          ? { y: '0%', opacity: 0 }
          : { y: '0%', opacity: 1 }
      }
      transition= {
        fading
          ? { duration: 0.05, ease: 'linear' }
          : { duration: 0.8, ease: [ 0.76, 0, 0.24, 1 ] }
      }
      onAnimationComplete= { () => {
        if ( fading ) return;

        onComplete();
        setFading( true );
      } }
    />
  );
}
