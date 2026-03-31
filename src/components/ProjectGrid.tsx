import { cn } from '../lib/utils';
import { getSkills } from '../services/github';
import { SectionHeading } from './SectionHeading';

export function ProjectGrid () {
    const languages = getSkills();

    return ( <> <section className="space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <SectionHeading title="Projects_" />
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
        </div>
      </section> </> );
}
