import { useState } from 'react';

import { cn } from '../lib/utils';
import { getRepos, getSkills } from '../services/github';
import { SectionHeading } from './SectionHeading';
import { RepoCard } from './RepoCard';

export function ProjectGrid () {
    const repos = getRepos();
    const languages = getSkills();

    const [ filter, setFilter ] = useState< string | null >( null );
    const [ visibleCount, setVisibleCount ] = useState( 6 );

    const filteredRepos = filter
        ? repos.filter( repo => repo.language === filter )
        : repos;

    const visibleRepos = filteredRepos.slice( 0, visibleCount );
    const hasMore = visibleCount < filteredRepos.length;
    const handleLoadMore = () => setVisibleCount( prev => prev + 6 );

    return ( <> <section className="space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <SectionHeading title="Projects_" />

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
                <button 
                    onClick={ () => {
                        setFilter( null );
                        setVisibleCount( 6 );
                    } }
                    className={ cn(
                        "px-3 py-1 text-xs font-bold uppercase brutal-border-sm transition-colors", 
                        ! filter ? "bg-brutal-blue text-brutal-white" : "bg-brutal-white hover:bg-brutal-yellow"
                    ) }
                >
                    All
                </button>
                { languages.map( lang => (
                    <button 
                        key={lang}
                        onClick={ () => {
                            setFilter( lang );
                            setVisibleCount( 6 );
                        } }
                        className={ cn(
                            "px-3 py-1 text-xs font-bold uppercase brutal-border-sm transition-colors", 
                            filter === lang ? "bg-brutal-blue text-brutal-white" : "bg-brutal-white hover:bg-brutal-yellow"
                        ) }
                    >
                        {lang}
                    </button>
                ) ) }
            </div>

            {/* Repository Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                { visibleRepos.map( ( repo, i ) => (
                    <RepoCard key={repo.name} repo={repo} index={i} />
                ) ) }
            </div>

            {/* Load More */}
            { hasMore && ( <div className="flex justify-center pt-12">
                <button
                    onClick={handleLoadMore}
                    className="brutal-btn bg-brutal-blue text-brutal-white text-lg px-12 py-4 hover:bg-brutal-pink transition-colors"
                >
                    LOAD_MORE_PROJECTS
                </button>
            </div> ) }
        </div>
    </section> </> );
}
