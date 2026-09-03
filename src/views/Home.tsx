import { Intro } from '../components/Intro';


export function Home () {
  return (
    <>
      <Intro
        text= { (
          <>
            Hi, I'm <b>komed3</b>, a freelance <b>software</b> developer focusing
            on <b>Node.js</b>, data visualization, and <b>modern web</b> technology.
          </>
        ) }
      />
    </>
  );
}
