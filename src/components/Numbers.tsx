const NUMBERS = [
  { label: 'Years experience', value: '15+' }
] as const;


export function Numbers () {
  return (
    <div className= 'flex p-12 divide-x divide-(--text)'>
      { /** Label */ }
      <div className= 'shrink-0 flex flex-col pr-12 text-2xl uppercase font-extralight tracking-widest'>
        <span>By the</span>
        <span>numbers</span>
        <span>_</span>
      </div>

      { /** Numbers */ }
      { NUMBERS.map( ( { label, value }, i ) => (
        <div
          key= { i }
          className= 'px-12'
        >
          <div className= ''>
            { value }
          </div>

          <div className= ''>
            { label }
          </div>
        </div>
      ) ) }
    </div>
  );
}
