import { Button, Card } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GiGymBag } from "react-icons/gi";
import { Link } from "react-router-dom";
import InnerNavbar from "../Components/InnerNavbar";
import { useSelector } from "react-redux";
import { HotelContext } from "../Context/SearchContext";

const UserHome = () => {
  const { CurrentUser } = useSelector((state) => state.Users);
  const { hotels, searchQuery } = useContext(HotelContext);
  const [location, setLocation] = useState("All");
  const [filteredHotels, setFilteredHotels] = useState([]); // Use state for filtered hotels
  
  useEffect(() => {
    if (Array.isArray(hotels) && hotels !== null) {
      const newFilteredHotels = hotels.filter((hotel) => {
        if (hotel && hotel.title) {
          return hotel.title.toLowerCase().includes(searchQuery.toLowerCase())
        }
        return false;
      });
      setFilteredHotels(newFilteredHotels);
    } else {
      console.error("hotels is not an array or is null:", hotels);
      setFilteredHotels([]);
    }
  }, [hotels, searchQuery, location]);
  
  console.log(filteredHotels)
  return (
    <div>
      <InnerNavbar location={location} setLocation={setLocation} />
      <section className="w-5/6 my-10 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-16 overflow-x-auto">
        {filteredHotels?.length > 0 ? (<>{filteredHotels?.map((ele, index) => {
          if (location === "All" || location === ele.location) {
            return (
              <div key={index}>
                <Card
                  className="max-w-lg transform hover:scale-110 duration-100 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80"
                  imgSrc={ele.image}
                  horizontal
                >
                  <div className="flex justify-between">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {ele.title}
                    </h5>
                    <Link to="/compareHotels"><Button size="xs" gradientMonochrome="lime">Compare $</Button> </Link>
                  </div>
                  <div className="flex items-center mt-2.5 mb-5">
                    <h6 className="text-sm me-5 mt-2 font-thin tracking-tight text-gray-900 dark:text-white inline-flex">
                      <CiLocationOn className="size-6 my-0" /> {ele.location}
                    </h6>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      {ele.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      Rs.{ele.pricePerDay}/-
                    </span>
                    <Link to={CurrentUser ? `/create-booking/${ele._id}` : "/signin"} className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Book Now
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <GiGymBag className="size-6 my-0 me-2" />
                    {ele.amenities}
                  </div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {ele.description}
                  </p>
                  <Button gradientMonochrome="teal"><Link to={`/hotelpage/${ele._id}`}>View Details</Link></Button>
                </Card>

              </div>
            );
          }
        })}</>) : (<div>No hotels found</div>)}

      </section>
    </div>
  );
};

export default UserHome;