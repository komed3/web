interface BackgroundProps {
    opacity?: number;
    size?: string;
    className?: string;
}


export function Background ( { opacity = 0.06, size = '40px 40px', className = '' }: BackgroundProps ) {
    return ( <div
        className={ `absolute inset-0 z-0 pointer-events-none ${className}` }
        style={ {
            opacity,
            backgroundImage: 'linear-gradient( rgba( 0 0 0 / 1 ) 1px, transparent 1px ), linear-gradient( 90deg, rgba( 0 0 0 / 1 ) 1px, transparent 1px )',
            backgroundSize: `${size}, ${size}`,
            backgroundPosition: '0 0, 0 0'
        } }
    /> );
}
