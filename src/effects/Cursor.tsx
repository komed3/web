import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
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

    const handleMouseMove = ( { clientX, clientY, target }: MouseEvent ) => {
      x.set( clientX ), y.set( clientY );

      setIsVisible( true );
      setIsInteractive( !! ( target as HTMLElement ).closest( 'a, button' ) );
    };

    const handleMouseLeave = () => setIsVisible( false );
    const handleMouseEnter = () => setIsVisible( true );

    window.addEventListener( 'mousemove', handleMouseMove );
    document.addEventListener( 'mouseleave', handleMouseLeave );
    document.addEventListener( 'mouseenter', handleMouseEnter );

    return () => {
      window.removeEventListener( 'mousemove', handleMouseMove );
      document.removeEventListener( 'mouseleave', handleMouseLeave );
      document.removeEventListener( 'mouseenter', handleMouseEnter );
    };
  }, [ canUseCustomCursor, x, y ] );

  return (
    <AnimatePresence>
      { canUseCustomCursor && isVisible && (
        <>
          { /** Dot */ }
          <motion.div
            initial= { { opacity: 0 } }
            animate= { { opacity: 1 } }
            exit= { { opacity: 0 } }
            className= {
              'fixed left-0 top-0 z-999 -translate-1/2 w-1.5 h-1.5 bg-white rounded-full ' +
              'mix-blend-difference pointer-events-none'
            }
            style= { { x, y } }
          />

          { /** Circle */ }
          <motion.div
            initial= { { opacity: 0 } }
            animate= { { opacity: 1, scale: isInteractive ? 2 : 1 } }
            exit= { { opacity: 0 } }
            className= {
              'fixed left-0 top-0 z-998 -translate-1/2 w-12 h-12 border border-white rounded-full ' +
              'mix-blend-difference pointer-events-none ' + ( isInteractive && 'bg-white' )
            }
            style= { { x: circleX, y: circleY } }
            transition= { {
              opacity: { duration: 0.15 },
              scale: { type: 'spring', stiffness: 500, damping: 30 }
            } }
          />
        </>
      ) }
    </AnimatePresence>
  );
}
