import { motion } from 'motion/react';


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
                    <span className="text-brutal-blue">OPEN</span><br />
                    SOURCE<span className="text-brutal-pink">.</span>
                </motion.h1>
            </div>
        </div>
    </section> );
}
