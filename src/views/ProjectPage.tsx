import { SiGithub } from '@icons-pack/react-simple-icons';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { getReadme } from '../services/github';

export function ProjectPage () {
    const { repoName } = useParams< { repoName: string } >();
    const { pathname } = useLocation();

    // Memoize readme content to prevent recalculation
    const readme = useMemo( () => ( repoName ? getReadme( repoName ) : '' ), [ repoName ] );

    return ( <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="brutal-btn inline-flex items-center gap-2 mb-12 bg-brutal-white">
            <ArrowLeft size={20} /> BACK_TO_HOME
        </Link>

        <motion.div
            key={pathname}
            initial={ { y: 20, opacity: 0 } }
            animate={ { y: 0, opacity: 1 } }
            className="bg-brutal-white brutal-border p-8 md:p-12"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 border-b-4 border-brutal-black pb-8">
                <h1 className="text-4xl md:text-7xl uppercase font-extrabold tracking-tighter">{repoName}</h1>
                <a
                    href={ `https://github.com/komed3/${repoName}` }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn bg-brutal-blue text-brutal-white flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
                >
                    View on GitHub <SiGithub size={20} />
                </a>
            </div>

            <div className="markdown-body">
                <ReactMarkdown
                    remarkPlugins={ [ remarkGfm ] }
                    components={ {
                        code( { node, inline, className, children, ...props }: any ) {
                            const match = /language-(\w+)/.exec( className || '' );

                            return ! inline && match ? ( <SyntaxHighlighter
                                style={ vscDarkPlus as any }
                                language={ match[ 1 ] }
                                PreTag="div"
                                customStyle={ { 
                                    margin: 0, 
                                    padding: 0, 
                                    background: 'transparent',
                                    fontSize: 'inherit'
                                } }
                                { ...props }
                            >
                                { String( children ).replace( /\n$/, '' ) }
                            </SyntaxHighlighter> ) : (
                                <code className={className} { ...props }>
                                    {children}
                                </code>
                            );
                        }
                    } }
                >
                    {readme}
                </ReactMarkdown>
            </div>
        </motion.div>
    </div> );
}
