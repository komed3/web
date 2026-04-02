import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}


export function MarkdownRenderer( { content, className = '' }: MarkdownRendererProps ) {
    return ( <div className={ `markdown-body max-w-none ${className}` }>
        <ReactMarkdown
            remarkPlugins={ [ remarkGfm ] }
            components={ {
                code( { node, inline, className, children, ...props }: any ) {
                    const match = /language-(\w+)/.exec( className || '' );
                    return ! inline && match ? ( <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={ match[ 1 ] }
                        PreTag="div"
                        customStyle={ {
                            margin: 0,
                            padding: 0,
                            fontSize: 'inherit'
                        } }
                        { ...props }
                    >
                        { String( children ).replace( /\n$/, '' ) }
                    </SyntaxHighlighter> ) : ( <code className={className} { ...props }>
                        {children}
                    </code> );
                },
                table( { children } ) {
                    return ( <div className="markdown-table-wrapper">
                        <table>{children}</table>
                    </div> );
                }
            } }
        >
            {content || 'No content available.' }
        </ReactMarkdown>
    </div> );
}
