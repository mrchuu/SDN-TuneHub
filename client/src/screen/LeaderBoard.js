import React, { useEffect, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";

export default function LeaderBoard() {
    const [song, setSong] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/leaderboard')
            .then((resp) => resp.json())
            .then((data) => {
                setSong(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <DefaultTemplate>
            <div className="w-full min-h-screen items-center justify-center">
                <h1 className="text-3xl font-bold mb-8 dark:text-white ml-4">Leaderboard</h1>
                <div className="w-full overflow-auto">
                    <table className="w-11/12 border-collapse dark:border-darkTextSecondary mx-auto">
                        <thead >
                            <tr className="bg-light60 dark:bg-dark60 border-d        border-gray-200 dark:border-darkTextSecondary font-medium text-dark-500 dark:text-gray-300 uppercase tracking-wider border-dashed ">
                                <th className="w-1/12 text-left text-xs">Rank</th>
                                <th className="w-5/12 text-left text-xs">Song</th>
                                <th className="w-1/12 text-left text-xs">Play</th>
                                <th className="w-4/12  text-left text-xs">Album</th>
                                <th className="w-1/12 text-left text-xs">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {song.map((s, index) => (
                                <tr key={index} class="dark:bg-dark60 text-lightText border-2 border-b-slate-600 dark:text-lightText dark:border-gray-600 p-1.5 hover:bg-light30 hover:dark:bg-dark30 mb-10">
                                    <td className="w-1/12 rounded-l-2xl ">{index + 1}</td>
                                    <td className="w-5/12 mx-auto">

                                        <div className="flex items-start">
                                            <img className="w-20 h-20 mb-2 mt-2" src="https://png.pngtree.com/element_our/png_detail/20180801/beautiful-cartoon-hand-painted-music-symbol-staff-png_51096.jpg" alt="img" />
                                            <div className="mt-2">
                                                <p className="ml-2 text-lightText font-bold">{s.song_name}</p>
                                                <p className="ml-2 text-lightTextSecondary">oke</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-1/12 ">{s.play_count}</td>
                                    <td className="w-4/12 ">{s.album}</td>
                                    <td className="w-1/12 rounded-r-2xl">{s.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultTemplate>
    );
}
