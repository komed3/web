import { SocialLinks } from './SocialLinks';


export function Footer () {
    return ( <footer className="border-t-4 border-brutal-black p-8 md:p-12 mt-12 md:mt-24 bg-brutal-black text-brutal-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl md:text-4xl uppercase font-extrabold tracking-tighter">Let's build_</h2>
                <p className="font-mono text-base md:text-lg opacity-80">
                    Open for collaborations, freelance projects, and technical consulting.
                    Reach out via GitHub or X.
                </p>
                <SocialLinks />
            </div>
            <div className="flex flex-col justify-end items-start md:items-end space-y-2">
                <div className="text-left md:text-right">
                    <p className="font-mono text-[10px] opacity-50 uppercase tracking-widest">Designed & Developed by</p>
                    <p className="text-xl md:text-2xl font-black">KOMED3</p>
                </div>
                <p className="font-mono text-[10px] opacity-30">© 2026 ALL RIGHTS RESERVED</p>
            </div>
        </div>
    </footer> );
}
