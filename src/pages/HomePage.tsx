import { FC, useEffect, useState } from "react";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

 
const HomePage: FC = () => {

  const [search, setSearch] = useState('Viacheslav-ua')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search, 500)

  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length <= 3
  })

  const [fetchRepos, responseRepos] = useLazyGetUserReposQuery()
  

  useEffect(() => {
     setDropdown(debounced.length > 3 && data?.length! > 0 ? true : false) 
  }, [debounced, data])

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  const clickHandler = (username: string): void => {
    fetchRepos(username)
    setDropdown(false)
  }
  

  return (
    <div className="flex justify-center px-10 mx-auto h-screen w-screen">
     {isError && <p className="text-center text-red-600">
      Something went wrong ...
      </p>}

      <div className="relative w-[560px]">
        <input 
          className="border py-2 px-4 w-full h-[42px] mb-2 mt-2" 
          placeholder="Search for github username" 
          type="text" 
          value={search}
          onChange={changeSearchHandler}
        />

        {dropdown && <ul className="absolute list-none top-[42px]0 left-0 ring-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
          {isLoading && <p className="text-center text-3xl font-bold">Loading...</p>}
          {data?.map(user => (
            <li onClick={() => clickHandler(user.login)} key={user.id} className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer">
              {user.login}
              </li>
          ))}
        </ul>}
        <div className="container">
        {responseRepos.isLoading && <p className="text-center text-3xl font-bold">Loading...</p>}
        {responseRepos.data?.map(repo => <RepoCard repo={repo} key={repo.id} />)}

      </div>
      </div>

    </div>
  );
}
 
export default HomePage;