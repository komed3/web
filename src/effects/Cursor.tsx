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
}
