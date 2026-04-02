import { SiGimp, SiGithub, SiInkscape, SiKrita, SiUbuntu } from '@icons-pack/react-simple-icons';
import { Code2, Cpu, Gpu, HardDrive, Laptop, LaptopMinimal, Monitor, Server } from 'lucide-react';

import { Background } from '../effects/Background';


export function Setup () {
    return ( <section id="setup" className="relative w-full bg-white p-6 md:p-12 lg:p-20 border-t-4 border-black overflow-hidden scroll-mt-20">
        <Background />

        <div className="relative z-10 space-y-12">
            <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-black">
                    SETUP & <span className="text-brutal-blue">GEAR</span><span className="text-brutal-pink pl-0.5">.</span>
                </h2>
                <p className="text-xl md:text-2xl font-bold max-w-3xl leading-relaxed">
                    Use Open Source — Make Open Source. A collection of hardware and software that powers my daily workflows.
                </p>
            </div>
        </div>
    </section> );
}
