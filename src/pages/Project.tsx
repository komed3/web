import { ArrowUpRight, Star } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import projects from '../data/projects.json';


export function Project () {
  const navigate = useNavigate();

  const { id } = useParams();
  const index = projects.findIndex( p => p.id === id );
  const project = projects[ index ];

  const prev = projects[ index - 1 ];
  const next = projects[ index + 1 ];

  useEffect(
    () => { if ( ! project ) navigate( '/index', { replace: true } ) },
    [ project, navigate ]
  );

  return project && (
    <>
      { /** Header */ }
      <div className= 'grid grid-cols-[5fr_3fr] h-screen pt-24'>

        { /** Hero */ }
        <div className= 'flex flex-col justify-end p-12'>
          { /** Type */ }
          <div className= 'mb-4 text-2xl font-light uppercase tracking-[0.3em]'>
            { project.type }
          </div>

          { /** Title */ }
          <div className= '-ml-3 max-w-4xl text-[clamp(4rem,8vw,8rem)] font-extralight leading-none tracking-tighter'>
            { project.title }
          </div>

          { /** Info */ }
          <div className= 'flex justify-between items-end gap-24 mt-20'>
            <div>
              { /** Description */ }
              { project.desc && (
                <p className= 'max-w-xl text-2xl font-light leading-relaxed'>
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
                  className= 'inline-block -m-4 p-4'
                >
                  <ArrowUpRight size= { 64 } strokeWidth= { 0.7 } />
                </a>
              ) }
            </div>
          </div>
        </div>

        { /** Aside */ }
        <div className= 'flex flex-col justify-between p-12 text-(--contrast) bg-(--main)'>
          <div>
            { /** Meta */ }
            <div className= 'space-y-6 text-lg uppercase tracking-widest'>
              { [
                [ 'Year', project.meta?.year ],
                [ 'Version', project.meta?.version ],
                [ 'Status', project.status ],
                [ 'License', project.meta?.license ]
              ].map( ( [ label, value ] ) => value && (
                <div
                  key= { label }
                  className= 'flex justify-between gap-8'
                >
                  <span className= 'font-extralight'>{ label }</span>
                  <b className= 'font-medium'>{ value }</b>
                </div>
              ) ) }
            </div>

            { /** Tags */ }
            { project.tags?.length > 0 && (
              <div className= 'mt-24 ml-auto max-w-xl text-right uppercase'>
                <div className= 'mb-6 text-[11px] font-medium tracking-[0.3em]'>
                  Tags
                </div>

                <div className= 'flex flex-wrap justify-end gap-x-6 gap-y-3 text-lg font-extralight tracking-widest'>
                  { project.tags.map( tag => ( <span key= { tag }>{ tag }</span> ) ) }
                </div>
              </div>
            ) }
          </div>

          { /** GitHub */ }
          { project.github && (
            <div className= 'flex items-center justify-between gap-8'>
              <a
                href= { `https://github.com/${ project.github }` }
                target= '_blank'
                rel= 'noreferrer'
                className= {
                  'px-8 text-lg font-light uppercase leading-16 tracking-[0.2em] ' +
                  'text-(--main) bg-(--contrast)'
                }
              >
                GitHub
              </a>

              { /** Stars */ }
              { project.meta?.stars > 0 && (
                <div className= 'flex items-center gap-4 text-lg font-light'>
                  <Star size= { 20 } />
                  <span>{ project.meta.stars.toLocaleString() }</span>
                </div>
              ) }
            </div>
          ) }
        </div>
      </div>

      <div className= 'my-16'></div>
    </>
  );
}
