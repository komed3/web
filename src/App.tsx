import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { Cursor } from './effects/Cursor';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { Home } from './pages/Home';


const COLOR_VARS = {
  '/': { '--accent': '#fff', '--main': '#000', '--contrast': '#fff' },
  '/stack': { '--accent': '#1e40af', '--main': '#fff', '--contrast': '#000' },
  '/index': { '--accent': '#000', '--main': '#fff', '--contrast': '#000' }
} as const;


export default function App () {
  const { pathname } = useLocation();

  useEffect( () => {
    const vars = COLOR_VARS[ pathname as keyof typeof COLOR_VARS ] || COLOR_VARS[ '/' ];
    Object.entries( vars ).forEach( ( [ key, value ] ) =>
      document.documentElement.style.setProperty( key, value )
    );
  }, [ pathname ] );

  return (
    <div className= 'bg-(--accent) text-(--main) transition-colors duration-300'>
      <Header />

      <main className= 'min-h-screen'>
        <Routes>
          <Route path= '/' element= { <Home /> } />
        </Routes>
      </main>

      <Footer />
      <Cursor />
    </div>
  );
}
