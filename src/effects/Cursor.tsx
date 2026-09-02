import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';


export function Cursor () {
  const [ canUseCustomCursor, setCanUseCustomCursor ] = useState( false );
  const [ isVisible, setIsVisible ] = useState( false );
  const [ isInteractive, setIsInteractive ] = useState( false );

  const x = useMotionValue( 0 );
  const y = useMotionValue( 0 );

  const circleX = useSpring( x, { stiffness: 900, damping: 45, mass: 0.2 } );
  const circleY = useSpring( y, { stiffness: 900, damping: 45, mass: 0.2 } );

  useEffect( () => {
    const handleContextMenu = ( e: MouseEvent ) => e.preventDefault();
    const handleMouseDown = ( e: MouseEvent ) => {
      if ( e.button === 1 || e.button === 2 ) e.preventDefault();
    };

    document.addEventListener( 'contextmenu', handleContextMenu );
    document.addEventListener( 'mousedown', handleMouseDown );

    return () => {
      document.removeEventListener( 'contextmenu', handleContextMenu );
      document.removeEventListener( 'mousedown', handleMouseDown );
    };
  }, [] );

  useEffect( () => {
    const finePointer = matchMedia( '(pointer: fine)' );
    const hoverPointer = matchMedia( '(hover: hover)' );

    const update = () => setCanUseCustomCursor( finePointer.matches && hoverPointer.matches );
    update();

    finePointer.addEventListener( 'change', update );
    hoverPointer.addEventListener( 'change', update );

    return () => {
      finePointer.removeEventListener( 'change', update );
      hoverPointer.removeEventListener( 'change', update );
    };
  }, [] );

  return (
    <></>
  );
}
