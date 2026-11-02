import { Link, Outlet } from "react-router";
import Logo from "../assets/logo.webp";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="app">
      <header>
        <img id="logo" src={Logo} alt="BugBoard logo" />
        <h1>Mt.SAC Computer Science Club</h1>
      </header>

      <main className="content">
        <Outlet></Outlet>
      </main>

      <footer>
        <p>© 2026 Mt. SAC Computer Science Club. All rights reserved.</p>
        <p>
          Contact us at:
          <a href="mailto:mtsac.csclub@gmail.com" aria-label="Send us an email">
            mtsac.csclub@gmail.com
          </a>
        </p>
      </footer>

      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
