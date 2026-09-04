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
    <div className= 'grid grid-cols-[1fr_1px_3fr] gap-20 px-6 sm:px-12 pt-36 pb-24'>
      <div>
        <Link
          className= 'inline-flex flex-col text-2xl uppercase font-extralight tracking-wider'
          to= '/index'
        >
          <ArrowUpLeft
            size= { 64 }
            strokeWidth= { 0.5 }
            className= '-ml-4'
          />

          <span>Go back to</span>
          <span>Projects</span>
        </Link>
      </div>

      <div className= 'bg-(--main)' />

      <div>
        { /** Header */ }
        <div>
          <h1>{ project.title }</h1>
          <p>{ project.desc }</p>
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
