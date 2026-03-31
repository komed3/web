import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    className?: string;
    variant?: 'light' | 'dark';
    size?: 'xs' | 'sm' | 'md';
}

const SIZES = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1'
};

const VARIANTS = {
    light: 'bg-white text-black border-2 border-black',
    dark: 'bg-black text-white border-2 border-black'
};

export default function Badge ( { children, className = '', variant = 'light', size = 'xs' }: BadgeProps ) {
    let classes = 'font-black uppercase inline-flex items-center gap-1.5 whitespace-nowrap';
    classes += ` ${ SIZES[ size ] } ${ VARIANTS[ variant ] } ${ className }`;

    return ( <span className={classes}>{children}</span> );
}
