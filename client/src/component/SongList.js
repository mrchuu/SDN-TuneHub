import { useEffect, useRef, useState } from "react";
import PerformRequest from "../utilities/PerformRequest";
export default function SongList() {
  const [SongList, setSongList] = useState([]);
  const { OriginalRequest } = PerformRequest();
  const hasMounted = useRef(false);
  useEffect(() => {
    const fetch = async () => {
      if (hasMounted.current) {
        const data = await OriginalRequest("songs/getAll", "GET");
        if (data) {
          setSongList(data.data);
        }
      } else {
        hasMounted.current = true;
      }
    };
    fetch();
  }, [hasMounted]);
  return (
    <div className="w-full flex px-5 md:px-10 items-center mt-5">
      <table className="w-full text-lightText dark:text-darkText">
        <thead className="font-semibold">
          <tr className="border-b border-neutral-300">
            <td className="w-1/12 text-center">#</td>
            <td className="w-5/12">Song</td>
            <td className="w-5/12">Album</td>
            <td className="w-1/12">duration</td>
          </tr>
        </thead>
        <tbody className="text-lightTextSecondary dark:text-darkTextSecondary">
          {SongList.map((song, index) => (
            <tr className="border-b border-neutral-300" key={song._id}>
              <td className="w-1/12 text-center">{index + 1}</td>
              <td className="w-5/12 py-2">
                <div className="flex items-center">
                  <img
                    src={song.cover_image}
                    className="w-14 h-14 object-center object-cover rounded-md shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm"
                  />
                  <div className="ml-2">
                    <h4 className="font-semibold text-md">{song.song_name}</h4>
                    <p className="text-xs">{song.artist.artist_name}</p>
                  </div>
                </div>
              </td>
              <td className="w-5/12">{}</td>
              <td className="w-1/12">03:30</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
