import { Navbar } from "flowbite-react";
import { location_list } from "../assets/assets";
import "../CSS/InnerNavbar.css";

const InnerNavbar = ({ location, setLocation }) => {
  return (
    <Navbar
      className="flex flex-col w-full overflow-x-auto gap-20 bg-lime-300 dark:text-black dark:bg-white mt-3"
      fluid
    >
      <div className=" hotel flex items-center justify-between gap-40">
        {location_list.map((ele, index) => {
          return (
            <div
              onClick={() =>
                setLocation((pre) =>
                  pre === ele.location_name ? "All" : ele.location_name
                )
              }
              key={index}
            >
              <img
                src={ele.location_image}
                className={location === ele.location_name ? "active" : ""}
                alt="location-image"
              />
              <p className="text-center mt-2">{ele.location_name}</p>
            </div>
          );
        })}
      </div>
    </Navbar>
  );
};

export default InnerNavbar;
