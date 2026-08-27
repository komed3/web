import { motion } from 'motion/react';
import { useState } from 'react';


interface PageTransitionProps {
  color: string;
  onComplete: () => void;
}


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
