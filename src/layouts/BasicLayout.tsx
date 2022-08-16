import './Layout.css';
import { useDispatch, useSelector } from 'react-redux';
import { EditContactPage } from '../pages/contact/EditContactPage';
import { ListContactPage } from '../pages/contact/ListContactsPage';
import { HomePage } from '../pages/home/HomePage';
import { changePage } from '../redux_toolkit/slices/pageSlice';
import { RootState } from '../redux_toolkit/stores/store';
import { PieChartOutlined, UserAddOutlined, ContactsFilled, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { MenuProps, message, Modal } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { EditPage } from '../pages/edit/EditPage';
import { AddContactPage } from '../pages/contact/AddContactPage';
import { makeLoggedOut } from '../redux_toolkit/slices/authSlice';
import { logout } from '../services/backendCallUser';
import { saveAccessToken, saveLoginResponse, saveRefreshToken, setLogStatus } from '../services/localStorage';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  onClick: any,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    onClick,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const pageInfo = useSelector((state: RootState) => state.page);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const body = () => {
    switch (pageInfo.page) {
      case 1:
        return (
          <div>
            <HomePage />
          </div>
        );
        break;
      case 2:
        return (
          <div>
            <ListContactPage />
          </div>
        );
        break;
      case 3:
        return (
          <div>
            <AddContactPage />
          </div>
        );
        break;
      case 4:
        return (
          <div>
            <EditPage />
          </div>
        );
        break;
      case 5:
        return (
          <div>
            <EditContactPage />
          </div>
        );
        break;
      default:
        return <div>Not found</div>;
    }
  };

  const items: MenuItem[] = [
    getItem('Create New Contact', '3', () => dispatch(changePage(3)), <UserAddOutlined />),
    getItem('Home', '1', () => dispatch(changePage(1)), <PieChartOutlined />),
    getItem('Contacts', '2', () => dispatch(changePage(2)), <ContactsFilled />),
    getItem('Settings', '4', () => dispatch(changePage(4)), <SettingOutlined spin />),
    getItem('Logout', '6', () => showModal(), <LogoutOutlined spin />),
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    dispatch(makeLoggedOut());
    try {
      const res = await logout();
      setLogStatus(false);
      saveLoginResponse('');
      saveAccessToken('');
      saveRefreshToken('');
      message.success('logged out successfully');
      navigate('/login', { replace: true });
    } catch (e) {
      message.error('couldnot logout');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[`${pageInfo.page}`]} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0.5rem 1rem' }}>{body()}</Content>
        <Footer style={{ textAlign: 'center' }}>Contact Management ©2022</Footer>
      </Layout>
      <Modal title="Logout" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};

export default App;
