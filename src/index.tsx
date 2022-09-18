import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import state from './redux/store';
import App from './App';
import { createBrowserHistory } from 'history';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
        <Provider store={state}>
            <div className='main'>
                <App />
            </div>
        </Provider>
    </BrowserRouter>
);
