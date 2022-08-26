import { createBrowserHistory } from 'history';

const backAfterLogin = (): void => {
    const history = createBrowserHistory({ window });

    if (history.location.key === 'default') {
        history.push('/');
        history.go(1);
        window.location.reload();
        return;
    }
    history.back();
};

export default backAfterLogin;
