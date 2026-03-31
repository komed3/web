import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

import { type Repo } from '../services/github';


export interface RepoCardProps {
    repo: Repo;
    index: number;
}

export function RepoCard ( { repo, index }: RepoCardProps ) {
    return ( <motion.div
        initial={ { scale: 0.9, opacity: 0 } }
        animate={ { scale: 1, opacity: 1 } }
        transition={ { delay: ( index % 6 ) * 0.1 } }
    >
        <Link 
            to={ `/project/${repo.name}` }
            className="group flex flex-col h-full bg-brutal-white brutal-border-sm p-4 md:p-6 hover:bg-brutal-yellow transition-colors relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-3 md:mb-4 gap-2">
                <h3 className="text-xl md:text-2xl uppercase font-extrabold tracking-tighter group-hover:underline">{repo.name}</h3>
                <div className="flex items-center gap-1 font-mono text-xs bg-brutal-black text-brutal-white px-2 py-1 whitespace-nowrap shrink-0">
                    ★ {repo.stars}
                </div>
            </div>
            <p className="font-mono text-xs md:text-sm line-clamp-3 mb-6 md:mb-8 flex-grow">
                {repo.description}
            </p>
            <div className="flex items-center gap-2 mt-auto">
                { repo.language && (
                    <span className="text-[10px] uppercase font-bold bg-brutal-blue text-brutal-white px-2 py-0.5 brutal-border-sm shadow-none">
                    {repo.language}
                    </span>
                ) }
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} className="md:w-6 md:h-6" />
            </div>
        </Link>
    </motion.div> );
}
