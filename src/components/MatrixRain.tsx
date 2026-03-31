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

        let columns = Math.floor( canvas.width / fontSize );
        let rows = Math.floor( canvas.height / fontSize );
        let drops: number[] = [];
        let grid: string[][] = [];

        const initGrid = () => {
            columns = Math.floor( canvas.width / fontSize );
            rows = Math.floor( canvas.height / fontSize );
            drops = new Array( columns ).fill( 0 ).map( () => Math.random() * rows * 2 - rows );
            grid = Array.from( { length: columns }, () =>
                Array.from( { length: rows }, () => chars[ Math.floor( Math.random() * chars.length ) ] )
            );
        };

        initGrid();
    }, []);

    return ( <canvas ref={canvasRef} className="w-full h-full block" /> );
}
