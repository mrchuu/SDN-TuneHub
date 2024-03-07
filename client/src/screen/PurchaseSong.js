import { useSelector } from "react-redux";
import DefaultTemplate from "../template/DefaultTemplate";

export default function PurchaseSong({ song }) {
  const purchaseSong = useSelector((state) => state.purchase.song);
  return (
    <DefaultTemplate>
      <div className="min-h-screen w-full">
        <h1 className="text-lightText dark:text-darkText text-2xl font-semibold pl-6">
          Purchase
        </h1>
        <hr style={{ height: "2px" }} className="bg-neutral-600/50 my-2 mx-6" />
        {purchaseSong ? (
          <div className="mx-6 flex">
            <div className="w-2/5">
              <img
                className="h-80 w-80 object-cover object-center mx-auto rounded-lg mt-8 border-2 border-light10/50 dark:border-dark10/50"
                src={purchaseSong.cover_image}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </DefaultTemplate>
  );
}
