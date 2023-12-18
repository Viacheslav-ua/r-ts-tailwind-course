import { FC } from "react";
import { Link } from "react-router-dom";

 
const Navigation: FC = () => {
  return (
    <nav className="flex justify-between items-center h-14 px-5 shadow-md bg-gray-500 text-white">
      <h3 className="font-bold text-xl">Github search</h3>

      <span className="text-xl">
        <Link className="mr-4" to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </span>
      
    </nav>
  );
}
 
export default Navigation;