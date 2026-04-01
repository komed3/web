export function Footer () {
    return ( <footer className="w-full bg-white border-t-4 border-black p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 z-50">
        <div className="text-2xl font-display font-black">
            KOMED3<span className="text-brutal-blue p-0.5">!</span>DEV
        </div>

        <div className="flex flex-wrap justify-center gap-8 font-black uppercase text-sm">
            <a href="https://github.com/komed3" target="_blank" rel="noopener noreferrer" className="hover:text-brutal-blue transition-colors">GitHub</a>
            <a href="https://x.com/komed3dev" target="_blank" rel="noopener noreferrer" className="hover:text-brutal-pink transition-colors">Twitter</a>
            <a href="https://ko-fi.com/komed3" target="_blank" rel="noopener noreferrer" className="hover:text-brutal-yellow transition-colors">Ko-fi</a>
        </div>

        <div className="text-xs font-bold opacity-50 text-center md:text-right">
            DESIGNED AND DEVELOPED BY<br />
            (C) 2026 KOMED3
        </div>
    </footer> );
}
