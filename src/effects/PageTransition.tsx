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
    >
      <svg
        className= 'absolute inset-0 w-full h-full'
        viewBox= '0 0 100 100'
        preserveAspectRatio= 'none'
      >
        <motion.path
          fill= { color }
          initial= { { d: PATH_START } }
          animate= {
            fading
              ? { opacity: 0 }
              : { d: [ PATH_START, PATH_WAVE, PATH_END ] }
          }
          transition= {
            fading
              ? { duration: 0.05, ease: 'linear' }
              : { duration: 0.7, times: [ 0, 0.5, 1 ], ease: 'linear' }
          }
          onAnimationComplete= { () => {
            if ( fading ) return;

            onComplete();
            setFading( true );
          } }
        />
      </svg>
    </motion.div>
  );
}
