import { useEffect, useRef } from 'react';


export function MatrixRain () {
    const canvasRef = useRef< HTMLCanvasElement >( null );

    useEffect( () => {
        const canvas = canvasRef.current;
        if ( ! canvas ) return;

        const ctx = canvas.getContext( '2d' );
        if ( ! ctx ) return;

        const resize = () => {
            const parent = canvas.parentElement;

            if ( parent ) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        resize();

        const resizeObserver = new ResizeObserver( resize );
        if ( canvas.parentElement ) resizeObserver.observe( canvas.parentElement );

        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/';
        const fontSize = 28;

        const randChar = () => chars[ Math.floor( Math.random() * chars.length ) ];

        let columns = Math.floor( canvas.width / fontSize );
        let rows = Math.floor( canvas.height / fontSize );
        let grid: string[][] = [];
        let drops: number[] = [];

        const initGrid = () => {
            columns = Math.floor( canvas.width / fontSize );
            rows = Math.floor( canvas.height / fontSize );
            grid = Array.from( { length: columns }, () => Array.from( { length: rows }, () => randChar() ) );
            drops = new Array( columns ).fill( 0 ).map( () => Math.random() * rows * 2 - rows );
        };

        initGrid();

        const draw = () => {
            ctx.fillStyle = '#f030ba';
            ctx.fillRect( 0, 0, canvas.width, canvas.height );

            ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const currentCols = Math.floor( canvas.width / fontSize );
            const currentRows = Math.floor( canvas.height / fontSize );

            if ( currentCols !== columns || currentRows !== rows ) initGrid();

            for ( let i = 0; i < columns; i++ ) {
                for ( let j = 0; j < rows; j++ ) {
                    if ( Math.random() > 0.98 ) grid[ i ][ j ] = randChar();

                    const x = i * fontSize + fontSize / 2;
                    const y = j * fontSize + fontSize / 2;

                    const dropPos = drops[ i ];
                    const distance = j - dropPos;

                    if ( j === Math.floor( dropPos ) ) ctx.fillStyle = '#fff';
                    else if ( distance < 0 && distance > -8 ) ctx.fillStyle = `rgba( 255 255 255 / ${ 1 + ( distance * 0.12 ) } )`;
                    else ctx.fillStyle = '#000000';

                    ctx.fillText( grid[ i ][ j ], x, y );
                }

                drops[ i ] += 0.025;
                if ( drops[ i ] > rows + 10 ) drops[ i ] = -10;
            }
        };

        const interval = setInterval( draw, 200 );

        return () => {
            clearInterval( interval );
            resizeObserver.disconnect();
        };
    }, [] );

    return ( <canvas ref={canvasRef} className="w-full h-full block" /> );
}
