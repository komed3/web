import skills from '../data/skills.json';
import { Button } from './ui/Button';


export function Skills () {
    return ( <section id="skills" className="w-full bg-white p-6 md:p-12 flex flex-col gap-12 border-t-4 border-black scroll-mt-20">
        <div className="flex flex-col gap-4">
            <h2 className="text-5xl md:text-7xl font-display font-black">SKILLSET</h2>
            <p className="text-xl font-bold max-w-2xl">
                A technical stack built on performance, reliability, and modern engineering principles.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            { skills.map( ( skill ) => {
                const isLightBg = skill.color === 'brutal-yellow';
                return ( <div
                    key={skill.skill}
                    className={ `brutal-border p-4 md:p-6 brutal-shadow-sm flex items-center justify-center text-center h-full min-h-[80px] ${ isLightBg ? 'text-black' : 'text-white' }` }
                    style={ { backgroundColor: `var(--color-${skill.color})` } }
                >
                    <span className="text-lg md:text-xl font-display font-black uppercase whitespace-nowrap">
                        {skill.skill}
                    </span>
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
