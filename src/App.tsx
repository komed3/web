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
  const navigate = useNavigate();
  const [ target, setTarget ] = useState< string | null >( null );

  useEffect( () => { if ( target ) return; setColorVars( pathname ) }, [ pathname, target ] );

  useEffect( () => {
    if ( ! target ) return;
    if ( pathname !== new URL( target, window.location.origin ).pathname ) return;
    setTarget( null );
  }, [ pathname, target ] );

  useEffect( () => {
    const handleClick = ( event: MouseEvent ) => {
      if ( event.button !== 0 ) return;
      if ( event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) return;

      const link = ( event.target as HTMLElement ).closest< HTMLAnchorElement >( 'a[href]' );
      if ( ! link || link.target === '_blank' ) return;

      const url = new URL( link.href );
      if ( url.origin !== window.location.origin ) return;

      const current = window.location.pathname + window.location.search + window.location.hash;
      const next = url.pathname + url.search + url.hash;
      if ( current === next || target ) return;

      event.preventDefault();
      event.stopPropagation();
      setTarget( next );
    };

    document.addEventListener( 'click', handleClick, true );
    return () => { document.removeEventListener( 'click', handleClick, true ) };
  }, [ target ] );

  const overlayColor = target
    ? getColorVars( new URL( target, window.location.origin ).pathname )[ '--accent' ]
    : '#000';

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
