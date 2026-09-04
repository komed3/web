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
    () => { if ( ! project ) navigate( '/404', { replace: true } ) },
    [ project, navigate ]
  );

  return project && (
    <div
      className= {
        'flex flex-col-reverse xl:grid grid-cols-[1fr_1px_3fr] gap-12 xl:gap-16 ' +
        'px-6 sm:px-12 sm:pb-24'
        }
      >
      { /** Aside */ }
      <div>
        <div
          className= {
            'flex flex-col justify-between items-end gap-24 min-h-0 xl:min-h-screen ' +
            'pt-0 xl:pt-36 pb-16'
          }
        >
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
          <div className= 'w-full space-y-4 text-left xl:text-right uppercase'>
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

                <div className= 'flex flex-wrap justify-start xl:justify-end gap-x-4 font-medium'>
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
      <div className= 'w-full h-px xl:h-auto bg-(--main)' />

      { /** Main */ }
      <div className= 'min-w-0 space-y-24 sm:space-y-36'>
        { /** Hero */ }
        <motion.div
          initial= { { y: 100, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
          viewport= { { once: true, amount: 0.3 } }
          className= 'flex flex-col justify-end gap-8 min-h-screen pt-28 xl:pt-40 pb-6 sm:pb-16'
        >
          { /** GitHub */ }
          { project.github && (
            <div className= 'flex-1'>
              <div className= 'flex justify-end items-center gap-6 sm:gap-8'>
                { /** Stars */ }
                { ( project.meta?.stars ?? 0 ) > 0 && (
                  <div className= 'hidden sm:flex items-center gap-4 text-lg font-light'>
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
                    'inline-block px-6 sm:px-8 text-base sm:text-lg font-light uppercase ' +
                    'leading-14 sm:leading-16 tracking-[0.2em] text-(--contrast) bg-(--main)'
                  }
                >
                  GitHub
                </a>
              </div>
            </div>
          ) }

          { /** Type */ }
          <div className= 'text-base sm:text-xl font-light uppercase tracking-[0.3em]'>
            { project.type }
          </div>

          { /** Title */ }
          <h1
            className= {
              '-ml-1 sm:-ml-3 max-w-4xl text-5xl sm:text-[clamp(4rem,10vw,7rem)] ' +
              'font-extralight leading-none tracking-tighter'
              }
            >
            { project.title }
          </h1>

          { /** Info */ }
          <div
            className= {
              'flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10 ' +
              'sm:gap-24 mt-6 sm:mt-10'
              }
            >
            <div>
              { /** Description */ }
              { project.desc && (
                <p className= 'max-w-3xl text-xl sm:text-2xl font-light leading-relaxed'>
                  { project.desc }
                </p>
              ) }
            </div>

            <div className= 'shrink-0'>
              { /** Project Link */ }
              { project.link && (
                <a
                  href= { project.link }
                  target= '_blank'
                  rel= 'noreferrer'
                  className= {
                    'inline-block px-6 sm:px-8 text-base sm:text-lg font-light uppercase ' +
                    'leading-14 sm:leading-16 tracking-[0.2em] text-(--contrast) bg-(--main)'
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
          <div className= 'markdown-body hyphens-auto md:hyphens-none' lang= 'en'>
            <ReactMarkdown remarkPlugins= { [ remarkGfm ] }>
              { project.content }
            </ReactMarkdown>
          </div>
        ) }
      </div>
    </div>
  );
}
