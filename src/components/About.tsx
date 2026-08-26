export function About () {
  return (
    <div className= 'px-12 py-40'>
      { /** Statement */ }
      <div className= 'flex flex-col text-7xl uppercase font-black tracking-tight leading-[0.9]'>
        <span>Building</span>
        <span>free & open</span>
        <span>source</span>
      </div>

      { /** About */ }
      <div className= 'grid grid-cols-2 gap-24 mt-40'>
        <div className= 'space-y-8 text-3xl font-extralight leading-relaxed'>
          <p>
            I'm a freelance software developer focusing on Node.js packages,
            data visualization, and contemporary web development.
          </p>

          <p>
            I've always been drawn to understanding how things work. My
            interest in electronics started around 2010 and eventually grew
            into a fascination with software, systems, and the things that
            can be built with them.
          </p>
        </div>
      </div>
    </div>
  );
}
