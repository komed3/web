import { About } from '../components/About';
import { External } from '../components/External';
import { Intro } from '../components/Intro';
import { Numbers } from '../components/Numbers';
import { Quote } from '../components/Quote';


export function Home () {
  return (
    <>
      <Intro text= { (
        <>
          Hi, I'm <b>komed3</b>, a freelance <b>software</b> developer focusing
          on <b>Node.js</b>, data visualization, and <b>modern web</b> technology.
        </>
      ) } />

      <External />
      <Quote />
      <About />
      <Numbers />
    </>
  );
}
