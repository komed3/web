import { ArrowUpLeft } from 'lucide-react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router';
import remarkGfm from 'remark-gfm';

import projects from '../../data/projects.json';


export function Project () {
  const navigate = useNavigate();

  const { id } = useParams();
  const index = projects.findIndex( p => p.id === id );
  const project = projects[ index ];

  useEffect(
    () => { if ( ! project ) navigate( '/index', { replace: true } ) },
    [ project, navigate ]
  );

  return project && (
    <div className= 'grid grid-cols-[1fr_1px_3fr] gap-16 px-6 sm:px-12 pb-24'>
      { /** Aside */ }
      <div className= 'flex flex-col items-end pt-36'>
        { /** Back to Projects */ }
        <Link
          to= '/index'
          className= {
            'inline-flex flex-col items-end text-2xl uppercase ' +
            'font-extralight tracking-wider'
          }
        >
          <ArrowUpLeft
            size= { 64 }
            strokeWidth= { 0.5 }
            className= '-mr-4'
          />

          <span>Go back to</span>
          <span>Projects</span>
        </Link>
      </div>

      <div className= 'bg-(--main)' />

      { /** Main */ }
      <div className= 'space-y-36'>
        { /** Header */ }
        <div className= 'flex flex-col justify-end gap-8 h-screen pt-40 pb-16'>
          { /** Title */ }
          <h1 className= '-ml-3 max-w-4xl text-[clamp(4rem,8vw,8rem)] font-extralight leading-none tracking-tighter'>
            { project.title }
          </h1>

          { /** Description */ }
          { project.desc && (
            <p className= 'max-w-3xl text-2xl font-light leading-relaxed'>
              { project.desc }
            </p>
          ) }
        </div>

        { /** Content */ }
        { project.content && (
          <div className= 'markdown-body'>
             <ReactMarkdown remarkPlugins= { [ remarkGfm ] }>
              { project.content }
            </ReactMarkdown>
          </div>
        ) }
      </div>
    </div>
  );
}
