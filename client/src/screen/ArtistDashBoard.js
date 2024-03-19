import SongList from "../component/SongList";
import ArtistTemplate from "../template/ArtistTemplate";

export default function ArtistDashBoard() {
  return (
    <ArtistTemplate>
      <div className="w-full min-h-screen px-5">
        <h4 className="text-lightText dark:text-darkText text-2xl font-semibold pl-3">
          Artist DashBoard
        </h4>
        <div className="w-full h-[1px] bg-black/60 shadow-lg"></div>
        <div className="flex mt-5">
          <div className="leftSide  w-8/12">
            <div className="flex justify-between">
              <div className="w-64 flex h-28 bg-light30 dark:bg-dark30 rounded-md">
                <div className="w-5/12 flex items-center justify-center h-full ">
                  <img
                    className="w-14"
                    src="https://res.cloudinary.com/djzdhtdpj/image/upload/v1710857048/2695971_ihb5dw.png"
                  />
                </div>
                <div className="w-7/12 flex items-center">
                  <div>
                    <h5 className=" text-light10 dark:text-dark10 text-base font-semibold">
                      Total Revenue
                    </h5>
                    <h5 className="text-lightText dark:text-darkText text-sm font-semibold">
                      3,000,000 vnd
                    </h5>
                  </div>
                </div>
              </div>
              <div className="w-64 flex h-28 bg-light30 dark:bg-dark30 rounded-md">
                <div className="w-5/12 flex items-center justify-center h-full ">
                  <img
                    className="w-14"
                    src="https://res.cloudinary.com/djzdhtdpj/image/upload/v1710857873/3308795_tj411t.png"
                  />
                </div>
                <div className="w-7/12 flex items-center">
                  <div>
                    <h5 className=" text-light10 dark:text-dark10 text-lh-base font-semibold">
                      Total Stream Time
                    </h5>
                    <h5 className="text-lightText dark:text-darkText text-sm font-semibold">
                      1,023
                    </h5>
                  </div>
                </div>
              </div>
              <div className="w-64 flex h-28 bg-light30 dark:bg-dark30 rounded-md">
                <div className="w-5/12 flex items-center justify-center h-full ">
                  <img
                    className="w-14"
                    src="https://res.cloudinary.com/djzdhtdpj/image/upload/v1710858110/10307888_aglyy0.png"
                  />
                </div>
                <div className="w-7/12 flex items-center">
                  <div>
                    <h5 className=" text-light10 dark:text-dark10 text-base font-semibold">
                      Total Followers
                    </h5>
                    <h5 className="text-lightText dark:text-darkText text-sm font-semibold">
                      100
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-md bg-light30 dark:bg-dark30 w-full h-[550px]">

            </div>
          </div>
          <div className="rightSide  w-4/12"></div>
        </div>
        <div className="h-20"></div>
      </div>
    </ArtistTemplate>
  );
}
