import { Hardware } from '../components/Hardware';
import { Skills } from '../components/Skills';
import { Software } from '../components/Software';


export function Stack () {
  return (
    <div className= 'pt-40 pb-30 space-y-20'>
      <Skills />
      <Software />
      <Hardware />
    </div>
  );
}
