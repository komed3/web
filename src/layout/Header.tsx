import { Link } from 'react-router';


export function Header () {
  return (
    <header className= 'fixed inset-x-0 top-0 h-24'>
      { /** Logo */ }
      <div className= 'centered'>
        <Link
          className= 'inline-flex justify-center items-center w-20 h-20 font-display text-4xl'
          to= '/'
        >
          <span>k</span>
        </Link>
      </div>

      { /** Projects */ }
      <div className= 'centered-y right-10'>
        <Link
          className= 'inline-flex justify-center items-center w-fit h-10 px-6 text-lg font-black'
          to= '/index'
        >
          <span>Projects</span>
        </Link>
      </div>
    </header>
  );
}
