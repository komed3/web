import { Package, Coffee, Archive } from 'lucide-react';
import { cn } from '../lib/utils';
import { siGithub, siX } from 'simple-icons';


export const SOCIAL_LINKS = [
    { name: 'GitHub', icon: siGithub.svg, url: 'https://github.com/komed3', color: 'bg-brutal-blue text-brutal-white' },
    { name: 'npmjs', icon: Package, url: 'https://npmjs.com/~komed3', color: 'bg-brutal-pink text-brutal-white' },
    { name: 'X / Twitter', icon: siX.svg, url: 'https://x.com/komed3dev', color: 'bg-brutal-green text-brutal-black' },
    { name: 'Ko-fi', icon: Coffee, url: 'https://ko-fi.com/komed3', color: 'bg-brutal-orange text-brutal-black' },
    { name: 'APT Repo', icon: Archive, url: 'https://deb.komed3.de', color: 'bg-brutal-yellow text-brutal-black' }
];

export interface SocialLinksProps {
    className?: string;
    iconSize?: number;
}

export function SocialLinks ( { className, iconSize = 20 }: SocialLinksProps ) {
    return ( <div className={ cn( 'flex flex-wrap gap-2 md:gap-4', className ) }>
        { SOCIAL_LINKS.map( ( link ) => (
            <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={ cn(
                    'p-2 brutal-border-sm transition-transform hover:-translate-y-1',
                    link.color
                ) }
                title={link.name}
            >
                <link.icon size={iconSize} className={ iconSize > 20 ? "md:w-6 md:h-6" : "" } />
            </a>
        ) ) }
    </div> );
}
