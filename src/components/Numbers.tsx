const NUMBERS = [
  { label: 'Years experience', value: '15+' },
  { label: 'Projects', value: '100+' },
  { label: 'Lines of code', value: '2M+' }
] as const;


export function Numbers () {
  return (
    <div className= 'flex py-12 divide-x divide-(--main)'>
      { /** Label */ }
      <div className= 'shrink-0 flex flex-col px-12 text-2xl uppercase font-extralight tracking-widest'>
        <span>By the</span>
        <span>numbers</span>
        <span>_</span>
      </div>

      { /** Numbers */ }
      { NUMBERS.map( ( { label, value } ) => (
        <div
          key= { label }
          className= 'flex-1 px-12 pt-16 pb-10 text-right'
        >
          <div className= 'text-9xl font-extralight tracking-tighter'>
            { value }
          </div>

          <div className= 'text-lg font-bold uppercase tracking-widest'>
            { label }
          </div>
        </div>
      ) ) }
    </div>
  );
}
