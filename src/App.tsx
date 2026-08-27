import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';

import { Cursor } from './effects/Cursor';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { Home } from './pages/Home';
import { Stack } from './pages/Stack';


const COLORS = {
  default: { '--accent': '#fff', '--main': '#000', '--contrast': '#fff' },
  stack: { '--accent': '#1e40af', '--main': '#fff', '--contrast': '#000' },
  project: { '--accent': '#fbbf24', '--main': '#000', '--contrast': '#fff' },
  index: { '--accent': '#000', '--main': '#fff', '--contrast': '#000' }
} as const;


const ROUTES = [
  [ /^\/$/, COLORS.default ],
  [ /^\/stack$/, COLORS.stack ],
  [ /^\/project(?:\/|$)/, COLORS.project ],
  [ /^\/index$/, COLORS.index ]
] as const;


function getColorVars ( pathname: string ) {
  return ROUTES.find( ( [ pattern ] ) => pattern.test( pathname ) )?.[ 1 ] ?? COLORS.default;
}


function setColorVars ( pathname: string ) {
  Object.entries( getColorVars( pathname ) ).forEach( ( [ key, value ] ) =>
    document.documentElement.style.setProperty( key, value )
  );
}


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
          <Route path= '/stack' element= { <Stack /> } />
          <Route path= '/project/:slug' element= { <></> } />
          <Route path= '/index' element= { <></> } />
        </Routes>
      </main>

      <Footer />
      <Cursor />
    </div>
  );
}
