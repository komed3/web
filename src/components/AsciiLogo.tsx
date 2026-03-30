import { useState } from 'react';


const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEF';
const LOGO_GRID = [
    "            XXXX      ",
    "          XXXXXXXX    ",
    "        XXXXXXXXXXXX  ",
    "          XXXXXXXX    ",
    "            XXXX      ",
    "    XXXX              ",
    "  XXXXXXXX            ",
    "XXXXXXXXXXXX          ",
    "  XXXXXXXX            ",
    "    XXXX              ",
    "            XXXX      ",
    "          XXXXXXXX    ",
    "        XXXXXXXXXXXX  ",
    "          XXXXXXXX    ",
    "            XXXX      "
];

export function AsciiLogo () {
    const [ displayGrid ] = useState< string[][] >( () => LOGO_GRID.map( line => 
        line.split( '' ).map( c => c === 'X' ? CHARS[ Math.floor( Math.random() * CHARS.length ) ] : ' ' )
    ) );

    return ( <div className="font-mono text-[14px] sm:text-[18px] md:text-[22px] lg:text-[28px] leading-[1.0] select-none tracking-[0.05em] text-brutal-black font-bold">
        { displayGrid.map( ( line, y ) => (
            <div key={y} className="flex justify-center h-[1.0em]">
                { line.map( ( char, x ) => (
                    <span
                        key={x}
                        className={ char !== ' ' ? 'opacity-100' : 'opacity-0' }
                        style={ { width: '1.0ch' } }
                    >
                        {char}
                    </span>
                ) ) }
            </div>
        ) ) }
    </div> );
}
