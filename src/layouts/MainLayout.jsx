import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div >
      <Navbar />
      <main className="max-w-[1200px] m-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
