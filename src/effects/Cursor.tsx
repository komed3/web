import { motion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';


export function Cursor () {
    const [ mousePos, setMousePos ] = useState( { x: 0, y: 0 } );
    const [ isPointer, setIsPointer ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( false );

    const springConfig = { damping: 20, stiffness: 600 };
    const cursorX = useSpring( 0, springConfig );
    const cursorY = useSpring( 0, springConfig );

    useEffect( () => {
        const moveMouse = ( e: MouseEvent ) => {
            setMousePos( { x: e.clientX, y: e.clientY } );
            cursorX.set( e.clientX ), cursorY.set( e.clientY );
            setIsVisible( true );

            const target = e.target as HTMLElement;
            const isClickable = !! target.closest( 'a, button, [role="button"], .cursor-pointer' );
            setIsPointer( isClickable );
        };

        const handleMouseLeave = () => setIsVisible( false );
        const handleMouseEnter = () => setIsVisible( true );

        window.addEventListener( 'mousemove', moveMouse );
        document.addEventListener( 'mouseleave', handleMouseLeave );
        document.addEventListener( 'mouseenter', handleMouseEnter );

        return () => {
            window.removeEventListener( 'mousemove', moveMouse );
            document.removeEventListener( 'mouseleave', handleMouseLeave );
            document.removeEventListener( 'mouseenter', handleMouseEnter );
        };
    }, [ cursorX, cursorY ] );

    if ( ! isVisible ) return null;

    return ( <>
        {/* Crosshair */}
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-brutal-pink/30 z-[9999] pointer-events-none hidden md:block"
            style={ {
                x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%',
                rotate: isPointer ? 45 : 0, scale: isPointer ? 1.5 : 1
            } }
        >
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brutal-pink/30" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-brutal-pink/30" />
        </motion.div>

        {/* Main Dot */}
        <motion.div
            className="fixed top-0 left-0 w-2 h-2 bg-brutal-pink z-[9999] pointer-events-none mix-blend-difference hidden md:block"
            style={ { x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%', scale: isPointer ? 2 : 1 } }
        />

        {/* Coordinates */}
        <motion.div
            className="fixed top-0 left-0 font-mono text-[8px] text-brutal-pink z-[9999] pointer-events-none hidden md:block ml-4 mt-4"
            style={ { x: cursorX, y: cursorY } }
        >
            [{ Math.round( mousePos.x ) }, { Math.round( mousePos.y ) }]
        </motion.div>
    </> );
}
