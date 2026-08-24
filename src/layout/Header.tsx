import { MenuIcon } from 'lucide-react';


export function Header () {
  return (
    <header className= 'grid grid-cols-[16rem_1fr_6rem] w-full h-24 divide-x divide-slate-200 bg-white'>
      <button className= 'flex items-center gap-4 w-full h-full p-8'>
        <MenuIcon size= { 32 } strokeWidth= { 0.5 } />
        <span>MENU</span>
      </button>
      <div className= ''></div>
      <div className= ''></div>
    </header>
  );
}
