import {
  ContactsFilled,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AboutPage } from "../pages/about/About";
import { AddContactPage } from "../pages/contact/AddContactPage";
import { EditContactPage } from "../pages/contact/EditContactPage";
import { ListContactPage } from "../pages/contact/ListContactsPage";
import { EditPage } from "../pages/edit/EditPage";
import { makeLoggedOut } from "../redux_toolkit/slices/authSlice";
import { reset } from "../redux_toolkit/slices/contactSlice";
import { changePage } from "../redux_toolkit/slices/pageSlice";
import { RootState } from "../redux_toolkit/stores/store";
import { logout } from "../services/backendCallUser";
import {
  getRefreshToken,
  saveLoginResponse,
} from "../services/localStorageAndCookies";
import "./Layout.css";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

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
        return <AboutPage />;
      case 2:
        return <ListContactPage />;
      case 3:
        return <AddContactPage />;
      case 4:
        return <EditPage />;
      case 5:
        return <EditContactPage />;
      default:
        return <div>Not found</div>;
    }
  };

  const items: MenuItem[] = [
    getItem(
      "Create New Contact",
      "3",
      () => dispatch(changePage(3)),
      <UserAddOutlined />
    ),
    getItem("Contacts", "2", () => dispatch(changePage(2)), <ContactsFilled />),
    getItem(
      "Settings",
      "4",
      () => dispatch(changePage(4)),
      <SettingOutlined spin />
    ),
    getItem("About", "1", () => dispatch(changePage(1)), <PieChartOutlined />),
    getItem("Logout", "6", () => showModal(), <LogoutOutlined />),
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
      message.success(msg + "logged out successfully");
      navigate("/login", { replace: true });
    } catch (e) {
      message.error("couldnot logout properly");
    }
    saveLoginResponse("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //if token expires
  useEffect(() => {
    if (getRefreshToken() === "") {
      handleOk("session expired ");
    }
  }, [pageInfo.page]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${pageInfo.page}`]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0.5rem 1rem" }}>{body()}</Content>
        <Footer style={{ textAlign: "center" }}>
          Contact Management ©2022
        </Footer>
      </Layout>
      <Modal
        title="Logout"
        visible={isModalVisible}
        onOk={() => handleOk("")}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};

export default App;
