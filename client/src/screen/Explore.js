import DefaultTemplate from "../template/DefaultTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SongList from "../component/SongList";

function Explore() {
  const artist = [
    {
      name: "M TP",
      image:
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/2/23/882785/Son-Tung-Mtp.jpeg",
    },
    {
      name: "AMEE",
      image:
        "https://static-images.vnncdn.net/files/publish/2022/5/27/hain7580-102.jpg",
    },
    {
      name: "7dnight",
      image:
        "https://static.wixstatic.com/media/41a9b2_0c708f6344c84434839a9c4002a07a2b~mv2.png/v1/fill/w_980,h_980,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/41a9b2_0c708f6344c84434839a9c4002a07a2b~mv2.png",
    },
    {
      name: "Den",
      image:
        "https://thanhnien.mediacdn.vn/uploaded/hienht/2021_04_12/den-vau_TICF.jpg?width=500",
    },
  ];

  const genres = [
    {
      name: "Rock 'n' roll",
      image: "https://picsum.photos/200/300?image=1075",
    },
    {
      name: "Hiphop",
      image: "https://picsum.photos/200/300?image=1069",
    },
    {
      name: "Blues",
      image: "https://picsum.photos/200/300?image=1073",
    },
    {
      name: "RnB",
      image: "https://picsum.photos/200/300?image=1071",
    },
    {
      name: "Pop",
      image: "https://picsum.photos/200/300?image=1074",
    },
    {
      name: "Classical",
      image: "https://picsum.photos/200/300?image=1076",
    },
    {
      name: "Electronic",
      image: "https://picsum.photos/200/300?image=1072",
    },
    {
      name: "Country",
      image: "https://picsum.photos/200/300?image=1068",
    },
  ];

  const dataSearch = useSelector((state) => state.search.data);
  const dataLenght = useSelector((state) => state.search.dataLenght);

  console.log(dataLenght);

  return (
    <DefaultTemplate>
      {(!dataLenght) ? <div className="w-full min-h-screen items-center justify-center">
        <div className="container mx-auto">
          <h1 className="text-2xl p-4 font-bold">Genrer</h1>
        </div>
        <div className="container mx-auto flex flex-wrap">
          {genres.map((genre) => (
            <div className="card w-10 sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <img
                src={genre.image}
                alt={genre.name}
                className="rounded-lg mb-4 w-10/12"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {genre.name}
              </h3>
            </div>
          ))}
        </div>
        <div className="container mx-auto">
          <h1 className="text-2xl p-4 font-bold">Rising Artist</h1>
        </div>
      </div> : 
      <SongList/>
      }
      
    </DefaultTemplate>
  );
}

export default Explore;
