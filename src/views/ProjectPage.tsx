import { SiGithub } from '@icons-pack/react-simple-icons';
import { ArrowLeft, LinkIcon, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';

import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import projects from '../data/projects.json';
import { useSEO } from '../effects/SEO';


export function ProjectPage () {
    const { id } = useParams();
    const project = projects.find( p => p.id === id );

    if ( ! project ) return ( <div className="min-h-screen flex flex-col items-center justify-center p-12">
        <h1 className="text-6xl font-display font-black mb-8">
            <span className="text-brutal-pink">404</span> PROJECT NOT FOUND
        </h1>
        <Link to="/" className="brutal-btn bg-brutal-yellow">BACK TO HOME</Link>
    </div> );

    useSEO( { title: project.title, description: project.description || `Project ${project.title} by komed3` } );
    const isLightBg = project.color === 'brutal-yellow';

    return ( <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        className="min-h-screen bg-white pt-24 pb-12 px-6 md:px-12"
    >
        <div className="max-w-7xl mx-auto space-y-12">

            {/** Back To Home */}
            <Button
                as={Link} to="/" bg="bg-white"
                className="hover:bg-brutal-blue hover:text-white inline-flex items-center gap-2 mb-8"
            ><ArrowLeft size={20} /> BACK</Button>

            {/** Info Card */}
            <div
                className={ `brutal-border p-6 md:p-12 brutal-shadow flex flex-col gap-8 ${ isLightBg ? 'text-black' : 'text-white' }` }
                style={ { backgroundColor: `var(--color-${project.color})` } }
            >
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant={ isLightBg ? 'dark' : 'light' } size="sm">{project.type}</Badge>
                            { ( project.meta.stars ?? 0 ) > 0 && ( <Badge variant={ isLightBg ? 'light' : 'dark' } size="sm">
                                <Star size={14} fill="currentColor" /> {project.meta.stars} STARS
                            </Badge> ) }
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black leading-none uppercase">
                            {project.title}
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        { project.github && ( <Button
                            as="a" href={ `https://github.com/${project.github}` } target="_blank" rel="noopener noreferrer"
                            bg="bg-white" className="p-3 text-black"
                        ><SiGithub size={24} /></Button> ) }
                        { project.link && ( <Button
                            as="a" href={project.link} target="_blank" rel="noopener noreferrer"
                            bg="bg-white" className="p-3 text-black"
                        ><LinkIcon size={24} /></Button> ) }
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 max-w-[640px]">
                    { ( project.tags ?? [] ).map( tag => (
                        <Badge key={tag} variant={ isLightBg ? 'light' : 'dark' } size="sm">{tag}</Badge>
                    ) ) }
                </div>
            </div>

            {/** Project Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="brutal-border p-8 md:p-12 bg-white brutal-shadow-sm">
                        <MarkdownRenderer content={ project.content || '' } />
                    </div>
                </div>

                <div className="space-y-8">
                    { Object.keys( project.meta ).length > 0 && ( <div className="brutal-border p-8 bg-brutal-yellow brutal-shadow-sm space-y-4">
                        <h3 className="text-2xl font-display font-black text-black">PROJECT INFO</h3>
                        <div className="space-y-2 font-bold text-black">
                            { project.meta.version && ( <p className="flex justify-between border-b-2 border-black/10 pb-2">
                                <span>VERSION:</span>
                                <span>{ project.meta.version }</span>
                            </p> ) }
                            { project.meta.license && ( <p className="flex justify-between border-b-2 border-black/10 pb-2">
                                <span>LICENSE:</span>
                                <span>{ project.meta.license }</span>
                            </p> ) }
                            { ( project.meta as any ).repos && ( <p className="flex justify-between border-b-2 border-black/10 pb-2">
                                <span>REPOS:</span>
                                <span>{ ( project.meta as any ).repos }</span>
                            </p> ) }
                            { ( project.meta.langs ?? [] ).length > 0 && ( <p className="flex justify-between border-b-2 border-black/10 pb-2">
                                <span>LANGUAGE:</span>
                                <span>{ project.meta.langs?.[ 0 ] }</span>
                            </p> ) }
                            { project.meta.year && ( <p className="flex justify-between border-b-2 border-black/10 pb-2">
                                <span>YEAR:</span>
                                <span>{ project.meta.year }</span>
                            </p> ) }
                        </div>
                    </div> ) }

                    { project.github && ( <div className="brutal-border p-8 bg-brutal-blue brutal-shadow-sm space-y-4">
                        <h3 className="text-2xl font-display font-black text-white">CONTRIBUTE</h3>
                        <p className="font-bold text-white">
                            Interested in this project? Check out the GitHub repository and feel free to open a PR.
                        </p>
                        <Button
                            as="a" href={ `https://github.com/${project.github}` } target="_blank" rel="noopener noreferrer" hoverDark
                            bg="bg-white" className="hover:bg-brutal-pink w-full text-center inline-block text-black"
                        >VIEW PROJECT</Button>
                    </div> ) }
                </div>
            </div>
        </div>
    </motion.div> );
}
