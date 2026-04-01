import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
import { ArrowDown, Coffee, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from './ui/Button';


export function Intro () {
    return ( <section className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Big Typography */}
        <div className="relative z-10 flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-white brutal-border border-y-0 border-l-0 overflow-hidden">

            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]" style={ {
                backgroundImage: `
                    linear-gradient( rgba( 0 0 0 / 1 ) 1px, transparent 1px ),
                    linear-gradient( 90deg, rgba( 0 0 0 / 1 ) 1px, transparent 1px ),
                    radial-gradient( rgba( 0 0 0 / 1 ) 1.5px, transparent 1.5px )
                `,
                backgroundSize: '40px 40px, 40px 40px, 40px 40px',
                backgroundPosition: '0 0, 0 0, 20px 20px'
            } } />

            {/** Intro */}
            <div className="relative z-10 space-y-2">
                <motion.div
                    initial={ { x: -100, opacity: 0 } }
                    animate={ { x: 0, opacity: 1 } }
                    transition={ { duration: 0.6, ease: "easeOut" } }
                    className="inline-block bg-black text-white px-4 py-2 text-sm md:text-xl font-black uppercase"
                >
                    EST. 2010
                </motion.div>
                <motion.h1
                    initial={ { y: 100, opacity: 0 } }
                    animate={ { y: 0, opacity: 1 } }
                    transition={ { duration: 0.8, delay: 0.2, ease: "easeOut" } }
                    className="text-5xl sm:text-7xl lg:text-6xl xl:text-[8vw] leading-[0.8] font-display font-black tracking-tighter uppercase break-words"
                >
                    BUILDING<br />
                    <span className="text-brutal-blue">FREE & OPEN</span><br />
                    SOURCE<span className="text-brutal-pink">.</span>
                </motion.h1>
            </div>

            {/** Social Links */}
            <motion.div
                initial={ { opacity: 0 } }
                animate={ { opacity: 1 } }
                transition={ { duration: 1, delay: 0.6 } }
                className="relative z-10 mt-8 lg:mt-12 flex flex-wrap gap-3 md:gap-4"
            >
                <Button
                    as="a"
                    href="https://github.com/komed3"
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="bg-brutal-yellow"
                    className="flex items-center gap-2 text-sm md:text-base"
                ><SiGithub size={20} /> GITHUB</Button>
                <Button
                    as="a"
                    href="https://x.com/komed3dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="bg-brutal-blue"
                    className="text-white flex items-center gap-2 text-sm md:text-base"
                ><SiX size={20} /> TWITTER</Button>
                <Button
                    as="a"
                    href="https://ko-fi.com/komed3"
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="bg-brutal-pink"
                    className="text-white flex items-center gap-2 text-sm md:text-base"
                ><Coffee size={20} /> KO-FI</Button>
            </motion.div>
        </div>

        {/* Right Side: Bio & Stats */}
        <div className="relative z-10 w-full lg:w-[40%] bg-brutal-green p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 lg:gap-12 text-white">
            <motion.div
                initial={ { x: 100, opacity: 0 } }
                animate={ { x: 0, opacity: 1 } }
                transition={ { duration: 0.8, delay: 0.4 } }
                className="space-y-6 lg:space-y-8"
            >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-black leading-none">
                    <Terminal size={80} /> WHO AM I
                </h2>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-tight text-black/90">
                    A freelance software developer specializing in high-performance systems and modern web architectures,
                    committed to open source projects and overall enthusiast of electronics since 2010.
                </p>
                <div className="space-y-3 lg:space-y-4">
                    <div className="flex justify-between border-b-2 lg:border-b-4 border-black pb-2 text-sm lg:text-base">
                        <span className="font-black">EXPERIENCE</span>
                        <span className="font-black">15+ YEARS</span>
                    </div>
                    <div className="flex justify-between border-b-2 lg:border-b-4 border-black pb-2 text-sm lg:text-base">
                        <span className="font-black">FOCUS</span>
                        <span className="font-black">OPEN SOURCE</span>
                    </div>
                    <div className="flex justify-between border-b-2 lg:border-b-4 border-black pb-2 text-sm lg:text-base">
                        <span className="font-black">LOCATION</span>
                        <span className="font-black">GERMANY</span>
                    </div>
                </div>
            </motion.div>

            <Button
                onClick={ () => document.getElementById( 'projects' )?.scrollIntoView( { behavior: 'smooth' } ) }
                bg="bg-white"
                className="self-start text-black flex items-center gap-3 lg:gap-4 py-3 lg:py-5 px-5 lg:px-8 text-lg lg:text-xl xl:text-2xl font-black"
            >VIEW WORK <ArrowDown size={20} className="lg:w-8 lg:h-8" /></Button>
        </div>
    </section> );
}
