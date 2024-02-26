import { Link } from "react-router-dom";
function Item({data}) {
  return (
    <Link to={`/`} className="">
      <div className="">
        <p className="text-sm font-medium text-gray-900">{data.song_name}</p>
      </div>
    </Link>
  );
}

export default Item;
