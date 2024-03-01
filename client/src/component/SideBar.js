import SideBarItem from "./SideBarItem";
import { FaHome, FaSearch, FaChartBar, FaPlus, FaUser } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { LuChevronLast, LuChevronFirst } from "react-icons/lu";
import { createContext, useEffect, useState } from "react";
import { BsSoundwave } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toogleExpand } from "../redux/sideBar.js";

export default function SideBar() {
  // const [expanded, setExpanded] = useState(window.innerWidth > 768);
  const expanded = useSelector((state) => state.sideBar.expanded);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      // setExpanded(window.innerWidth > 768);
      dispatch(toogleExpand(window.innerWidth > 768));
      // console.log(window.location.href);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`h-screen fixed top-0 left-0 bg-light60 dark:bg-dark60 overflow-hidden transition-all z-10 ${expanded ? "w-60" : "w-20"
        }`}
    >
      <nav className="h-full flex flex-col border-r shadow-lg border-lightTextSecondary dark:border-darkTextSecondary">
        <div className="p-4 flex items-center justify-between">
          <div
            className={`flex items-center overflow-hidden transition-all ${expanded ? "w-36" : "w-0"
              }`}
          >
            <BsSoundwave color="#ff5e3a" size={33} />
            <h3 className="text-lightText dark:text-darkText font-bold text-xl">
              Tune
            </h3>
            <h3 className="text-light10 font-bold text-xl">Hub</h3>
          </div>
          <button
            className="p-1.5 rounded-lg hover:bg-light30 hover:dark:bg-dark30"
            onClick={(e) => dispatch(toogleExpand(!expanded))}
          >
            {expanded ? (
              <LuChevronFirst
                className="text-lightText dark:text-darkTextSecondary"
                size={32}
              />
            ) : (
              <LuChevronLast
                className="text-lightText dark:text-darkTextSecondary"
                size={32}
              />
            )}
          </button>
        </div>

        <ul className="flex-col px-3">
          <SideBarItem
            icon={
              <FaHome size={22} className="text-lightText dark:text-darkText" />
            }
            text={"Homepage"}
            url={"/"}
            active={window.location.href === "http://localhost:3000/"} 
          />
          <SideBarItem
            icon={
              <FaSearch
                size={22}
                className="text-lightText dark:text-darkText"
              />
            }
            text={"Explore"}
            url={"/explore"}
            active={window.location.href === "http://localhost:3000/explore"} 
          />
          <SideBarItem
            icon={
              <FaChartBar
                size={22}
                className="text-lightText dark:text-darkText"
              />
            }
            text={"Leaderboard"}
            url={"/leaderboard"}
            active={window.location.href === "http://localhost:3000/leaderboard"} 
          />
        </ul>
        <hr
          className={`mx-auto overflow-hidden border-lightText dark:border-darkText transition-all ${expanded ? "w-3/5" : "w-0"
            }`}
        />
        <div className="flex-1 flex-col relative">
          <div className="px-3 mt-2">
            <div className="flex font-medium text-textSecondary py-2 items-center px-3 justify-between">
              <div className="flex items-center">
                <MdLibraryMusic
                  size={22}
                  className="text-lightText dark:text-darkText"
                />

                <span
                  className={`overflow-hidden transition-all text-lightText dark:text-darkText ${expanded ? "w-24" : "w-0 hidden"
                    }`}
                >
                  &nbsp;Your Library
                </span>
              </div>
              <FaPlus
                className={`overflow-hidden transition-all text-lightText dark:text-darkText ${expanded ? "w-5" : "w-0 hidden"
                  }`}
                size={22}
              />
            </div>
          </div>
          <div
            className={`max-h-44 overflow-hidden transition-all ${expanded ? "w-full" : "w-0 hidden"
              }`}
            style={{ overflowY: "auto" }}
          >
            <div className="px-3 mt-2">
              {/* <div className="bg-light30 dark:bg-dark30 py-2 px-3 text-textSecondary font-medium rounded-md  ">
                <span
                  className={`overflow-hidden transition-all text-lightText dark:text-darkText ${expanded ? "w-32" : "w-0 hidden"
                    }`}
                >
                  Create your first playlist!
                </span>
                <p className="text-xs text-lightTextSecondary dark:text-darkTextSecondary">
                  it's easy !! We'll help
                </p>
                <button
                  className={`bg-light10 dark:bg-dark10 w-full py-2 my-2 rounded-lg text-lightText dark:text-darkText hover:text-slate-950 hover:dark:text-white`}
                >
                  Create playlist
                </button>
              </div> */}
              <div className="px-3 text-textSecondary text-sm font-medium">
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                  />
                  &nbsp;<span>The Weeknd</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://i.pinimg.com/originals/f5/43/d0/f543d0c69e43ce9f9ac9cb7b0023b2f0.jpg"
                  />
                  &nbsp;<span>Aurora</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://www.rollingstone.com/wp-content/uploads/2018/06/eric-clapton-documentary-radio-interview-bbc-listen-read-5fcacf6b-b855-4bff-baa6-35beef77bdc6.jpg"
                  />
                  &nbsp;<span>Eric Clapton</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/two-door-cinema-club-asdfg-etrg.jpg"
                  />
                  &nbsp;<span>Two Door Cinema Club</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://rnbstellar.com/wp-content/uploads/2021/03/stellar-35.jpg"
                  />
                  &nbsp;<span>Stellar</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f"
                  />
                  &nbsp;<span>Artic Monkeys</span>
                </div>
              </div>
            </div>
            {/* <div style={{ height: "1000px" }}></div> */}
          </div>
          <div className="px-3 text-lightText dark:text-darkText">
            <div className="font-medium text-textSecondary py-2 px-3">
              <div className="flex items-center">
                <FaUser size={22} />
                &nbsp;
                <span
                  className={`overflow-hidden transition-all ${expanded ? "w-52" : "w-0 hidden"
                    }`}
                >
                  Followed Artists
                </span>
              </div>
            </div>
          </div>
          <div
            className={`max-h-40 overflow-hidden transition-all ${
              expanded ? "w-full" : "w-0 hidden"
            }`}
            style={{ overflowY: "auto" }}
          >
            <div className="px-3 mt-2">
              {!userInfo.artist_followed ||
              userInfo?.artist_followed?.length === 0 ? (
                <div className="bg-light30 py-2 px-3 font-medium rounded-md dark:bg-dark30">
                  <span className="text-lightText dark:text-darkText">
                    Find some artist to follow
                  </span>
                  <p className="text-xs text-lightTextSecondary dark:text-darkTextSecondary">
                    We'll keep you updated on latest release
                  </p>
                  <button className="bg-light10 dark:bg-dark10 px-5 py-2 my-2 rounded-lg text-white hover:text-slate-950">
                    Browse artists
                  </button>
                </div>
              ) : (
                <div className="px-3 text-textSecondary text-sm font-medium">
                  {userInfo.artist_followed.map((artist) => (
                    <div className="flex items-center mb-3" key={artist._id}>
                      <img
                        className="w-10 h-10 rounded-full border-slate-600  border-2"
                        src={artist.userId.profile_picture}
                      />
                      &nbsp;<span className="text-lightText dark:text-darkTextSecondary">{artist.artist_name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* <div className="px-3 text-textSecondary text-sm font-medium">
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                  />
                  &nbsp;<span>The Weeknd</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://i.pinimg.com/originals/f5/43/d0/f543d0c69e43ce9f9ac9cb7b0023b2f0.jpg"
                  />
                  &nbsp;<span>Aurora</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://www.rollingstone.com/wp-content/uploads/2018/06/eric-clapton-documentary-radio-interview-bbc-listen-read-5fcacf6b-b855-4bff-baa6-35beef77bdc6.jpg"
                  />
                  &nbsp;<span>Eric Clapton</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/two-door-cinema-club-asdfg-etrg.jpg"
                  />
                  &nbsp;<span>Two Door Cinema Club</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://rnbstellar.com/wp-content/uploads/2021/03/stellar-35.jpg"
                  />
                  &nbsp;<span>Stellar</span>
                </div>
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full border-slate-600  border-2"
                    src="https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f"
                  />
                  &nbsp;<span>Artic Monkeys</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-20"></div>
    </div>
  );
}
