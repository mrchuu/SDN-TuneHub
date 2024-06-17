import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DefaultTemplate from "../template/DefaultTemplate";
import PerformRequest from "../utilities/PerformRequest";

export default function PurchaseSong() {
  const { OriginalRequest } = PerformRequest();
  const { songId } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await OriginalRequest(`songs/detailSong/${songId}`, "GET");
        if (response && response.data && response.data.length > 0) {
          setSong(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    };
    fetchSong();
  }, [songId]);

  const handlePayment = async () => {
    try {
      if (!song) {
        return;
      }
      const vnpayUrl = await OriginalRequest("payment/create_payment_url", "POST", {
        amount: song.price,
        bankCode: "NCB",
        songId: song._id,
        language: "en",
      });
      if (vnpayUrl) {
        window.location = vnpayUrl.data;
      }
    } catch (error) {
      console.error("Error creating payment URL:", error);
    }
  };

  return (
    <DefaultTemplate>
      <div className="min-h-screen w-full">
        <h1 className="text-lightText dark:text-darkText text-2xl font-semibold pl-6">
          Purchase
        </h1>
        <hr style={{ height: "2px" }} className="bg-neutral-600/50 my-2 mx-6" />
        {song ? (
          <div className="mx-6 flex">
            <div className="w-1/2">
              <img
                className="h-72 w-72 object-cover object-center mx-auto rounded-lg mt-8 border-2 border-light10/50 dark:border-dark10/50"
                src={song.cover_image}
              />
            </div>
            <div className="w-1/2 pr-5">
              <h4 className="text-lightText dark:text-darkText text-xl font-semibold mt-8">
                Song's Info
              </h4>

              <div className="flex items-center justify-between">
                <div className="w-3/12">
                  <h4 className="text-lightText dark:text-darkText text-lg mt-4">
                    Title
                  </h4>
                  <hr
                    style={{ height: "2px", opacity: "0.2" }}
                    className="bg-neutral-700 dark:bg-neutral-300 my-2"
                  />
                  <h4 className="text-lightText dark:text-darkText text-lg mt-2">
                    From
                  </h4>
                  <hr
                    style={{ height: "2px", opacity: "0.2" }}
                    className="bg-neutral-700 dark:bg-neutral-300 my-2"
                  />
                  <h4 className="text-lightText dark:text-darkText text-lg mt-2">
                    Genre{" "}
                  </h4>
                  <hr
                    style={{ height: "2px", opacity: "0.2" }}
                    className="bg-neutral-700 dark:bg-neutral-300 my-2"
                  />
                  <h4 className="text-lightText dark:text-darkText text-lg mt-2">
                    Price{" "}
                  </h4>
                </div>
                <div className="w-9/12">
                  <h4 className="text-lightText dark:text-darkText text-lg mt-4 text-right">
                    {song.song_name}
                  </h4>
                  <hr
                    style={{ height: "2px", opacity: "0.2" }}
                    className="bg-neutral-700 dark:bg-neutral-300 my-2"
                  />
                  <h4 className="text-lightText dark:text-darkText text-lg mt-2 text-right">
                    {song.artist}
                  </h4>
                  <hr
                    style={{ height: "2px", opacity: "0.2" }}
                    className="bg-neutral-700 dark:bg-neutral-300 my-2"
                  />
                  <h4 className="text-lightText dark:text-darkText text-lg mt-2 text-right">
                    {song.genre ? song.genre : "NaN"}
                  </h4>
                  <hr
                    style={{ height: "2px", opacity: "0.2" }}
                    className="bg-neutral-700 dark:bg-neutral-300 my-2"
                  />
                  <h4 className="text-lightText dark:text-darkText text-lg mt-2 text-right">
                    {new Intl.NumberFormat("en-US").format(song.price)}{" "}
                    vnd
                  </h4>
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={handlePayment}
                  className="bg-light10 dark:bg-dark10 text-lightText px-4 py-2 rounded-md mt-6"
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </DefaultTemplate>
  );
}

