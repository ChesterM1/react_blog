import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import styles from './index.module.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <div className={styles.main}>
      <App />
    </div>
  </BrowserRouter>
  
);

