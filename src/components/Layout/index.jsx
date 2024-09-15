import { Outlet } from "react-router-dom";
import Header from "../header/index";
import Footer from "../footer";
import "./styles.css";

export default function Layout() {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <header>
            <Header />
          </header>
          <main className="margemheader">
            <Outlet />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
}
