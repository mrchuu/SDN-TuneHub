import { useEffect, useRef, useState } from "react";
import PerformRequest from "../../utilities/PerformRequest";
import "../../style/carousel.css";
import { Link } from "react-router-dom";
export default function TopTrackCarousle() {
  const hasMounted = useRef(false);
  const [topTrack, setTopTrack] = useState([]);
  const { OriginalRequest } = PerformRequest();
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailBorderRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    const nextDom = nextRef.current;
    const prevDom = prevRef.current;
    const carouselDom = carouselRef.current;
    const sliderDom = sliderRef.current;
    const thumbnailBorderDom = thumbnailBorderRef.current;
    const timeDom = timeRef.current;
    const firstThumbnailItem = thumbnailBorderDom.querySelector(".item");
    if (firstThumbnailItem) {
      thumbnailBorderDom.appendChild(firstThumbnailItem);
    }
    console.log(firstThumbnailItem);
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    nextDom.onclick = function () {
      showSlider("next");
    };

    prevDom.onclick = function () {
      showSlider("prev");
    };

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    function showSlider(type) {
      const sliderItemsDom = sliderDom.querySelectorAll(".item");
      const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");

      if (type === "next") {
        sliderDom.appendChild(sliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add("next");
      } else {
        sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(
          thumbnailItemsDom[thumbnailItemsDom.length - 1]
        );
        carouselDom.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove("next");
        carouselDom.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    }
  }, []);
  useEffect(() => {
    const fetchTopTRack = async () => {
      try {
        const result = await OriginalRequest(
          "songs/leaderboard/topSong1/7/all",
          "GET"
        );
        if (result.data) {
          setTopTrack(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (hasMounted.current) {
      fetchTopTRack();
    } else {
      hasMounted.current = true;
    }
  }, []);
  return (
    <div className="wrapper">
      <h4 className="text-lightText text-2xl font-semibold dark:text-darkText pl-12 mb-3">
        Weekly Top Track
      </h4>
      <div class="carousel" ref={carouselRef}>
        <div class="list" ref={sliderRef}>
          {topTrack.map((track, index) => (
            <div class="item">
              <img src={track.cover_image} />
              <div class="content">
                <div class="topic">#{index + 1}</div>
                <div class="title">{track.song_name}</div>
                <div class="author">{track.artist.artist_name}</div>
                <div class="viewCount">
                  {track.streamCount} streams this week
                </div>
                <Link
                  to={`/songdetail/${track._id}`}
                >
                  <div class="buttons">
                    <button className="border border-white bg-transparent rounded-md">
                      SEE DETAIL
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div class="thumbnail" ref={thumbnailBorderRef}>
          {topTrack.map((track, index) => (
            <div className="item">
              <img className="border border-white/40" src={track.cover_image} />
              {/* <div class="content">
                <div class="title">{track.song_name}</div>
                <div class="description">{track.artist.artist_name}</div>
              </div> */}
            </div>
          ))}
        </div>

        <div class="arrows">
          <button id="prev" ref={prevRef}>
            &lt;&lt;
          </button>
          <button id="next" ref={nextRef}>
            &gt;&gt;
          </button>
        </div>

        <div class="time" ref={timeRef}></div>
      </div>
    </div>
  );
}
