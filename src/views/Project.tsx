import { ArrowUpLeft, Star } from 'lucide-react';
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
      <div>
        <div className= 'flex flex-col justify-between items-end gap-24 min-h-screen pt-36 pb-16'>
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
              [ 'Year', project.meta?.year ],
              [ 'Tags', project.tags ]
            ].map( ( [ label, value ], i ) => value && (
              <motion.div
                key= { i }
                initial= { { y: 50, opacity: 0 } }
                whileInView= { { y: 0, opacity: 1 } }
                transition= { { delay: i * 0.05 } }
                viewport= { { once: true, amount: 0.3 } }
                className= 'flex flex-col'
              >
                <span className= 'text-sm font-extralight tracking-widest'>{ label }</span>
                <div className= 'flex flex-wrap justify-end gap-x-6 gap-y-2 font-medium'>
                  { ( Array.isArray( value ) ? value : [ value ] ).map( item => (
                    <span key= { item }>{ item }</span>
                  ) ) }
                </div>
              </motion.div>
            ) ) }
          </div>
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
          { /** GitHub */ }
          { project.github && (
            <div className= 'flex-1'>
              <div className= 'flex justify-end items-center gap-8'>
                { /** Stars */ }
                { project.meta?.stars > 0 && (
                  <div className= 'flex items-center gap-4 text-lg font-light'>
                    <Star size= { 20 } />
                    <span>{ project.meta.stars.toLocaleString() }</span>
                  </div>
                ) }

                { /** Link */ }
                <a
                  href= { `https://github.com/${ project.github }` }
                  target= '_blank'
                  rel= 'noreferrer'
                  className= {
                    'inline-block px-8 text-lg font-light uppercase leading-16 ' +
                    'tracking-[0.2em] text-(--contrast) bg-(--main)'
                  }
                >
                  GitHub
                </a>
              </div>
            </div>
          ) }

          { /** Type */ }
          <div className= 'mb-2 text-2xl font-light uppercase tracking-[0.3em]'>
            { project.type }
          </div>

          { /** Title */ }
          <h1 className= '-ml-3 max-w-4xl text-[clamp(4rem,8vw,8rem)] font-extralight leading-none tracking-tighter'>
            { project.title }
          </h1>

          { /** Info */ }
          <div className= 'flex justify-between items-end gap-24 mt-16'>
            <div>
              { /** Description */ }
              { project.desc && (
                <p className= 'max-w-2xl text-2xl font-light leading-relaxed'>
                  { project.desc }
                </p>
              ) }
            </div>

            <div>
              { /** Project Link */ }
              { project.link && (
                <a
                  href= { project.link }
                  target= '_blank'
                  rel= 'noreferrer'
                  className= {
                    'inline-block px-8 text-lg font-light uppercase leading-16 ' +
                    'tracking-[0.2em] text-(--contrast) bg-(--main)'
                  }
                >
                  Visit
                </a>
              ) }
            </div>
          </div>
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
