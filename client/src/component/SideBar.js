import { Button } from "@mui/material";
import logo from "../assets/images/images.png";
import SideBarItem from "./SideBarItem";
import { FaHome, FaSearch, FaChartBar, FaPlus, FaUser } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { LuChevronLast, LuChevronFirst } from "react-icons/lu";
import { createContext, useEffect, useState } from "react";
export const expandedContext = createContext();
export default function SideBar() {
  const [expanded, setExpanded] = useState(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth > 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`h-screen bg-sideBarBg overflow-hidden transition-all ${
        expanded ? "w-72" : "w-20"
      }`}
    >
      <nav className="h-full flex flex-col border-r shadow-lg border-sideBarBorder">
        <div className="p-4 flex items-center justify-between">
          <div
            className={`flex items-center overflow-hidden transition-all ${
              expanded ? "w-36" : "w-0"
            }`}
          >
            <img src={logo} className="w-10 mr-3" alt="logo" />
            <h3 className="text-white font-bold text-xl">Tune</h3>
            <h3 className="text-PinkPrimary font-bold text-xl">Hub</h3>
          </div>
          <button
            className="p-1.5 rounded-lg hover:bg-activeSideBar"
            onClick={(e) => setExpanded(!expanded)}
          >
            {expanded ? (
              <LuChevronFirst className="text-textSecondary" size={32} />
            ) : (
              <LuChevronLast className="text-textSecondary" size={32} />
            )}
          </button>
        </div>
        <expandedContext.Provider value={{ expanded }}>
          <ul className="flex-col px-3">
            <SideBarItem
              icon={<FaHome size={22} color="#A5A5A5" />}
              text={"Homepage"}
              active
            />
            <SideBarItem
              icon={<FaSearch size={22} color="#A5A5A5" />}
              text={"Explore"}
            />
            <SideBarItem
              icon={<FaChartBar size={22} color="#A5A5A5" />}
              text={"Leaderboard"}
            />
          </ul>
          <hr
            className={`mx-auto overflow-hidden transition-all ${
              expanded ? "w-3/5" : "w-0"
            }`}
            style={{ color: "#AFAFAF" }}
          />
          <div className="flex-1 flex-col relative">
            <div className="px-3 mt-2">
              <div className="flex font-medium text-textSecondary py-2 items-center px-3 justify-between">
                <div className="flex items-center">
                  <MdLibraryMusic size={22} />

                  <span
                    className={`overflow-hidden transition-all ${
                      expanded ? "w-24" : "w-0 hidden"
                    }`}
                  >
                    &nbsp;Your Library
                  </span>
                </div>
                <FaPlus
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-5" : "w-0 hidden"
                  }`}
                  size={22}
                />
              </div>
            </div>
            <div
              className={`max-h-44 overflow-hidden transition-all ${
                expanded ? "w-60" : "w-0 hidden"
              }`}
              style={{ overflowY: "auto" }}
            >
              <div className="px-3 mt-2">
                <div className="bg-activeSideBar py-2 px-3 text-textSecondary font-medium rounded-md  ">
                  <span
                    className={`overflow-hidden transition-all ${
                      expanded ? "w-32" : "w-0 hidden"
                    }`}
                  >
                    Create your first playlist!
                  </span>
                  <p
                    className="text-xs"
                    style={{ color: "RGB(126 ,126 ,126, 0.7)" }}
                  >
                    it's easy !! We'll help
                  </p>
                  <button className="bg-PinkPrimary px-5 py-2 my-2 rounded-lg text-white hover:text-slate-950">
                    Create playlist
                  </button>
                </div>
                {/* <div className="px-3 text-textSecondary text-sm font-medium">
                <div className="flex items-center my-2">
                  <img
                    className="w-10 rounded-full border-slate-600  border-2"
                    src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                  />
                  &nbsp;<span>The Weeknd</span>
                </div>
                <div className="flex items-center my-2">
                  <img
                    className="w-10 rounded-full border-slate-600  border-2"
                    src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                  />
                  &nbsp;<span>The Weeknd</span>
                </div>
                <div className="flex items-center my-2">
                  <img
                    className="w-10 rounded-full border-slate-600  border-2"
                    src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                  />
                  &nbsp;<span>The Weeknd</span>
                </div>
                <div className="flex items-center my-2">
                  <img
                    className="w-10 rounded-full border-slate-600  border-2"
                    src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                  />
                  &nbsp;<span>The Weeknd</span>
                </div>
                <div className="flex items-center my-2">
                  <img
                    className="w-10 rounded-full border-slate-600  border-2"
                    src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                  />
                  &nbsp;<span>The Weeknd</span>
                </div>
                <div className="flex items-center my-2">
                  <img
                    className="w-10 rounded-full border-slate-600  border-2"
                    src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                  />
                  &nbsp;<span>The Weeknd</span>
                </div>
              </div> */}
              </div>
              {/* <div style={{ height: "1000px" }}></div> */}
            </div>
            <div className="px-3 mt-2">
              <div className="font-medium text-textSecondary py-2 px-3">
                <div className="flex items-center">
                  <FaUser size={22} />
                  &nbsp;
                  <span
                    className={`overflow-hidden transition-all ${
                      expanded ? "w-32" : "w-0 hidden"
                    }`}
                  >
                    Followed Artists
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`max-h-44 overflow-hidden transition-all ${
                expanded ? "w-60" : "w-0 hidden"
              }`}
              style={{ overflowY: "auto" }}
            >
              <div className="px-3 mt-2">
                {/* <div className="bg-activeSideBar py-2 px-3 text-textSecondary font-medium rounded-md  ">
                <span>Find some artist to follow</span>
                <p
                  className="text-xs"
                  style={{ color: "RGB(126 ,126 ,126, 0.7)" }}
                >
                  We'll keep you updated on latest release
                </p>
                <button className="bg-PinkPrimary px-5 py-2 my-2 rounded-lg text-white hover:text-slate-950">
                  Browse artists
                </button>
              </div> */}

                <div className="px-3 text-textSecondary text-sm font-medium">
                  <div className="flex items-center my-2">
                    <img
                      className="w-10 h-10 rounded-full border-slate-600  border-2"
                      src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                    />
                    &nbsp;<span>The Weeknd</span>
                  </div>
                  <div className="flex items-center my-2">
                    <img
                      className="w-10 h-10 rounded-full border-slate-600  border-2"
                      src="https://i.pinimg.com/originals/f5/43/d0/f543d0c69e43ce9f9ac9cb7b0023b2f0.jpg"
                    />
                    &nbsp;<span>Aurora</span>
                  </div>
                  <div className="flex items-center my-2">
                    <img
                      className="w-10 h-10 rounded-full border-slate-600  border-2"
                      src="https://www.rollingstone.com/wp-content/uploads/2018/06/eric-clapton-documentary-radio-interview-bbc-listen-read-5fcacf6b-b855-4bff-baa6-35beef77bdc6.jpg"
                    />
                    &nbsp;<span>Eric Clapton</span>
                  </div>
                  <div className="flex items-center my-2">
                    <img
                      className="w-10 h-10 rounded-full border-slate-600  border-2"
                      src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/two-door-cinema-club-asdfg-etrg.jpg"
                    />
                    &nbsp;<span>Two Door Cinema Club</span>
                  </div>
                  <div className="flex items-center my-2">
                    <img
                      className="w-10 h-10 rounded-full border-slate-600  border-2"
                      src="https://rnbstellar.com/wp-content/uploads/2021/03/stellar-35.jpg"
                    />
                    &nbsp;<span>Stellar</span>
                  </div>
                  <div className="flex items-center my-2">
                    <img
                      className="w-10 h-10 rounded-full border-slate-600  border-2"
                      src="https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f"
                    />
                    &nbsp;<span>Artic Monkeys</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </expandedContext.Provider>
      </nav>
    </div>
  );
}
