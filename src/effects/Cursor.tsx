import { useState } from 'react';


export function Cursor () {
  const [ mousePos, setMousePos ] = useState( { x: 0, y: 0 } );
  const [ canUseCustomCursor, setCanUseCustomCursor ] = useState( false );
  const [ isVisible, setIsVisible ] = useState( false );
  const [ isHovering, setIsHovering ] = useState( false );
}
