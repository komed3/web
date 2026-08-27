import { AnimatePresence, motion } from 'motion/react';


export function Intro () {
  return (
    <div className= 'relative w-full h-screen'>
      <AnimatePresence>
        <motion.div
          initial= { { y: 200, opacity: 0 } }
          whileInView= { { y: 0, opacity: 1 } }
          viewport= { { once: true, amount: 0.3 } }
          className= 'centered pt-10'
        >
          <p className= 'max-w-6xl text-5xl uppercase font-extralight tracking-widest leading-snug'>
            Hi, I'm <b>komed3</b>, a freelance <b>software</b> developer focusing
            on <b>Node.js</b>, data visualization, and <b>modern web</b> technology.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
