import { createBrowserHistory } from 'history';
import { NavigateFunction } from 'react-router-dom';

const backAfterLogin = (navigate: NavigateFunction): void => {
    const history = createBrowserHistory({ window });
    if (history.location.key === 'default') {
        navigate('/');
        return;
    }
    navigate(-1);
};

export default backAfterLogin;
