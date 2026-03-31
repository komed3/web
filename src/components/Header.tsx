import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
import { Atom, CircleDollarSign, Coffee, Database, Mail, Menu, Package, Plane, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
        { name: 'Twitter / X', icon: <SiX size={20} />, url: 'https://x.com/komed3dev' },
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

        {/** Fly-Out Menu */}
        <AnimatePresence>
            { isOpen && ( <motion.div
                initial={ { x: '100%' } }
                animate={ { x: 0 } }
                exit={ { x: '100%' } }
                transition={ { type: 'spring', damping: 25, stiffness: 200 } }
                className="fixed inset-0 z-[90] bg-brutal-blue brutal-border border-r-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden"
                style={ {
                    backgroundImage: `
                        linear-gradient( rgba( 255 255 255 / 0.05 ) 1px, transparent 1px ),
                        linear-gradient( 90deg, rgba( 255 255 255 / 0.05 ) 1px, transparent 1px )
                    `,
                    backgroundSize: '60px 60px'
                } }
            >
                <div className="relative flex-1 p-4 sm:p-8 lg:p-12 flex flex-col justify-center gap-4 lg:gap-8 bg-white brutal-border border-y-0 border-l-0 overflow-hidden">

                    {/* Technical Grid Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
                        style={ {
                            backgroundImage: `
                            linear-gradient( rgba( 0 0 0 / 1 ) 1px, transparent 1px ),
                            linear-gradient( 90deg, rgba( 0 0 0 / 1 ) 1px, transparent 1px )
                            `,
                            backgroundSize: '40px 40px'
                        } }>
                    </div>

                    {/** Left Column (Links) */}
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-4xl lg:text-8xl font-display font-black leading-none">
                            EXPLORE<br />
                            <span className="text-brutal-pink">THE CORE.</span>
                        </h2>

                        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 mt-4 lg:gap-8">
                            { menuItems.map( ( item ) => (
                                <Button
                                    key={item.name}
                                    as="a"
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    bg="bg-white"
                                    hoverDark
                                    className="hover:bg-brutal-green flex items-center justify-between group py-2 lg:py-3 px-3 lg:px-4 text-black"
                                    onClick={ () => setIsOpen( false ) }
                                >
                                    <span className="flex items-center gap-2 lg:gap-3 font-black text-[9px] sm:text-xs lg:text-sm xl:text-base">
                                        {item.icon}
                                        <span className="truncate max-w-[100px] sm:max-w-none">{item.name}</span>
                                    </span>
                                </Button>
                            ) ) }
                        </nav>
                    </div>
                </div>

                {/** Right Column (Social) */}
                <div className="w-full lg:w-1/3 p-4 sm:p-8 lg:p-12 flex flex-col justify-between bg-brutal-yellow gap-4 lg:gap-12 text-black">
                    <div className="space-y-2 lg:space-y-8">
                        <h3 className="text-lg lg:text-3xl font-display font-black">SOCIALS</h3>
                        <div className="flex flex-col gap-1.5 lg:gap-4">
                            { socialItems.map( ( item ) => (
                                <Button
                                    key={item.name}
                                    as="a"
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    bg="bg-white"
                                    hoverDark
                                    className="hover:bg-brutal-pink flex items-center gap-2 lg:gap-3 py-1.5 lg:py-3 px-3 lg:px-4 text-black"
                                    onClick={ () => setIsOpen( false ) }
                                >
                                    <span className="font-black text-[9px] sm:text-xs lg:text-sm xl:text-base flex items-center gap-2 lg:gap-3">
                                        {item.icon}
                                        <span className="truncate max-w-[100px] sm:max-w-none">{item.name}</span>
                                    </span>
                                </Button>
                            ) ) }
                        </div>
                    </div>

                    <div className="text-[9px] lg:text-sm font-bold mt-4 lg:mt-0">
                        (C) 2026 KOMED3. ALL RIGHTS RESERVED.<br />
                        BUILDING OPEN SOURCE SINCE 2010.
                    </div>
                </div>
            </motion.div> ) }
        </AnimatePresence>
    </> );
}
