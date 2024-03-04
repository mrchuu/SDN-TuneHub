import { useEffect, useRef, useState } from "react";
import PerformRequest from "../utilities/PerformRequest";

export default function AlbumList({ url }) {
  const { OriginalRequest } = PerformRequest();
  const hasMounted = useRef(false);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      if (hasMounted.current) {
        try {
          console.log("aaaa");
          setLoading(true);
          const data = await OriginalRequest(url, "GET");
          if (data) {
            setAlbums(data.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        hasMounted.current = true;
      }
    };
    fetch();
  }, [hasMounted, url]);
  return (
    <div className="mt-5">
      {/* {albums.map((album) => ( */}
      {albums.length > 0 ? (
        <div className="w-full flex justify-between px-5">
          <div
            style={{ width: "18%" }}
            className="card border py-3 px-1 rounded-md bg-light30 dark:bg-dark30 shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none mb-8"
          >
            {/* <div className="w-11/12 mx-auto"> */}
            <img
              src={albums[0].album_cover}
              className="rounded-md w-48 h-48 object-cover object-center mx-auto mb-2"
            />
            <h3 className="text-lg font-medium dark:text-white pl-2">
              {albums[0].album_name}
            </h3>
            {albums[0].description ? (
              <p
                style={{ height: "60px" }}
                className="text-sm mb-2 text-lightTextSecondary dark:text-darkTextSecondary pl-2 overflow-hidden line-clamp-3"
              >
                {albums[0].description}
              </p>
            ) : (
              <p className="text-md text-light30 dark:text-dark30 ml-2">Null</p>
            )}
            {/* </div> */}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* ))} */}
    </div>
  );
}
