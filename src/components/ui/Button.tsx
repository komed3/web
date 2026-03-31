import { motion, HTMLMotionProps } from 'motion/react';
import { ReactNode, useMemo } from 'react';


interface ButtonProps extends HTMLMotionProps< 'button' > {
    children: ReactNode;
    className?: string;
    bg?: string;
    hoverDark?: boolean;
    as?: any;
    href?: string;
    target?: string;
    rel?: string;
    to?: string;
}


export default function Button ( { children, className = '', bg = 'bg-white', hoverDark = false, as: Component = 'button', ...props }: ButtonProps ) {
    const baseClass = `brutal-btn ${bg} ${ hoverDark ? 'hover-dark' : '' } ${className}`;

    const MotionComponent = useMemo( () => {
        if ( typeof Component === 'string' ) return ( motion as any )[ Component ] || motion.create( Component );
        return motion.create( Component );
    }, [ Component ] );

    return ( <MotionComponent
        whileHover={ { scale: 1.02 } } whileTap={ { scale: 0.98 } }
        className={baseClass} {...props}
    >{children}</MotionComponent> );
}
