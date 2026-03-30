import { Code2 } from 'lucide-react';
import { motion } from 'motion/react';

import { SectionHeading } from './SectionHeading';
import { cn } from '../lib/utils';
import { getSkills } from '../services/github';


const COLORS = [
    'bg-brutal-orange text-brutal-black',
    'bg-brutal-blue text-brutal-white',
    'bg-brutal-pink text-brutal-white',
    'bg-brutal-yellow text-brutal-black',
    'bg-brutal-green text-brutal-black',
    'bg-cyan-400 text-brutal-black',
    'bg-zinc-800 text-brutal-white',
    'bg-red-500 text-brutal-white',
    'bg-purple-500 text-brutal-white',
    'bg-indigo-600 text-brutal-white'
];

export function Skillset () {
    const skills = getSkills();

    if ( ! skills ) return null;

    return ( <> <section className="space-y-6 md:space-y-8">
        <SectionHeading title="Skillset_" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            { skills.slice( 0, 6 ).map( ( skill, i ) => (
                <motion.div
                    key={skill}
                    initial={ { y: 20, opacity: 0 } }
                    animate={ { y: 0, opacity: 1 } }
                    transition={ { delay: i * 0.1 } }
                    className={ cn(
                        'p-4 md:p-6 brutal-border-sm flex flex-col items-center justify-center text-center gap-2 md:gap-4 hover:-translate-y-2 transition-transform',
                        COLORS[ i % 10 ]
                    ) }
                >
                    <Code2 size={24} className="md:w-8 md:h-8" />
                    <span className="font-bold uppercase tracking-tight text-xs md:text-sm">{skill}</span>
                </motion.div>
            ) ) }
        </div>
    </section> </> );
}
