import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import projects from '../data/projects.json';
import { Button } from './ui/Button';


export function ProjectGrid () {
    const [ filter, setFilter ] = useState( 'All' );
    const [ search, setSearch ] = useState( '' );
    const [ visibleCount, setVisibleCount ] = useState( 6 );

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

    return ( <section id="projects" className="w-full min-h-screen bg-white p-6 md:p-12 flex flex-col gap-12 border-t-4 border-black scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4 w-full md:w-auto">
                <h2 className="text-5xl md:text-7xl font-display font-black">PROJECTS</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => ( <Button
                        key={cat}
                        onClick={ () => setFilter( cat ) }
                        bg={ filter === cat ? 'bg-brutal-blue text-white' : 'bg-white' }
                        className="py-1 px-4 text-sm"
                    >{cat}</Button> ) ) }
                </div>
            </div>

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
    </section> );
}
