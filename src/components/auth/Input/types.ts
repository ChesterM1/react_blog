export interface InputInterface {
    input: {
        type: string;
        id: string;
        password: boolean;
        name: string;
    };
    label: {
        htmlFor: string;
        text: string;
        require?: boolean;
    };
}
