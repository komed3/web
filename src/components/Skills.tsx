import * as Icons from 'lucide-react';

import skills from '../data/skills.json';
import { Button } from './ui/Button';


export function Skills () {
    return ( <section id="skills" className="space-y-12 w-full bg-white p-6 md:p-12 lg:p-20 border-t-4 border-black scroll-mt-20">
        <div className="space-y-4 w-full md:w-auto">
            <h2 className="text-5xl md:text-7xl font-display font-black">SKILLSET</h2>
            <p className="text-xl md:text-2xl font-bold max-w-3xl leading-relaxed">
                A technical ecosystem engineered for <span className="underline decoration-brutal-pink decoration-8">performance</span>, 
                resilience, and modern architectural standards.
            </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 brutal-border brutal-shadow-sm bg-black gap-1">
            { skills.map( ( skill ) => {
                const isLightBg = skill.color === 'brutal-yellow';
                const IconComponent = ( Icons as any )[ skill.icon ] || Icons.Code2;
                
                return ( <div className={ `p-6 md:p-10 flex flex-col items-center justify-center text-center gap-6 bg-white aspect-square relative group` } key={skill.skill}>
                    <div className={ `p-4 brutal-border brutal-shadow-sm ${ isLightBg ? 'bg-brutal-yellow text-black' : 'bg-brutal-green text-white' }` }>
                        <IconComponent size={32} strokeWidth={3} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono font-bold opacity-40 uppercase tracking-widest">Tech Stack</span>
                        <span className="text-sm md:text-xl font-display font-black uppercase tracking-tight leading-none">
                            {skill.skill}
                        </span>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-black opacity-10" />
                </div> );
            } ) }
        </div>

        {/** Get In Touch */}
        <div className="brutal-border bg-brutal-yellow brutal-shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-display font-black">READY TO BUILD?</h3>
                <p className="text-lg font-medium opacity-80">
                    Open for collaborations, freelance projects, and technical consulting.<br />
                    Reach out via GitHub or Mail.
                </p>
            </div>
            <Button
                as="a" href="mailto:webmaster@komed3.de" bg="bg-white"
                className="text-black text-xl w-full md:w-auto text-center"
            >GET IN TOUCH</Button>
      </div>
    </section> );
}
