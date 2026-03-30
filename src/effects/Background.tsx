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

    return ( <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        {/* Scanner Line */}
        <motion.div
            className="absolute top-0 bottom-0 w-[1px] bg-brutal-black hidden md:block"
            style={ { x: mouseX } }
        />
        <motion.div
            className="absolute left-0 right-0 h-[1px] bg-brutal-black hidden md:block"
            style={ { y: mouseY } }
        />

        {/* Background Elements */}
        <motion.div
            animate={ { rotate: 360, x: [ 0, 100, 0 ], y: [ 0, 50, 0 ] } }
            transition={ { duration: 20, repeat: Infinity, ease: "linear" } }
            className="absolute -top-20 -left-20 w-96 h-96 border-8 border-brutal-black rounded-full"
        />
        <motion.div
            animate={ { rotate: -360, x: [ 0, -50, 0 ], y: [ 0, 100, 0 ] } }
            transition={ { duration: 25, repeat: Infinity, ease: "linear" } }
            className="absolute top-1/2 -right-20 w-64 h-64 border-8 border-brutal-black"
        />
        <motion.div
            animate={ { scale: [ 1, 1.2, 1 ], rotate: 45 } }
            transition={ { duration: 15, repeat: Infinity, ease: "easeInOut" } }
            className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-brutal-yellow"
        />
    </div> );
}
