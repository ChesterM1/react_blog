import { Component } from 'react';
import Error from '../Error/500/Error500';
interface StateInterface {
    hasError: boolean;
}

interface props {
    children: JSX.Element;
}
class ErrorBoundary extends Component {
    constructor(readonly props: props, readonly state: StateInterface) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <Error />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
