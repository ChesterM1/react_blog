import { useCallback, useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 720): boolean => {
    const checkForDevice = useCallback(() => window.innerWidth < breakpoint, []);

    const [isMobile, setIsMobile] = useState(checkForDevice());

    useEffect(() => {
        const handlePageResized = () => {
            setIsMobile(checkForDevice());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handlePageResized);
            window.addEventListener('orientationchange', handlePageResized);
            window.addEventListener('load', handlePageResized);
            window.addEventListener('reload', handlePageResized);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handlePageResized);
                window.removeEventListener('orientationchange', handlePageResized);
                window.removeEventListener('load', handlePageResized);
                window.removeEventListener('reload', handlePageResized);
            }
        };
    }, [checkForDevice]);

    return isMobile;
};
