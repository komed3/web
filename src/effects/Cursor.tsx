import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';


export function Cursor () {
  const [ mousePos, setMousePos ] = useState( { x: 0, y: 0 } );
  const [ canUseCustomCursor, setCanUseCustomCursor ] = useState( false );
  const [ isVisible, setIsVisible ] = useState( false );
  const [ isHovering, setIsHovering ] = useState( false );

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

  useEffect( () => {
    if ( ! canUseCustomCursor ) {
      setIsVisible( false );
      return;
    }

    const handleMouseMove = ( { clientX: x, clientY: y }: MouseEvent ) => {
      setMousePos( { x, y } );
      setIsVisible( true );
    };

    const handleMouseOver = ( { target }: MouseEvent ) => {
      const el = target as HTMLElement;
      setIsHovering( !! ( el.matches( 'a, button, .interactive' ) || el.closest( 'a, button' ) ) );
    };

    const handleMouseDown = ( { button, preventDefault }: MouseEvent ) => {
      if ( button === 1 ) preventDefault();
    };

    const handleMouseLeave = () => setIsVisible( false );
    const handleMouseEnter = () => setIsVisible( true );

    window.addEventListener( 'mousemove', handleMouseMove );
    window.addEventListener( 'mouseover', handleMouseOver );
    window.addEventListener( 'mousedown', handleMouseDown );
    document.addEventListener( 'mouseleave', handleMouseLeave );
    document.addEventListener( 'mouseenter', handleMouseEnter );

    return () => {
      window.removeEventListener( 'mousemove', handleMouseMove );
      window.removeEventListener( 'mouseover', handleMouseOver );
      window.removeEventListener( 'mousedown', handleMouseDown );
      document.removeEventListener( 'mouseleave', handleMouseLeave );
      document.removeEventListener( 'mouseenter', handleMouseEnter );
    };
  }, [ canUseCustomCursor ] );

  const offset = isHovering ? 48 : 32;

  return (
    <AnimatePresence>
      { canUseCustomCursor && isVisible && (
        <motion.div
          initial= { { opacity: 0 } }
          animate= { { opacity: 1 } }
          exit= { { opacity: 0 } }
          className= 'fixed inset-0 pointer-events-none z-9999 overflow-hidden mix-blend-difference'
        ></motion.div>
      ) }
    </AnimatePresence>
  );
}
