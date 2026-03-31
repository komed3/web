import { useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

import { getReadme } from '../services/github';

export function ProjectPage () {
    const { repoName } = useParams< { repoName: string } >();
    const { pathname } = useLocation();

    // Memoize readme content to prevent recalculation
    const readme = useMemo( () => ( repoName ? getReadme( repoName ) : '' ), [ repoName ] );

    return ( <></> );
}
