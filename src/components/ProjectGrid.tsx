import { Search } from 'lucide-react';


export function ProjectGrid () {
    return ( <section id="projects" className="w-full min-h-screen bg-white p-6 md:p-12 flex flex-col gap-12 border-t-4 border-black scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4 w-full md:w-auto">
                <h2 className="text-5xl md:text-7xl font-display font-black">PROJECTS</h2>
                <div className="flex flex-wrap gap-2"></div>
            </div>

            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
                <input
                    type="text"
                    placeholder="SEARCH PROJECTS OR SKILLS ..."
                    className="w-full brutal-border p-4 pl-12 font-bold focus:bg-brutal-yellow outline-none transition-colors"
                />
            </div>
        </div>
    </section> );
}
