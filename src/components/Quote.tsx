import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';


export function Quote () {
  const ref = useRef< HTMLDivElement >( null );

  const { scrollYProgress } = useScroll( { target: ref, offset: [ 'start end', 'end start' ] } );

  const xFirst = useSpring(
    useTransform( scrollYProgress, [ 0, 0.5, 1 ], [ '-45vw', '0vw', '45vw' ] ),
    { stiffness: 100, damping: 30, mass: 0.5 }
  );

  const xSecond = useSpring(
    useTransform( scrollYProgress, [ 0, 0.5, 1 ], [ '45vw', '0vw', '-45vw' ] ),
    { stiffness: 100, damping: 30, mass: 0.5 }
  );

  const opacity = useTransform(
    scrollYProgress,
    [ 0, 0.25, 0.4, 0.6, 0.75, 1 ],
    [ 0, 0.1, 1, 1, 0.1, 0 ]
  );

  return (
    <div
      ref= { ref }
      className= {
        'flex flex-col items-center px-20 py-32 text-7xl uppercase font-extralight ' +
        'tracking-[2rem] overflow-hidden'
      }
    >
      <motion.span style= { { x: xFirst, opacity } }>
        Leave the road
      </motion.span>

      <motion.span style= { { x: xSecond, opacity } }>
        take the trails
      </motion.span>
    </div>
  );
}
