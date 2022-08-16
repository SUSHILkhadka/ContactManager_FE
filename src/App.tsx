import { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { getLoginResponse, getLogStatus } from './services/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { makeLoggedInWithInfo } from './redux_toolkit/slices/authSlice';
import AppRoutes from './router/AppRoutes';

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
    <div className="app-body">
      <AppRoutes/>
    </div>
  );
}

export default App;
