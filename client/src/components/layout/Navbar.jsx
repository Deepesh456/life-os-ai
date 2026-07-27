import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-20 bg-white shadow flex items-center justify-between px-8">
      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-6">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
        </div>

        <FaBell className="text-2xl cursor-pointer hover:text-yellow-500 transition" />

        <FaUserCircle className="text-3xl cursor-pointer text-purple-600" />
      </div>
    </div>
  );
};

export default Navbar;