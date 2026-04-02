import { Intro } from '../components/Intro';
import { ProjectGrid } from '../components/ProjectGrid';
import { Setup } from '../components/Setup';
import { Skills } from '../components/Skills';
import { useSEO } from '../effects/SEO';


export function LandingPage () {
    useSEO( {} );

    return ( <>
        <Intro />
        <ProjectGrid />
        <Skills />
        <Setup />
    </> );
}
