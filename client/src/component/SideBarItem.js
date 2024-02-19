import { useContext } from "react";
import { expandedContext } from "./SideBar.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function SideBarItem({ icon, text, active, alert }) {
  const expanded = useSelector((state) => state.sideBar.expanded);
  return (
    <li
      className={`relative font-medium
        rounded-md cursor-pointer text-textSecondary transition-colors
        ${active ? "bg-activeSideBar" : "hover:bg-activeSideBar text-gray-600"
        }`}
    >
      <Link to={"/leaderboard"} className="flex items-center py-2 px-3 my-1">
        {/* <a href="/1" className="flex items-center py-2 px-3 my-1"> */}
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-40" : "w-0"
            }`}
        >
          &nbsp;{text}
        </span>
        {/* </a> */}
      </Link>
    </li >
  );
}
