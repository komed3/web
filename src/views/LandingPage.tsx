import { motion } from 'motion/react';

import { AsciiLogo } from '../components/AsciiLogo';
import { ProjectGrid } from '../components/ProjectGrid';
import { Skillset } from '../components/Skillset';


export function LandingPage () {
    return ( <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-16 md:space-y-24">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
                initial={ { x: -50, opacity: 0 } }
                animate={ { x: 0, opacity: 1 } }
                className="space-y-6 md:space-y-8"
            >
                <div className="inline-block bg-brutal-yellow brutal-border-sm px-4 py-1 font-mono font-bold text-xs md:text-sm">
                    LEAVE THE ROAD, TAKE THE TRAILS // PYTHAGORAS
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-brutal-black">
                    BUILDING <br />
                    <span className="text-brutal-blue">OPEN</span> <br />
                    SOURCE<span className="text-brutal-pink">.</span>
                </h1>
                <p className="text-lg md:text-xl font-medium max-w-xl leading-tight">
                    Hi, I’m komed3, a freelance software developer specializing in high-performance
                    systems and modern web architectures, committed to open source projects and overall
                    enthusiast of electronics since 2010.
                </p>
            </motion.div>

            <motion.div 
                initial={ { scale: 0.8, opacity: 0 } }
                animate={ { scale: 1, opacity: 1 } }
                className="relative hidden lg:block"
            >
                <div className="aspect-square bg-brutal-pink brutal-border flex items-center justify-center p-4 rotate-3">
                    <AsciiLogo />
                </div>
                <div className="absolute -top-4 -left-4 bg-brutal-green brutal-border-sm p-4 -rotate-6 font-mono font-bold">
                    0xDEADBEEF
                </div>
                <div className="absolute -bottom-4 -right-4 bg-brutal-yellow brutal-border-sm p-4 rotate-12 font-mono font-bold">
                    STABLE_RELEASE
                </div>
            </motion.div>
        </section>

        {/* Skillset */}
        <Skillset />

        {/* Projects Grid */}
        <ProjectGrid />
    </div> );
}
