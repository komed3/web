import { ArrowUpLeft } from 'lucide-react';
import { motion } from 'motion/react';
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
      <div className= 'flex flex-col items-end gap-12 pt-36'>
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

        { /** Meta */ }
        <div className= 'space-y-4 text-right uppercase'>
          { [
            [ 'Version', project.meta?.version ],
            [ 'License', project.meta?.license ],
            [ 'Status', project.status ],
            [ 'Language', project.meta?.langs?.join( ', ' ) ],
            [ 'Year', project.meta?.year ]
          ].map( ( [ label, value ], i ) => value && (
            <motion.div
              key= { label }
              initial= { { y: 50, opacity: 0 } }
              whileInView= { { y: 0, opacity: 1 } }
              transition= { { delay: i * 0.05 } }
              viewport= { { once: true, amount: 0.3 } }
              className= 'flex flex-col'
            >
              <span className= 'text-sm font-extralight tracking-widest'>{ label }</span>
              <b className= 'text-lg font-medium'>{ value }</b>
            </motion.div>
          ) ) }
        </div>
      </div>

      { /** Divider */ }
      <div className= 'bg-(--main)' />

      { /** Main */ }
      <div className= 'space-y-36'>
        { /** Hero */ }
        <motion.div
          initial= { { y: 100, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
          viewport= { { once: true, amount: 0.3 } }
          className= 'flex flex-col justify-end gap-8 h-screen pt-40 pb-16'
        >
          { /** Type */ }
          <div className= 'mb-4 text-2xl font-light uppercase tracking-[0.3em]'>
            { project.type }
          </div>

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
        </motion.div>

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
