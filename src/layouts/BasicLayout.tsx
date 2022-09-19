import {
  ContactsFilled,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, message, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { makeLoggedOut } from '../redux_toolkit/slices/authSlice';
import { reset } from '../redux_toolkit/slices/contactSlice';
import { logout } from '../services/backendCallUser';
import { saveLoginResponse } from '../services/localStorageAndCookies';
import './Layout.css';

const { Content, Footer, Sider } = Layout;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items: MenuItem[] = [
    getItem(
      'Create New Contact',
      '3',
      () => navigate('/add'),
      <UserAddOutlined />
    ),
    getItem('Contacts', '2', () => navigate('/list'), <ContactsFilled />),
    getItem(
      'Settings',
      '4',
      () => navigate('/settings'),
      <SettingOutlined />
    ),
    getItem('About', '1', () => navigate('/about'), <PieChartOutlined />),
    getItem('Logout', '6', () => showModal(), <LogoutOutlined />),
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (msg?: string) => {
    setIsModalVisible(false);
    dispatch(makeLoggedOut());
    dispatch(reset());
    try {
      const res = await logout();
      message.success(msg + 'logged out successfully');
      navigate('/login', { replace: true });
    } catch (e) {
      message.error('couldnot logout properly');
    }
    saveLoginResponse('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='logo' />
        <Menu theme='dark' mode='inline' items={items} />
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0.5rem 1rem' }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Contact Management ©2022
        </Footer>
      </Layout>
      <Modal
        title='Logout'
        visible={isModalVisible}
        onOk={() => handleOk('')}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};

export default App;
