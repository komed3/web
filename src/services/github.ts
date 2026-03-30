import reposData from '../data/repos.json';
import skillsData from '../data/skills.json';


export interface Repo {
    name: string;
    description: string;
    stars: number;
    language: string | null;
    url: string;
    updatedAt: string;
    readme: string;
}

export function getRepos () : Repo[] {
    return reposData as Repo[];
}

export function getSkills () : string[] {
    return skillsData as string[];
}

export function getReadme ( repoName: string ) : string {
    for ( const r of getRepos() ) if ( r.name === repoName ) return r.readme;
    throw new Error( `Repo not found: ${repoName}` );
}
