interface FetchProps {
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    addLike?: () => {
        payload: {
            userId: string;
            postId: string;
        };
        type: string;
    };
    handleLIKE?: string[];
}
export interface BottomBarPropsInterface {
    comment?: boolean;
    view: boolean;
    like?: boolean;
    props: FetchProps;
}
