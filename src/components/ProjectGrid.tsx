import { SiGithub } from '@icons-pack/react-simple-icons';
import { LinkIcon, Search, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import projects from '../data/projects.json';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';


export function ProjectGrid () {
    const [ filter, setFilter ] = useState( 'All' );
    const [ search, setSearch ] = useState( '' );
    const [ visibleCount, setVisibleCount ] = useState( 9 );

    const categories = useMemo( () => {
        const cats = new Set( projects.map( p => p.type ) );
        return [ 'All', ...Array.from( cats ) ];
    }, [] );

    const filteredProjects = useMemo( () => {
        return projects.filter( p => {
            const matchesFilter = filter === 'All' || p.type === filter;
            const matchesSearch =
                p.title.toLowerCase().includes( search.toLowerCase() ) ||
                p.tags.some( t => t.toLowerCase().includes( search.toLowerCase() ) );

            return matchesFilter && matchesSearch;
        } );
    }, [ filter, search ] );

    const visibleProjects = filteredProjects.slice( 0, visibleCount );

    return ( <section id="projects" className="w-full min-h-screen bg-white p-6 md:p-12 lg:p-20 flex flex-col gap-12 border-t-4 border-black scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4 w-full md:w-auto">
                <h2 className="text-5xl md:text-7xl font-display font-black">
                    PROJECTS<span className="text-brutal-pink pl-1">.</span>
                </h2>
                <div className="flex flex-wrap gap-2 max-w-5xl">
                    {categories.map(cat => ( <Button
                        key={cat} onClick={ () => setFilter( cat ) } className="py-1 px-4 text-sm"
                        bg={ filter === cat ? 'bg-brutal-blue text-white' : 'bg-white' }
                    >{cat}</Button> ) ) }
                </div>
            </div>

            {/** Search Projects */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
                <input
                    type="text"
                    placeholder="SEARCH PROJECTS OR SKILLS ..."
                    value={search}
                    onChange={ ( e ) => setSearch( e.target.value ) }
                    className="w-full brutal-border p-4 pl-12 font-bold focus:bg-brutal-yellow outline-none transition-colors"
                />
            </div>
        </div>

        {/** Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="sync">
                { visibleProjects.map( ( project, index ) => {
                    const isLightBg = project.color === 'brutal-yellow';
                    return ( <motion.div
                        layout
                        key={project.id}
                        initial={ { opacity: 0, scale: 0.9 } }
                        animate={ { opacity: 1, scale: 1 } }
                        exit={ { opacity: 0, scale: 0.9 } }
                        transition={ { duration: 0.4, delay: index * 0.05 } }
                        className={ `brutal-card brutal-shadow-sm hover:brutal-shadow flex flex-col gap-4 group relative h-full ${ isLightBg ? 'text-black' : 'text-white' }` }
                        style={ { backgroundColor: `var(--color-${project.color})` } }
                    >
                        <Link to={ `/project/${project.id}` } className="absolute inset-0 z-10" />

                        <div className="flex justify-between items-start relative z-20 pointer-events-none">
                            <Badge variant={ isLightBg ? 'dark' : 'light' } size="xs">{project.type}</Badge>
                            { ( project.meta.stars ?? 0 ) > 0 && ( <Badge variant={ isLightBg ? 'dark' : 'light' } size="xs">
                                <Star size={14} fill="currentColor" />
                                <span className="font-black">{project.meta.stars}</span>
                            </Badge> ) }
                        </div>

                        <h3 className="text-2xl md:text-3xl font-display font-black leading-tight group-hover:underline relative z-20 pointer-events-none">
                            {project.title}
                        </h3>

                        <p className={ `text-sm md:text-base font-medium relative z-20 pointer-events-none ${ isLightBg ? 'text-black/80' : 'text-white/90' }` }>
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2 relative z-20 pointer-events-none">
                            { ( project.tags ?? [] ).map( tag => (
                                <Badge key={tag} variant={ isLightBg ? 'light' : 'dark' } size="xs">{tag}</Badge>
                            ) ) }
                        </div>

                        <div className={ `flex gap-4 mt-auto pt-4 border-t-2 relative z-30 ${ isLightBg ? 'border-black/20' : 'border-white/20' }` }>
                            { project.link && ( <a
                                className="flex items-center gap-1 font-black text-sm hover:translate-x-1 transition-transform"
                                href={project.link} target="_blank" rel="noopener noreferrer"
                            >LIVE <LinkIcon size={14} /></a> ) }
                            { project.github && ( <a
                                className="flex items-center gap-1 font-black text-sm hover:translate-x-1 transition-transform"
                                href={ `https://github.com/${project.github}` } target="_blank" rel="noopener noreferrer"
                            >CODE <SiGithub size={14} /></a> ) }
                        </div>
                    </motion.div> );
                } ) }
            </AnimatePresence>
        </div>

        {/** Load More */}
        { visibleCount < filteredProjects.length && ( <div className="flex justify-center mt-12">
            <Button
                onClick={ () => setVisibleCount( prev => prev + 6 ) }
                bg="bg-brutal-pink" hoverDark className="text-xl text-white"
            >LOAD MORE PROJECTS</Button>
        </div> ) }
    </section> );
}
