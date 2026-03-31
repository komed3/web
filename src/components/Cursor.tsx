import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';


export default function Cursor () {
    const [ mousePos, setMousePos ] = useState( { x: 0, y: 0 } );
    const [ isHovering, setIsHovering ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( false );

}
