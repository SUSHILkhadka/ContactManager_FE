import { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { getLoginResponse, getLogStatus, setLogStatus } from './services/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { makeLoggedInWithInfo } from './redux_toolkit/slices/authSlice';
import AppRoutes from './router/AppRoutes';

import { ReactComponent as ReactLogo } from './assets/contact_icon.svg';
import Icon from '@ant-design/icons';
function App() {
  const dispatch = useDispatch();
  const authInfo = useSelector((state: any) => state.auth);
  useEffect(() => {
    const loginStatus = getLogStatus();
    if (loginStatus) {
      const response = getLoginResponse();
      try {
        dispatch(makeLoggedInWithInfo(JSON.parse(response)));
      } catch (e) {
        console.log('got eror', e);
      }
    }
  }, []);

  return (
    <div>
      <div className="app-name">
        <div className="header">
          <span className="header-logo">
            <Icon component={ReactLogo} spin />
          </span>
          <span>CONTACT MANAGEMENT APP</span>
        </div>
      </div>
      <AppRoutes />
    </div>
  );
}

export default App;
