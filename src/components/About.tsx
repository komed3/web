import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';


export function About () {
  return (
    <div className= 'px-12 py-40'>
      { /** Statement */ }
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= 'flex flex-col text-7xl uppercase font-black tracking-tight leading-[0.9]'
      >
        <span>Building</span>
        <span>free & open</span>
        <span>source</span>
      </motion.div>

      { /** Content */ }
      <div className= 'grid grid-cols-2 gap-24 mt-40'>
        { /** About */ }
        <motion.div
          initial= { { y: 40, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
          viewport= { { once: true, amount: 0.3 } }
          className= 'space-y-8 text-3xl font-extralight leading-relaxed'
        >
          <p>
            I'm a freelance software developer focusing on Node.js packages,
            data visualization, and contemporary web development.
          </p>

          <p>
            I've always been drawn to understanding how things work. My
            interest in electronics started around 2010 and eventually grew
            into a fascination with software, systems, and the things that
            can be built with them.
          </p>
        </motion.div>

        { /** Philosophy */ }
        <motion.div
          initial= { { y: 40, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
          viewport= { { once: true, amount: 0.3 } }
          className= 'flex flex-col justify-end gap-8'
        >
          <div className= 'text-xs uppercase font-extralight tracking-[0.4rem]'>
            Philosophy
          </div>

          <p className= 'text-2xl font-extralight leading-relaxed'>
            I believe in the power of open collaboration. My stack is
            intentionally built around open-source tools to keep things
            transparent, accessible, and built to last.
          </p>

          <p className= 'text-2xl font-extralight leading-relaxed'>
            Open source isn't just a choice. It's a standard.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
