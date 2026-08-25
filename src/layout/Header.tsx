import { useState } from 'react';


export function Header () {
  const [ menuOpen, setMenuOpen ] = useState( false )

  return (
    <>
      <header className= 'fixed inset-x-0 top-0 z-90 bg-white border-b border-black'>
        <div className= 'grid h-20 grid-cols-[1fr_auto_1fr] items-stretch'></div>
      </header>
    </>
  );
}
