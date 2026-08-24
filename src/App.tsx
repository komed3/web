import { Cursor } from './effects/Cursor';
import { Header } from './layout/Header';
import { Intro } from './layout/Intro';


export default function App () {
  return (
    <>
      <Cursor />
      <Intro />
      <Header />

      <div className= 'h-600' />
    </>
  );
}
