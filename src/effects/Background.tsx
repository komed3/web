import { motion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';


export function BackgroundElements () {
    const [ , setMousePos ] = useState ( { x: 0, y: 0 } );
    const springConfig = { damping: 25, stiffness: 400 };
    const mouseX = useSpring( 0, springConfig );
    const mouseY = useSpring( 0, springConfig );

    useEffect( () => {
        const handleMouseMove = ( e: MouseEvent ) => {
            mouseX.set( e.clientX ), mouseY.set( e.clientY );
            setMousePos( { x: e.clientX, y: e.clientY } );
        };

        window.addEventListener( 'mousemove', handleMouseMove );
        return () => window.removeEventListener( 'mousemove', handleMouseMove );
    }, [ mouseX, mouseY ] );
}
