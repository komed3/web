import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';


export default function Cursor () {
    const [ mousePos, setMousePos ] = useState( { x: 0, y: 0 } );
    const [ isHovering, setIsHovering ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( false );

    useEffect( () => {
        const handleMouseMove = ( e: MouseEvent ) => {
            setMousePos( { x: e.clientX, y: e.clientY } );
            if ( ! isVisible ) setIsVisible( true );
        };

        const handleMouseOver = ( e: MouseEvent ) => {
            const target = e.target as HTMLElement;
            setIsHovering( !! (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest( 'a' ) ||
                target.closest( 'button' ) ||
                target.classList.contains( 'interactive' )
            ) );
        };

        const handleMouseLeave = () => setIsVisible( false );
        const handleMouseEnter = () => setIsVisible( true );

        window.addEventListener( 'mousemove', handleMouseMove );
        window.addEventListener( 'mouseover', handleMouseOver );
        document.addEventListener( 'mouseleave', handleMouseLeave );
        document.addEventListener( 'mouseenter', handleMouseEnter );

        return () => {
            window.removeEventListener( 'mousemove', handleMouseMove );
            window.removeEventListener( 'mouseover', handleMouseOver );
            document.removeEventListener( 'mouseleave', handleMouseLeave );
            document.removeEventListener( 'mouseenter', handleMouseEnter );
        };
    }, [ isVisible ] );
}
