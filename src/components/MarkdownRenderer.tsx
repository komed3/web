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
                            background: 'transparent',
                            padding: '0',
                            margin: '0',
                            border: 'none'
                        } }
                        codeTagProps={ {
                            style: {
                                background: 'transparent',
                                padding: '0'
                            }
                        } }
                        { ...props }
                    >
                        { String( children ).replace( /\n$/, '' ) }
                    </SyntaxHighlighter> ) : ( <code className={className} { ...props }>
                        {children}
                    </code> );
                }
            } }
        >
            {content}
        </ReactMarkdown>
    </div> );
}
