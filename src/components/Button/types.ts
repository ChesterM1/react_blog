export interface ButtonInterface {
    type?: 'button' | 'submit' | 'reset' | undefined;
    loading: boolean;
    text: string;
    disabled?: boolean;
    onClick?: <T>(t?: T) => any;
}
