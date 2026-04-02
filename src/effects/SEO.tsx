import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
}


export function useSEO( { title, description }: SEOProps ) {
    useEffect( () => {
        const baseTitle = 'komed3';
        const fullTitle = title ? `${title} — ${baseTitle}` : `${baseTitle} — Building Free & Open Source`;
        const fullDescription = description || 'Freelance software developer specializing in Node.js packages, data visualization, and open-source projects. Germany-based developer with 15+ years of experience.';

        document.title = fullTitle;

        const metaDescription = document.querySelector( 'meta[name="description"]' );
        if ( metaDescription ) metaDescription.setAttribute( 'content', fullDescription );
    }, [ title, description ] );
}
