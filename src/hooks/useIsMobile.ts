export const useIsMobile = (): boolean => {
    if (window.innerWidth < 720) {
        return true;
    }
    return false;
};
