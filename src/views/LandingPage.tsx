import { Intro } from '../components/Intro';
import { ProjectGrid } from '../components/ProjectGrid';
import { Setup } from '../components/Setup';
import { Skills } from '../components/Skills';


export function LandingPage () {
    return ( <>
        <Intro />
        <ProjectGrid />
        <Skills />
        <Setup />
    </> );
}
