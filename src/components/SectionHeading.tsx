import { motion } from 'motion/react';


export interface SectionHeadingProps {
    title: string;
    className?: string;
}

export function SectionHeading ( { title, className }: SectionHeadingProps ) {
    return ( <motion.h2 
        initial={ { x: -20, opacity: 0 } }
        whileInView={ { x: 0, opacity: 1 } }
        viewport={ { once: true } }
        className={ `text-4xl md:text-5xl uppercase font-extrabold tracking-tighter ${className}` }
    >{title}</motion.h2> );
}
