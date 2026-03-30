import { Github, Package, Twitter, Coffee, Archive } from 'lucide-react';


export const SOCIAL_LINKS = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/komed3', color: 'bg-brutal-blue text-brutal-white' },
    { name: 'npmjs', icon: Package, url: 'https://npmjs.com/~komed3', color: 'bg-brutal-pink text-brutal-white' },
    { name: 'X / Twitter', icon: Twitter, url: 'https://x.com/komed3dev', color: 'bg-brutal-green text-brutal-black' },
    { name: 'Ko-fi', icon: Coffee, url: 'https://ko-fi.com/komed3', color: 'bg-brutal-orange text-brutal-black' },
    { name: 'APT Repo', icon: Archive, url: 'https://deb.komed3.de', color: 'bg-brutal-yellow text-brutal-black' }
];

export interface SocialLinksProps {
    className?: string;
    iconSize?: number;
}

