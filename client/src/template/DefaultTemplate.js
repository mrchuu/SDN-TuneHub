import { useSelector } from "react-redux";
import Header from "../component/Header";
import SideBar from "../component/SideBar";
import Player from "../component/Player";

export default function DefaultTemplate({ title, children }) {
  const expanded = useSelector((state) => state.sideBar.expanded);
  return (
    <div className="h-full flex-col">
      <div className="h-full flex flex-row mb-20">
        <SideBar />
        <div
          className={`w-full bg-light60 dark:bg-dark60 transition-all ${
            window.innerWidth > 768 ? (expanded ? "ml-60" : "ml-20") : "ml-20"
          }`}
        >
          <Header />
          {children}
        </div>
      </div>
      <Player/>
    </div>
  );
}
