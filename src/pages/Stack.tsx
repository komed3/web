import { Hardware } from '../components/Hardware';
import { Skills } from '../components/Skills';
import { Software } from '../components/Software';


export function Stack () {
  return (
    <>
      <div className= 'pt-20' />

      <Skills />
      <Software />
      <Hardware />
    </>
  );
}
