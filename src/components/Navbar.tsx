import { Link } from 'react-router-dom';
import { SocialLinks } from './SocialLinks';


export function Navbar () {
    return ( <nav className="sticky top-0 z-50 bg-brutal-white border-b-4 border-brutal-black p-3 md:p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter hover:bg-brutal-yellow transition-colors px-2 shrink-0 flex items-center gap-1">
                KOMED3<span className="text-brutal-pink">.</span>DEV
            </Link>

            <div className="w-full sm:w-auto flex justify-center sm:justify-end overflow-x-auto no-scrollbar py-1">
                <SocialLinks className="flex-wrap justify-center sm:justify-end sm:flex-nowrap" iconSize={16} />
            </div>
        </div>
    </nav> );
}
