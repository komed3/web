import { AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { useState } from 'react';


export function Cursor () {
  const [ canUseCustomCursor, setCanUseCustomCursor ] = useState( false );
  const [ isVisible, setIsVisible ] = useState( false );
  const [ isInteractive, setIsInteractive ] = useState( false );

  const x = useMotionValue( 0 );
  const y = useMotionValue( 0 );

  const circleX = useSpring( x, { stiffness: 900, damping: 45, mass: 0.2 } );
  const circleY = useSpring( y, { stiffness: 900, damping: 45, mass: 0.2 } );

  return (
    <AnimatePresence></AnimatePresence>
  );
}
