export function Footer () {
  return (
    <footer className= 'bg-white border-t border-black'>
      { /** Wordmark */ }
      <div className= 'p-7 md:p-12 lg:p-16 pt-20 md:pt-28 lg:pt-36'>
        <div className= 'font-display text-right text-9xl font-800 tracking-wider'>
          <span className= 'text-brutal-blue'>k</span>
          <span>omed3</span>
        </div>
      </div>

      { /** Meta */ }
      <div
        className= {
          'flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-7 md:px-12 lg:px-16 ' +
          'py-6 font-mono text-[11px] uppercase tracking-[0.18em] border-t border-black'
        }
      >
        { /** Copyright */}
        <span>Copyright { new Date().getFullYear() } by komed3</span>

        { /** Build Info */ }
        <div className= 'flex gap-6'>
          <span>Build { process.env.VITE_BUILD_ID ?? 'XXXXXXXX-XXXX' }</span>
          <span>Commit { process.env.VITE_COMMIT_SHA ?? 'XXXXXXX' }</span>
        </div>
      </div>
    </footer>
  );
}
