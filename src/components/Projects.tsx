export function Projects () {
  return (
    <div className= 'px-12 py-32'>
      { /** Header */ }
      <div className= 'flex justify-between items-end pb-20'>
        <div>
          <div className= 'text-xs uppercase tracking-[0.3em]'>
            Selected work
          </div>

          <div className= 'mt-6 -ml-6 text-[clamp(6rem,14vw,13rem)] font-extralight leading-[0.8] tracking-tighter'>
            Projects
          </div>
        </div>
      </div>
    </div>
  );
}
