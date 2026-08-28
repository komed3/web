import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router';
import remarkGfm from 'remark-gfm';

import projects from '../data/projects.json';


export function Project () {
  const navigate = useNavigate();

  const { id } = useParams();
  const index = projects.findIndex( p => p.id === id );
  const project = projects[ index ];

  const prev = projects[ index - 1 ];
  const next = projects[ index + 1 ];

  useEffect(
    () => { if ( index < 0 || ! project ) navigate( '/index', { replace: true } ) },
    [ id, projects, navigate ]
  );

  return project && (
    <>
      { /** Header */ }
      <div className= 'grid grid-cols-[32rem_1px_1fr] gap-12 h-screen p-12 pt-36'>
        { /** Aside */ }
        <div className= 'flex flex-col gap-8'>
          { /** Navigation */ }
          <div className= 'grid grid-cols-2 gap-12 w-full text-2xl uppercase font-extralight tracking-[0.3em]'>
            <div>
              { prev && (
                <Link
                  className= 'flex flex-col gap-3'
                  to= { `/project/${ prev.id }` }
                >
                  <ArrowUpLeft
                    className= '-ml-5'
                    size= { 80 }
                    strokeWidth= { 0.3 }
                  />

                  <span>{ prev.title }</span>
                </Link>
              ) }
            </div>

            <div>
              { next && (
                <Link
                  className= 'flex flex-col items-end gap-3 text-right'
                  to= { `/project/${ next.id }` }
                >
                  <ArrowUpRight
                    className= '-mr-3.5'
                    size= { 80 }
                    strokeWidth= { 0.3 }
                  />

                  <span>{ next.title }</span>
                </Link>
              ) }
            </div>
          </div>
        </div>

        { /** Divider */ }
        <div className= 'bg-(--main)' />

        { /** Info */ }
        <div className= 'flex flex-col justify-end gap-8'>
          { /** Type */ }
          <div className= 'uppercase text-3xl font-extralight tracking-[0.2em]'>
            { project.type }
          </div>

          { /** Title */ }
          <div className= '-ml-2 text-[clamp(4rem,8vw,8rem)] font-extralight leading-none tracking-tighter'>
            { project.title }
          </div>

          { /** Description */ }
          { project.desc && (
            <p className= 'max-w-5xl text-3xl font-light leading-snug'>
              { project.desc }
            </p>
          ) }
        </div>
      </div>

      { /** Content */ }
      <div className= 'grid grid-cols-[32rem_1fr] gap-12 my-12 p-12'>
        { /** Aside */ }
        <div className= 'py-12 space-y-16'>
          { /** Project Info */ }
          <div className= 'space-y-6 text-right'>
            <div className= 'mb-6 text-4xl uppercase font-light tracking-tighter'>
              Project Info
            </div>

            { [
              [ 'Version', project.meta?.version ],
              [ 'Status', project.status ],
              [ 'License', project.meta?.license ],
              [ 'Repos', project.meta?.repos ],
              [ 'Language', project.meta?.langs ],
              [ 'Year', project.meta?.year ],
              [ 'Tags', project.tags ]
            ].map( ( [ label, value ], i ) => value && ( ! Array.isArray( value ) || value.length > 0 ) && (
              <div key= { i }>
                <div className= 'text-[11px] uppercase tracking-[0.3em]'>
                  { label }
                </div>

                <div className= 'text-xl capitalize font-light'>
                  { Array.isArray( value ) ? value.map( ( item, j ) => (
                    <div key= { j }>{ item }</div>
                  ) ) : value }
                </div>
              </div>
            ) ) }
            </div>
        </div>

        { /** Content */ }
        <div className= 'min-w-0 p-12 bg-(--contrast) markdown-body'>
          <ReactMarkdown remarkPlugins= { [ remarkGfm ] }>
            { project.content }
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
