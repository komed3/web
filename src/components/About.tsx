import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';


export function About () {
  return (
    <div className= 'px-6 sm:px-12 py-24 sm:py-40'>
      { /** Statement */ }
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= {
          'flex flex-col text-[clamp(3.5rem,8vw,5rem)] uppercase font-black ' +
          'tracking-tight leading-[0.9]'
        }
      >
        <span>Building</span>
        <span>free & open</span>
        <span>source</span>
      </motion.div>

      { /** Content */ }
      <div className= 'grid lg:grid-cols-2 gap-16 lg:gap-24 mt-16 sm:mt-40'>
        { /** About */ }
        <motion.div
          initial= { { y: 40, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
          viewport= { { once: true, amount: 0.3 } }
          className= 'space-y-8 text-[clamp(1.5rem,3vw,1.875rem)] font-extralight leading-relaxed'
        >
          <p>
            I'm a freelance software developer focusing on Node.js packages,
            data visualization, and contemporary web development.
          </p>

          <p>
            I've always been drawn to understanding how things work. My
            interest in electronics started around 2010 and eventually grew
            into a fascination with software, systems, and the things
            that can be built with them.
          </p>
        </motion.div>

        { /** Philosophy */ }
        <motion.div
          initial= { { y: 40, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
          viewport= { { once: true, amount: 0.3 } }
          className= {
            'flex flex-col justify-end gap-8 text-[clamp(1.25rem,2.5vw,1.5rem)] ' +
            'font-extralight leading-relaxed'
          }
        >
          <div className= 'text-xs uppercase tracking-[0.4rem]'>
            Philosophy
          </div>

          <p>
            I believe in the power of open collaboration. My stack is
            intentionally built around open-source tools to keep things
            transparent, accessible, and built to last.
          </p>

          <p>
            Open source isn't just a choice. It's a standard.
          </p>
        </motion.div>
      </div>

      { /** Contact */ }
      <motion.div
        initial= { { y: 40, opacity: 0 } }
        whileInView= { { y: 0, opacity: 1 } }
        transition= { { duration: 1.2, ease: [ 0.22, 1, 0.36, 1 ] } }
        viewport= { { once: true, amount: 0.3 } }
        className= {
          'flex flex-col lg:flex-row lg:justify-between lg:items-end gap-12 mt-16 ' +
          'sm:mt-40 pt-8 font-extralight border-t border-(--main)'
        }
      >
        <div className= 'space-y-8'>
          <div className= 'text-xs uppercase tracking-[0.4rem]'>
            Get in touch
          </div>

          <p className= 'max-w-xl text-[clamp(1.25rem,2.5vw,1.5rem)] leading-relaxed'>
            Open for collaborations, freelance projects, and technical
            consulting. If you have something worth building, feel free to
            reach out.
          </p>
        </div>

        { /** Mailto Link */ }
        <a
          href= 'mailto:hello@komed3.de'
          className= 'inline-flex flex-col items-end text-2xl uppercase tracking-wider'
        >
          <span>Get in</span>
          <span>touch</span>

          <ArrowUpRight
            className= '-mr-4'
            size= { 64 }
            strokeWidth= { 0.5 }
          />
        </a>
      </motion.div>
    </div>
  );
}
