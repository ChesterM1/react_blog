type ScrollToElem = 'start' | 'end' | 'center';

function scrollTo<T extends React.RefObject<HTMLElement>>(
    refElem: T,
    scrollToElem?: ScrollToElem
): void;

function scrollTo<T extends React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[]>(
    refElem: T,
    dataName?: string,
    scrollToElem?: ScrollToElem
): void;
function scrollTo<T extends React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[]>(
    refElem: T,
    dataName?: string,
    scrollToElem: ScrollToElem = 'start'
): void {
    if (Array.isArray(refElem)) {
        for (const key of refElem) {
            if (key && key.current && key.current.dataset.element === dataName) {
                key.current.scrollIntoView({
                    behavior: 'smooth',
                    block: scrollToElem,
                });
            }
        }
    } else {
        refElem?.current?.scrollIntoView({
            behavior: 'smooth',
            block: scrollToElem,
        });
    }
}
export default scrollTo;
