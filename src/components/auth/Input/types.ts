export interface InputInterface {
    input: {
        type: string;
        id: string;
        password?: true | false;
        name: string;
    };
    label: {
        htmlFor: string;
        text: string;
        require?: boolean;
    };
}
