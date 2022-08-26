export interface ButtonInterface {
    type?: 'button' | 'submit' | 'reset' | undefined;
    loading: boolean;
    text: string;
    onClick?: <T>(t?: T) => any;
}
