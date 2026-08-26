import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { Cursor } from './effects/Cursor';
import { Header } from './layout/Header';
import { Home } from './pages/Home';


const COLOR_VARS = {
  '/': { '--bg': '#fff', '--text': '#000' },
  '/stack': { '--bg': '#1e40af', '--text': '#fff' },
  '/index': { '--bg': '#000', '--text': '#fff' }
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
    <div className= 'bg-(--bg) text-(--text) transition-colors duration-300'>
      <Header />

      <main className= 'min-h-screen'>
        <Routes>
          <Route path= '/' element= { <Home /> } />
        </Routes>
      </main>

      <Cursor />
    </div>
  );
}
