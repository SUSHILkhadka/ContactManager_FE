import { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { getLoginResponse, getLogStatus } from './services/localStorageAndCookies';
import { useDispatch } from 'react-redux';
import { makeLoggedInWithInfo } from './redux_toolkit/slices/authSlice';
import AppRoutes from './router/AppRoutes';

import { ReactComponent as ReactLogo } from './assets/contact_icon.svg';
import Icon from '@ant-design/icons';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loginStatus = getLogStatus();
    if (loginStatus) {
      const response = getLoginResponse();
      dispatch(makeLoggedInWithInfo(JSON.parse(response)));
    }
  }, []);

  return (
    <div>
      <div className="app-name">
        <div className="header">
          <span className="header-logo">
            <Icon component={ReactLogo} />
          </span>
          <span>CONTACT MANAGER</span>
        </div>
      </div>
      <AppRoutes />
    </div>
  );
}

export default App;
