import Icon from "@ant-design/icons";
import "antd/dist/antd.css";
import "../src/components/styles/App.css";
import { ReactComponent as ReactLogo } from "./assets/contact_icon.svg";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <div>
      <div className="app-name">
        <div className="header">
          <span className="header-logo">
            <Icon component={ReactLogo} />
          </span>
          <span className="header-title">CONTACT MANAGER</span>
        </div>
      </div>
      <AppRoutes />
    </div>
  );
}

export default App;
