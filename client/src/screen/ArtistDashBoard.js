import SongList from "../component/SongList";
import ArtistTemplate from "../template/ArtistTemplate";
import {Line} from "react-chartjs-2"
export default function ArtistDashBoard() {
  return (
    <ArtistTemplate>
      <div className="w-full min-h-screen px-5">
        <h4 className="text-lightTextSecondary dark:text-darkTextSecondary text-2xl font-semibold pl-3">
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
            {/* <div className="mt-5 rounded-md bg-light30 dark:bg-dark30 w-full h-[550px]">
            <canvas height="363" width="726" class="chartjs-render-monitor" style="display: block; width: 726px; height: 363px;"></canvas>

              <Line
                data={{
                  labels: [
                    1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050,
                  ],
                  datasets: [
                    {
                      data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                      label: "Africa",
                      borderColor: "#3e95cd",
                      fill: false,
                    },
                    {
                      data: [
                        282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267,
                      ],
                      label: "Asia",
                      borderColor: "#8e5ea2",
                      fill: false,
                    },
                    {
                      data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                      label: "Europe",
                      borderColor: "#3cba9f",
                      fill: false,
                    },
                    {
                      data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                      label: "Latin America",
                      borderColor: "#e8c3b9",
                      fill: false,
                    },
                    {
                      data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                      label: "North America",
                      borderColor: "#c45850",
                      fill: false,
                    },
                  ],
                }}
                options={{
                  title: {
                    display: true,
                    text: "World population per region (in millions)",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                }}
              />
            </div> */}
          </div>
          <div className="rightSide  w-4/12"></div>
        </div>
        <div className="h-20"></div>
      </div>
    </ArtistTemplate>
  );
}
