import { Hardware } from '../components/Hardware';
import { Intro } from '../components/Intro';
import { Skills } from '../components/Skills';
import { Software } from '../components/Software';


export function Stack () {
  return (
    <>
      <Intro
        text= { (
          <>
            ...
          </>
        ) }
      />

      <Skills />
      <Software />
      <Hardware />
    </>
  );
}
