import { useEffect, useRef } from 'react';


export function MatrixRain () {
    const canvasRef = useRef< HTMLCanvasElement >( null );

    return ( <canvas ref={canvasRef} className="w-full h-full block" /> );
}
