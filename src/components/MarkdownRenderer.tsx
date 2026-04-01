import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface MarkdownRendererProps {
    content: string;
    className?: string;
}


export function MarkdownRenderer( { content, className = '' }: MarkdownRendererProps ) {}
