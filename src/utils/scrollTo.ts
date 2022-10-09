function scrollTo<T extends React.RefObject<HTMLElement>>(
    refElem: T,
    scrollSpeed?: 'auto' | 'smooth'
): void;
function scrollTo<T extends React.RefObject<HTMLElement>[]>(
    refElem: T,
    dataName: string,
    scrollSpeed?: 'auto' | 'smooth'
): void;
function scrollTo<T extends React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[]>(
    refElem: T,
    dataName?: string,
    scrollSpeed: 'auto' | 'smooth' = 'auto'
): void {
    if (Array.isArray(refElem)) {
        for (const key of refElem) {
            if (key && key.current && key.current.dataset.element === dataName) {
                key.current.scrollIntoView({ behavior: scrollSpeed, block: 'end' });
            }
        }
    } else {
        refElem?.current?.scrollIntoView({ behavior: scrollSpeed, block: 'end' });
    }
}
export default scrollTo;
