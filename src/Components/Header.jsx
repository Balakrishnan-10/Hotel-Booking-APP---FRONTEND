import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  Navbar,
  TextInput,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSignOutAlt, FaSun, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../Redux/Slice/ThemeSlice";
import { SignOutSuccess } from "../Redux/Slice/UserSlice";
import { CiLocationOn } from "react-icons/ci";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { HotelContext } from "../Context/SearchContext";

const Header = () => {
  const path = useLocation().pathname;
  const { CurrentUser } = useSelector((state) => state.Users);

  // Search Function context provider:
  const { setSearchQuery } = useContext(HotelContext);

  // Add the light and dark theme :
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Search function:
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // User Sign Out function :
  const handleSignOut = () => {
    dispatch(SignOutSuccess());
    localStorage.removeItem("Token");
    toast.success("You have Sign Out Successfully")
    navigate("/signin");
  };

  return (
    <Navbar className="border-b-4 border-lime-400 dark:bg-black">
      <Link
        to="/"
        className="hello self-center font-semibold whitespace-nowrap text-sm sm:text-xl dark:text-white"
      >
        <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-lime-600 via-lime-500 to-teal-300">
          Hotel
        </span>
        BOOKING
      </Link>
      <form >
        <TextInput
          icon={CiLocationOn}
          onChange={handleSearch}
          type="text"
          placeholder="Search location..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline dark:bg-white"
        />
      </form>
      <Button
        className="w-13 h-10 lg:hidden text-dark"
        gradientDuoTone="tealToLime"
        outline
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-13 h-10 hidden sm:inline"
          gradientDuoTone="tealToLime"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {CurrentUser ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="Users"
                  img={CurrentUser.Result.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header className="hover:bg-lime-300 dark:hover:text-black">
                <span className="block text-sm">
                  {CurrentUser.Result.username}
                </span>
              </Dropdown.Header>

              <Dropdown.Item className="hover:bg-lime-300">
                <MdEmail className="mr-2 mt-2" />
                <span className="block text-sm mt-2 font-semibold">
                  {CurrentUser.Result.email}
                </span>
              </Dropdown.Item>

              <Link to="/dashboard?tab=profile">
                <Dropdown.Item className="hover:bg-lime-300">
                  <FaUser className="mr-2" />
                  Profile
                </Dropdown.Item>
              </Link>
              <DropdownDivider />
              <Dropdown.Item className="hover:bg-lime-300" onClick={handleSignOut}>
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <Link to="signin">
            <Button gradientDuoTone="tealToLime" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {CurrentUser?.Result?.isAdmin ? (
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link
              to="/"
              className="hover:border-b-2 border-lime-500  text-lime-500"
            >
              Home
            </Link>
          </Navbar.Link>
        ) : <Navbar.Link active={path === "/userhome"} as={"div"}>
          <Link
            to="/userhome"
            className="hover:border-b-2 border-lime-500  text-lime-500 "
          >
            Home
          </Link>
        </Navbar.Link>}

        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link
            to="/about"
            className="hover:border-b-2 border-lime-500  text-lime-500"
          >
            About
          </Link>
        </Navbar.Link>
        {CurrentUser?.Result?.isAdmin ? (
          <Navbar.Link active={path === "/hotels"} as={"div"}>
            <Link
              to="/hotels"
              className="hover:border-b-2 border-lime-500  text-lime-500"
            >
              Hotels
            </Link>
          </Navbar.Link>
        ) : <Navbar.Link active={path === "/bookings"} as={"div"}>
          <Link
            to="/bookings"
            className="hover:border-b-2 border-lime-500  text-lime-500"
          >
            Bookings
          </Link>
        </Navbar.Link>}
        {/* {CurrentUser?.Result?.isAdmin && (
          <Navbar.Link active={path === "/edit/:id"} as={"div"}>
            <Link
              to="/edit/:id"
              className="hover:border-b-2 border-lime-500  text-lime-500"
            >
              Update Hotel
            </Link>
          </Navbar.Link>
        )} */}

      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
