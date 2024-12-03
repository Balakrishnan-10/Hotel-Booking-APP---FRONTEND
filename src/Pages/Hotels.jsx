import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hotels = ({ setHotelId }) => {
  const [hotel, setHotel] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [del, setDel] = useState([]);

  // Use Effext Hook :
  useEffect(() => {
    fetchData();
  }, [del]);

  // Fetch data and Diaplay cards :
  const fetchData = async () => {
    const res = await fetch("https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/all-hotels");
    const data = await res.json();
    setHotel(data);
    //console.log(data);
  };

  // Hotels Edit Function :
  const handleEdit = (id) => {
    setHotelId(id);
    navigate(`/edit/${id}`);
  };

  // Hotel details DELETE Function :
  const handleDelete = async (id) => {
    setShowModal(false);
    try {
      const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Token"),
        },
      });
      const data = await res.json();
      const result = setDel(data);
      toast.success(data.message)
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative my-6 mx-5 overflow-x-auto shadow-md sm:rounded-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm bg-black text-yellow-300 uppercase dark:bg-white dark:text-red-500">
          <tr>
            <th scope="col" className="px-3 py-3">
              Title
            </th>
            <th scope="col" className="px-3 py-3">
              Picture
            </th>
            <th scope="col" className="px-3 py-3">
              Location
            </th>
            <th scope="col" className="px-3 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {hotel.map((ele, index) => {
          return (
            <tbody key={index}>
              <tr className="bg-white border-b  text-gray-900  dark:text-white dark:bg-gray-800 dark:border-gray-700 hover:bg-red-200 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-3 py-4 font-medium whitespace-nowrap"
                >
                  {ele.title}
                </th>

                <td className="px-3 py-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={ele.image}
                    alt="Hotel image"
                  />
                </td>
                <td className="px-3 py-4">{ele.location}</td>
                <td className="px-3 py-4">{ele.category}</td>
                <td className="px-6 py-4">Rs.{ele.pricePerDay}/-</td>
                <td className="px-6 py-4 ">
                  <button
                    type="button"
                    size="xs"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                    onClick={() => {
                      handleEdit(ele._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    size="xs"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500"
                    onClick={() => setShowModal(true)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {
                <Modal
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  popup
                  size="md"
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto" />
                      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
                        Are you sure you want to delete this Hotel Details?
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button
                          gradientMonochrome="failure"
                          onClick={() => {
                            handleDelete(ele._id);
                          }}
                        >
                          Yes, I'm sure
                        </Button>
                        <Button
                          gradientMonochrome="info"
                          onClick={() => setShowModal(false)}
                        >
                          No, Changed My mind
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              }
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Hotels;
