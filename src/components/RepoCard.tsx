import { FC, useState } from "react";
import { IRepos } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

interface RepoCardProps {
  repo: IRepos
}

const RepoCard: FC<RepoCardProps> = ({repo}) => {

const { addFavorite, removeFavorite } = useActions()
const { favorites } = useAppSelector(store => store.github)
const [isFavorite, setIsFavorite] = useState(favorites.includes(repo.html_url))

const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  addFavorite(repo.html_url)
  setIsFavorite(true)
}
const RemoveFromFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  removeFavorite(repo.html_url)
  setIsFavorite(false)
}

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm ">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="font-thin text-sm">
          {repo?.description}
        </p>
        {isFavorite || <button 
          className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
          onClick={addToFavorite}
        >Add</button>}
        {isFavorite && <button 
          className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          onClick={RemoveFromFavorite}
        >Remove</button>}
      </a>
    </div>
  );
}
 
export default RepoCard;