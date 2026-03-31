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

    return ( <AnimatePresence>
        { isVisible && ( <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            exit={ { opacity: 0 } }
            className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block"
        >

            {/** Crosshair */}
            <div className="absolute h-full w-[1px] bg-gray-400 opacity-30" style={ {
                left: 0, top: 0, transform: `translateX(${mousePos.x}px)`
            } } />
            <div className="absolute w-full h-[1px] bg-gray-400 opacity-30" style={ {
                left: 0, top: 0, transform: `translateY(${mousePos.y}px)`
            } } />

            {/** Cursor */}
            <div className="absolute w-12 h-12 flex items-center justify-center" style={ {
                left: 0, top: 0, transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`
            } } >
                <motion.div className="absolute inset-0" animate={ {
                    scale: isHovering ? 1.4 : 1,
                    rotate: isHovering ? 90 : 0
                } } >
                    <div className="absolute top-0 left-0 w-4 h-[3px] bg-black" />
                    <div className="absolute top-0 left-0 w-[3px] h-4 bg-black" />
                    <div className="absolute top-0 right-0 w-4 h-[3px] bg-black" />
                    <div className="absolute top-0 right-0 w-[3px] h-4 bg-black" />
                    <div className="absolute bottom-0 left-0 w-4 h-[3px] bg-black" />
                    <div className="absolute bottom-0 left-0 w-[3px] h-4 bg-black" />
                    <div className="absolute bottom-0 right-0 w-4 h-[3px] bg-black" />
                    <div className="absolute bottom-0 right-0 w-[3px] h-4 bg-black" />
                </motion.div>
                <motion.div className="w-2 h-2 rounded-full bg-black" animate={ {
                    scale: isHovering ? 3 : 1,
                } } />
                <div className="absolute w-full h-[1.5px] bg-black" />
                <div className="absolute h-full w-[1.5px] bg-black" />
            </div>

            {/** Coordinates */}
            <div className="absolute flex flex-col gap-0 mix-blend-difference" style={ {
                left: 0, top: 0, transform: `translate3d(${
                    mousePos.x + ( isHovering ? 48 : 32 )
                }px, ${
                    mousePos.y - ( isHovering ? 48 : 32)
                }px, 0)`
            } } >
                <span className="text-[10px] font-mono font-bold text-black leading-none">X:{ Math.round( mousePos.x ) }</span>
                <span className="text-[10px] font-mono font-bold text-black leading-none">Y:{ Math.round( mousePos.y ) }</span>
            </div>
        </motion.div> ) }
    </AnimatePresence> );
}
