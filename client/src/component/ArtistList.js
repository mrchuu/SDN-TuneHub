import React, { useEffect, useState } from "react";
import PerformRequest from "../utilities/PerformRequest.js";

export default function ArtistList() {
    const { OriginalRequest } = PerformRequest();
    const [albums, setAlbums] = useState([]);

    const fetchAlbum = async () => {
        try {
            const data = await OriginalRequest("album/getHotAlbum", "GET");
            if (data) {
                setAlbums(data.data);
            }
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };

    useEffect(() => {
        fetchAlbum();
    }, []);

    return (
        <div className="w-full pt-8">
            <div className="mx-auto">
                <h2 className="text-2xl font-semibold mb-8 dark:text-white ml-4">
                    Album
                </h2>
            </div>
            <div className="mt-5">
                {albums.length > 0 ? (
                    <div className="w-full flex flex-wrap">
                        {albums.map((album) => (
                            <div
                                key={album.id}
                                className="card border lg:w-2/12 md:w-4/12 sm:w-6/12 pb-2 rounded hover:bg-light30 hover:dark:bg-dark30 hover:shadow-md hover:shadow-neutral-400 hover:dark:shadow-blue-600/40 dark:border-none"
                            >
                                <div className="p-2">
                                    <img
                                        src={album.album_cover}
                                        className="w-44 h-44 rounded-md mx-auto border-2 border-neutral-400/20 object-cover object-center"
                                    />
                                </div>
                                <div className="lg:px-3 md:px-3 sm:px-8">
                                    <p className="text-lightText dark:text-darkText font-medium line-clamp-1 overflow-ellipsis">
                                        {album.album_name}
                                    </p>
                                    <p className="text-lightTextSecondary text-sm dark:text-darkTextSecondary line-clamp-2 overflow-ellipsis">
                                        {album.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <></>
                )}

            </div>
        </div>
    );
}
