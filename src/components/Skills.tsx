export function Skills () {
    return ( <section id="skills" className="w-full bg-white p-6 md:p-12 flex flex-col gap-12 border-t-4 border-black scroll-mt-20">
        <div className="flex flex-col gap-4">
            <h2 className="text-5xl md:text-7xl font-display font-black">SKILLSET</h2>
            <p className="text-xl font-bold max-w-2xl">
                A technical stack built on performance, reliability, and modern engineering principles.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"></div>
    </section> );
}
