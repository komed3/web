import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

import { Button } from './Button';


export function ScrollToTopButton () {
    const [ isVisible, setIsVisible ] = useState( false );
    const [ bottomOffset, setBottomOffset ] = useState( 24 );

    const scrollToTop = () => window.scrollTo( { top: 0, behavior: 'smooth' } );

    useEffect( () => {
        const toggleVisibility = () => setIsVisible( window.scrollY > 300 );
        window.addEventListener( 'scroll', toggleVisibility );
        return () => window.removeEventListener( 'scroll', toggleVisibility );
    }, [] );
    
    useEffect( () => {
        const footer = document.querySelector( 'footer' );
        if ( ! footer ) return;

        let tracking = false;
        const updatePosition = () => {
            if ( ! tracking ) return;

            const rect = footer.getBoundingClientRect();
            const overlap = window.innerHeight - rect.top;
            setBottomOffset( overlap > 0 ? overlap + 24 : 24 );
        };

        const observer = new IntersectionObserver( ( [ entry ] ) => {
            tracking = entry.isIntersecting;

            if ( ! tracking ) setBottomOffset( 24 );
            else updatePosition();
        }, { threshold: 0 } );

        observer.observe( footer );
        window.addEventListener( 'scroll', updatePosition );

        return () => {
            observer.disconnect();
            window.removeEventListener( 'scroll', updatePosition );
        };
    }, [] );

    return ( <AnimatePresence>
        { isVisible && ( <motion.div
            initial={ { opacity: 0, y: 20, scale: 0.8 } }
            animate={ { opacity: 1, y: 0, scale: 1 } }
            exit={ { opacity: 0, y: 20, scale: 0.8 } }
            style={ {
                position: 'fixed',
                right: 24,
                bottom: bottomOffset,
                zIndex: 1000,
            } }
        >
            <Button
                onClick={scrollToTop} bg="bg-brutal-blue"
                className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center p-0 rounded-none border-4 border-black border-r-8 border-b-8 active:border-r-4 active:border-b-4 translate-x-0 active:translate-x-1 active:translate-y-1 transition-all"
            >
                <ArrowUp size={32} className="text-white" strokeWidth={3} />
            </Button>
        </motion.div> ) }
    </AnimatePresence> );
}
