import { Cursor } from './effects/Cursor';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';


export default function App () {
  return (
    <>
      <Header />

      <main className= 'min-h-screen' />

      <Footer />
      <Cursor />
    </>
  );
}
