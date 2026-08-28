import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
    <AnimatePresence mode= 'wait'>
      { /** Header */ }
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= 'flex flex-col w-full h-screen p-12 pt-36'
      >
        { /** Navigation */ }
        <div className= 'flex justify-end items-center gap-4 uppercase text-md font-light tracking-widest'>
          { prev && (
            <Link
              className= 'inline-flex items-center gap-3 px-4 py-1'
              to= { `/project/${ prev.id }` }
            >
              <ArrowLeft size= { 32 } strokeWidth= { 0.8 } />
              <span>{ prev.title }</span>
            </Link>
          ) }

          { prev && next && (
            <div className= 'w-14 h-px bg-(--main)' />
          ) }

          { next && (
            <Link
              className= 'inline-flex items-center gap-3 px-4 py-1'
              to= { `/project/${ next.id }` }
            >
              <span>{ next.title }</span>
              <ArrowRight size= { 32 } strokeWidth= { 0.8 } />
            </Link>
          ) }
        </div>

        <div className= 'flex-1' />

        { /** Title */ }
        <div className= '-ml-3 text-[clamp(5rem,10vw,10rem)] font-extralight leading-none tracking-tighter'>
          { project.title }
        </div>

        { /** Description */ }
        { project.desc && (
          <p className= 'mt-12 max-w-5xl text-3xl font-light leading-snug'>
            { project.desc }
          </p>
        ) }
      </motion.div>

      { /** Content */ }
      <div className= 'flex gap-32 px-12 py-16'>
        { /** Readme */ }
        <motion.div
          initial= { { y: 40, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
          className= 'flex-1 min-w-0 p-12 bg-(--contrast) markdown-body'
        >
          <ReactMarkdown remarkPlugins= { [ remarkGfm ] }>
            { project.content }
          </ReactMarkdown>
        </motion.div>

        { /** Sidebar */ }
        <div className= 'shrink-0 w-120'></div>
      </div>
    </AnimatePresence>
  );
}
