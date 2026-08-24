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
        >
          { /** Crosshair */ }
          <div
            className= 'absolute h-full opacity-20 border-l-2 border-dotted border-white'
            style= { { transform: `translateX(${ mousePos.x - 1 }px)` } }
          />
          <div
            className= 'absolute w-full opacity-20 border-t-2 border-dotted border-white'
            style= { { transform: `translateY(${ mousePos.y - 1 }px)` } }
          />

          { /** Cursor */ }
          <div
            className= 'absolute w-12 h-12'
            style= { { transform: `translate3d(${ mousePos.x }px, ${ mousePos.y }px, 0) translate(-50%, -50%)` } }
          >
            <motion.div
              className= 'absolute inset-0'
              animate= { {
                scale: isHovering ? 1.4 : 1,
                rotate: isHovering ? 90 : 0
              } }
            >
              { [ 'top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0' ].map( pos => (
                <div key= { pos }>
                  <div className= { `absolute ${ pos } w-4 h-0.5 bg-white` } />
                  <div className= { `absolute ${ pos } w-0.5 h-4 bg-white` } />
                </div>
              ) ) }
            </motion.div>

            <motion.div
              className= 'centered w-2.5 h-2.5 bg-brutal-pink'
              animate= { { scale: isHovering ? 3 : 1 } }
            />

            <div className= 'centered w-full h-0.5 bg-white' />
            <div className= 'centered h-full w-0.5 bg-white' />
          </div>

          { /** Coordinates */ }
          <div
            className= 'absolute flex flex-col gap-0.5 leading-none'
            style= { { transform: `translate3d(${ mousePos.x + offset }px, ${ mousePos.y - offset }px, 0)` } }
          >
            <span className= 'text-[10px] font-mono text-white'>
              X:{ Math.round( mousePos.x ) }
            </span>
            <span className= 'text-[10px] font-mono text-white'>
              Y:{ Math.round( mousePos.y ) }
            </span>
          </div>
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
