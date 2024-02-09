import { Link } from "react-router-dom";
import { FaCogs } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <div className="flex items-center justify-end pt-5">
      <FaCogs size={35} className="mr-8" color="#f2785c" />
      <Link to={"/login"} className="mr-14">
        {isLoggedIn ? (
          <div>
            <img src={userInfo.profilePicture} className="w-14 rounded-full border-orange-200 shadow-lg border-2"/>
          </div>
        ) : (
          <button className="bg-OrangePrimary px-8 py-2 rounded-full text-textSecondary text-xl hover:text-white">
            Login
          </button>
        )}
      </Link>
    </div>
  );
}
