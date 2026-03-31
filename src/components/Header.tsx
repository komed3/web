import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './ui/Button';


export function Header () {
    const [ isOpen, setIsOpen ] = useState( false );

    return ( <>
        {/** Header */}
        <header className="fixed top-0 left-0 w-full z-[100] bg-white brutal-border border-t-0 border-x-0 flex items-center justify-between px-4 md:px-6 py-4">
            <Link to="/" className="text-xl md:text-2xl font-display font-black tracking-tighter">
                KOMED3<span className="text-brutal-blue">::</span>DEV
            </Link>

            <Button
                onClick={ () => setIsOpen( ! isOpen ) }
                bg="bg-brutal-yellow"
                className="flex items-center gap-2 py-2 px-4 md:py-3 md:px-6"
            >
                { isOpen ? <X size={20} /> : <Menu size={20} /> }
                <span className="hidden sm:inline font-black">{ isOpen ? 'CLOSE' : 'MENU' }</span>
            </Button>
        </header>
    </> );
}
