import { useEffect, useRef, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import "../style/carousel.css";
import SongList from "../component/SongList";
import TopTrackCarousle from "../component/HomPage/TopTrackCarousel";
import TopArtist from "../component/HomPage/TopArtist";
import LatestRelease from "../component/HomPage/LatestRelease";
import TestLineClamp from "../component/HomPage/TestLineClamp";
export default function HomePage() {
  return (
    <DefaultTemplate>
      <div className="w-full min-h-screen">
        <TopTrackCarousle />
        <TopArtist />
        <LatestRelease />
        {/* <SongList /> */}
        <div className="h-20"></div>
      </div>
    </DefaultTemplate>
  );
}
