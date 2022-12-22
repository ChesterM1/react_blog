import { Like } from '../../../redux/slices/posts/Types';

interface FetchProps {
    viewCount: number;
    createdAt: string;
    addLike?: () => void;
    unLike?: () => void;
    handleLIKE?: Like;
    commentCount: number;
}
export interface BottomBarPropsInterface {
    comment?: boolean;
    view: boolean;
    like?: boolean;
    props: FetchProps;
    scrollToComment?: () => void;
}
