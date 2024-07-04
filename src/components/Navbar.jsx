//firebase
import toast from "react-hot-toast";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

//redux
import { useDispatch } from "react-redux";
import { logout } from "../app/userSlice";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const logOutProfile = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <header className="bg-base-200">
      <nav className="align-element  navbar">
        <div className="navbar-start">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar-center">{/*NAVBAR */}</div>
        <div className="navbar-end">
          <div>
            <button onClick={logOutProfile} className="btn btn-secondary">Logout</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
