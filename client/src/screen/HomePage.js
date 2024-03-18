import { useEffect, useRef, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import "../style/carousel.css";
import SongList from "../component/SongList";
export default function HomePage() {
  return (
    <DefaultTemplate>
      <div className="w-full min-h-screen">
        <SongList />
      </div>
    </DefaultTemplate>
  );
}
