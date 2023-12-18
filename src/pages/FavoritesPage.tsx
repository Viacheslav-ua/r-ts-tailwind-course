import {FC} from "react";
import {useAppSelector} from "../hooks/redux";

const FavoritesPage: FC = () => {
  const {favorites} = useAppSelector((state) => state.github);

  if (favorites.length === 0) 
    return <p className="text-center">No items.</p>;
  
  return (
  <div className="flex justify-center px-10 mx-auto h-screen w-screen">
    <ul className="list-none ">
      {
        favorites.map((item) => (<li key={item}>
          <a href={item} target="_blank">
            {item}
          </a>
        </li>))
      }
    </ul>
  </div>
  );
};

export default FavoritesPage;
