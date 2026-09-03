import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';


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
  const value = useMemo( () => ( {} ), [] );

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
