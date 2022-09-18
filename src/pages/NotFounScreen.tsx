import { Link } from "react-router-dom";
const NotFoundScreen = () => {
  return (
    <div className="splashscreen-container">
      <div style={{ margin: "1rem" }}>404: Page not found </div>
      <Link to="/">Go to Home</Link>
    </div>
  );
};
export default NotFoundScreen;
