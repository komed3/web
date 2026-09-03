import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';


interface ThemeContextType {}


const THEMES = {
  default: { accent: '#fff',    main: '#000', contrast: '#fff' },
  stack:   { accent: '#ea580c', main: '#fff', contrast: '#000' },
  project: { accent: '#fbbf24', main: '#000', contrast: '#fff' },
  index:   { accent: '#000',    main: '#fff', contrast: '#000' }
} as const;


const ROUTES = [
  [ /^\/$/,               'default' ],
  [ /^\/stack$/,          'stack'   ],
  [ /^\/project(?:\/|$)/, 'project' ],
  [ /^\/index$/,          'index'   ]
] as const;


function getColorVars ( pathname: string ) {
  return THEMES[ ROUTES.find( ( [ pattern ] ) => pattern.test( pathname ) )?.[ 1 ] ?? 'default' ];
}


function setColorVars ( pathname: string ) {
  Object.entries( getColorVars( pathname ) ).forEach( ( [ key, value ] ) =>
    document.documentElement.style.setProperty( `--${ key }`, value )
  );
}


const ThemeContext = createContext< ThemeContextType | undefined >( undefined );


export function ThemeProvider ( { children }: { children: ReactNode } ) {
  const { pathname } = useLocation();
  const [ target, setTarget ] = useState< string | null >( null );
  const [ contentVisible, setContentVisible ] = useState( true );

  useEffect( () => { if ( target ) return; setColorVars( pathname ) }, [ pathname, target ] );

  useEffect( () => {
    if ( ! target || pathname !== new URL( target, window.location.origin ).pathname ) return;

    setContentVisible( true );
    setTarget( null );
  }, [ pathname, target ] );

  useEffect( () => {
    const handleClick = ( event: MouseEvent ) => {
      if ( event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) return;

      const link = ( event.target as HTMLElement ).closest< HTMLAnchorElement >( 'a[href]' );
      if ( ! link || link.target === '_blank' ) return;

      const url = new URL( link.href );
      if ( url.origin !== window.location.origin ) return;

      const current = window.location.pathname + window.location.search + window.location.hash;
      const next = url.pathname + url.search + url.hash;
      if ( current === next || target ) return;

      event.preventDefault();
      event.stopPropagation();

      setContentVisible( false );
      setTarget( next );
    };

    document.addEventListener( 'click', handleClick, true );
    return () => { document.removeEventListener( 'click', handleClick, true ) };
  }, [ target ] );

  const overlayColor = target
    ? getColorVars( new URL( target, window.location.origin ).pathname ).accent
    : '#000';

  const value = useMemo(
    () => ( { pathname, target, setTarget, contentVisible, setContentVisible, overlayColor } ),
    [ pathname ]
  );

  return (
    <ThemeContext.Provider value= { value }>
      { children }
    </ThemeContext.Provider>
  );
}


export function useTheme () {
  const context = useContext( ThemeContext );
  if ( context === undefined ) throw new Error( 'useTheme must be used within an ThemeProvider' );
  return context;
}
