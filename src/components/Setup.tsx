import { SiGimp, SiGithub, SiInkscape, SiKrita, SiUbuntu } from '@icons-pack/react-simple-icons';
import { Code2, Cpu, Gpu, HardDrive, Laptop, LaptopMinimal, Monitor, Server } from 'lucide-react';


export function Setup () {
    return ( <section id="setup" className="relative w-full bg-white p-6 md:p-12 lg:p-20 border-t-4 border-black overflow-hidden scroll-mt-20">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-10">
            {/* Hardware Column */}
            <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-display font-black">HARDWARE RESOURCES</h3>
                <div className="space-y-4">
                    {/* Main PC */}
                    <div className="p-6 brutal-border brutal-shadow-sm bg-white flex gap-6 items-start">
                        <div className="p-3 bg-brutal-blue text-white brutal-border shrink-0">
                            <Monitor size={24} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-display font-black text-xl">MAIN WORKSTATION</h4>
                            <ul className="text-xs md:text-sm font-bold space-y-1 text-black">
                                <li className="flex items-center gap-2"><Cpu size={14} /> AMD Ryzen 9 5900XT (16C/32T)</li>
                                <li className="flex items-center gap-2"><HardDrive size={14} /> 64GB DDR4 3200 MT/s</li>
                                <li className="flex items-center gap-2"><Gpu size={14} /> RTX 3080 Strix 10GB OC</li>
                                <li className="flex items-center gap-2"><LaptopMinimal size={14} /> Windows 11 Home</li>
                            </ul>
                        </div>
                    </div>

                    {/* Server */}
                    <div className="p-6 brutal-border brutal-shadow-sm bg-white flex gap-6 items-start">
                        <div className="p-3 bg-brutal-green text-white brutal-border shrink-0">
                            <Server size={24} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-display font-black text-xl">HOME SERVER</h4>
                            <ul className="text-xs md:text-sm font-bold space-y-1 text-black">
                                <li className="flex items-center gap-2"><Cpu size={14} /> AMD Ryzen 5 4600G (6C/12T)</li>
                                <li className="flex items-center gap-2"><HardDrive size={14} /> 16GB DDR4</li>
                                <li className="flex items-center gap-2"><SiUbuntu size={14} /> Ubuntu Server 24.04 LTS</li>
                            </ul>
                        </div>
                    </div>

                    {/* Laptops */}
                    <div className="p-6 brutal-border brutal-shadow-sm bg-white flex gap-6 items-start">
                        <div className="p-3 bg-brutal-pink text-white brutal-border shrink-0">
                            <Laptop size={24} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-display font-black text-xl">MOBILE GEAR</h4>
                            <p className="text-xs md:text-sm font-bold text-black leading-relaxed">
                                Dual legacy laptops utilized for field testing, remote network management, and sandbox environments. Both running Ubuntu Linux.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> );
}
