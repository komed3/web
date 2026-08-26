import { About } from '../components/About';
import { External } from '../components/External';
import { Intro } from '../components/Intro';
import { Quote } from '../components/Quote';


export function Home () {
  return (
    <>
      <Intro />
      <External />
      <Quote />
      <About />
    </>
  );
}
