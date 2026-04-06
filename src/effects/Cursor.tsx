import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';


export function Cursor () {
    const [ mousePos, setMousePos ] = useState( { x: 0, y: 0 } );
    const [ isHovering, setIsHovering ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( false );
    const [ canUseCustomCursor, setCanUseCustomCursor ] = useState( false );

    useEffect( () => {
        if ( typeof window === 'undefined' ) return;

        const finePointer = window.matchMedia( '(pointer: fine)' );
        const hoverPointer = window.matchMedia( '(hover: hover)' );

        const updateCanUseCustomCursor = () => {
            setCanUseCustomCursor( finePointer.matches && hoverPointer.matches );
        };

        updateCanUseCustomCursor();

        if ( typeof finePointer.addEventListener === 'function' ) {
            finePointer.addEventListener( 'change', updateCanUseCustomCursor );
            hoverPointer.addEventListener( 'change', updateCanUseCustomCursor );
        } else {
            finePointer.addListener( updateCanUseCustomCursor );
            hoverPointer.addListener( updateCanUseCustomCursor );
        }

        return () => {
            if ( typeof finePointer.removeEventListener === 'function' ) {
                finePointer.removeEventListener( 'change', updateCanUseCustomCursor );
                hoverPointer.removeEventListener( 'change', updateCanUseCustomCursor );
            } else {
                finePointer.removeListener( updateCanUseCustomCursor );
                hoverPointer.removeListener( updateCanUseCustomCursor );
            }
        };
    }, [] );

    useEffect( () => {
        if ( ! canUseCustomCursor ) {
            if ( isVisible ) setIsVisible( false );
            return;
        }

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

        const handleMouseDown = ( e: MouseEvent ) => { if ( e.button === 1 ) e.preventDefault() };
        const handleMouseLeave = () => setIsVisible( false );
        const handleMouseEnter = () => setIsVisible( true );

        window.addEventListener( 'mousedown', handleMouseDown );
        window.addEventListener( 'mousemove', handleMouseMove );
        window.addEventListener( 'mouseover', handleMouseOver );
        document.addEventListener( 'mouseleave', handleMouseLeave );
        document.addEventListener( 'mouseenter', handleMouseEnter );

        return () => {
            window.removeEventListener( 'mousedown', handleMouseDown );
            window.removeEventListener( 'mousemove', handleMouseMove );
            window.removeEventListener( 'mouseover', handleMouseOver );
            document.removeEventListener( 'mouseleave', handleMouseLeave );
            document.removeEventListener( 'mouseenter', handleMouseEnter );
        };
    }, [ canUseCustomCursor, isVisible ] );

    return ( <AnimatePresence>
        { canUseCustomCursor && isVisible && ( <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            exit={ { opacity: 0 } }
            className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden mix-blend-difference"
        >

            {/** Crosshair */}
            <div className="absolute h-full opacity-20" style={ {
                left: -1, top: 0, transform: `translateX(${mousePos.x}px)`,
                borderLeft: '2px dotted white'
            } } />
            <div className="absolute w-full opacity-20" style={ {
                left: 0, top: -1, transform: `translateY(${mousePos.y}px)`,
                borderTop: '2px dotted white'
            } } />

            {/** Cursor */}
            <div className="absolute w-12 h-12 flex items-center justify-center" style={ {
                left: 0, top: 0, transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`
            } } >
                <motion.div className="absolute inset-0" animate={ {
                    scale: isHovering ? 1.4 : 1,
                    rotate: isHovering ? 90 : 0
                } } >
                    <div className="absolute top-0 left-0 w-4 h-[3px] bg-white" />
                    <div className="absolute top-0 left-0 w-[3px] h-4 bg-white" />
                    <div className="absolute top-0 right-0 w-4 h-[3px] bg-white" />
                    <div className="absolute top-0 right-0 w-[3px] h-4 bg-white" />
                    <div className="absolute bottom-0 left-0 w-4 h-[3px] bg-white" />
                    <div className="absolute bottom-0 left-0 w-[3px] h-4 bg-white" />
                    <div className="absolute bottom-0 right-0 w-4 h-[3px] bg-white" />
                    <div className="absolute bottom-0 right-0 w-[3px] h-4 bg-white" />
                </motion.div>
                <motion.div className="w-2 h-2 rounded-full bg-brutal-pink" animate={ {
                    scale: isHovering ? 3 : 1,
                } } />
                <div className="absolute w-full h-[1.5px] bg-white" />
                <div className="absolute h-full w-[1.5px] bg-white" />
            </div>

            {/** Coordinates */}
            <div className="absolute flex flex-col gap-0" style={ {
                left: 0, top: 0, transform: `translate3d(${
                    mousePos.x + ( isHovering ? 48 : 32 )
                }px, ${
                    mousePos.y - ( isHovering ? 48 : 32)
                }px, 0)`
            } } >
                <span className="text-[10px] font-mono text-white">X:{ Math.round( mousePos.x ) }</span>
                <span className="text-[10px] font-mono text-white">Y:{ Math.round( mousePos.y ) }</span>
            </div>
        </motion.div> ) }
    </AnimatePresence> );
}
