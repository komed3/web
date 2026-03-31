import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
import { Atom, CircleDollarSign, Coffee, Database, Mail, Menu, Package, Plane, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './ui/Button';


export function Header () {
    const [ isOpen, setIsOpen ] = useState( false );

    const menuItems = [
        { name: 'GitHub', icon: <SiGithub size={20} />, url: 'https://github.com/komed3' },
        { name: 'Periodic Table', icon: <Atom size={20} />, url: 'https://pse-info.de' },
        { name: 'AirportMap', icon: <Plane size={20} />, url: 'https://airportmap.de' },
        { name: 'Realtime Billionaires', icon: <CircleDollarSign size={20} />, url: 'https://realtimebillionaires.de' },
        { name: 'NPM Packages', icon: <Package size={20} />, url: 'https://npmjs.com/~komed3' },
        { name: 'APT Repo', icon: <Database size={20} />, url: 'https://deb.komed3.de' }
    ];

    const socialItems = [
        { name: 'Ko-fi', icon: <Coffee size={20} />, url: 'https://ko-fi.com/komed3' },
        { name: 'Twitter/X', icon: <SiX size={20} />, url: 'https://x.com/komed3dev' },
        { name: 'Contact', icon: <Mail size={20} />, url: 'mailto:webmaster@komed3.de' }
    ];

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
