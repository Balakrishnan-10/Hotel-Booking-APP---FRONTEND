import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Button, Label, TextInput } from 'flowbite-react'; import axios from 'axios';

const Bookings = () => {
    const [booked, setBooked] = useState([]);
    const { CurrentUser } = useSelector((state) => state.Users);
    const { _id, createdAt, checkindate, checkoutdate, phone, roomType, hotel } = booked;
    const [bookingId, setBookingId] = useState('');

    //console.log(bookingId)
    // const [hotelId,setHotelId] = useState() //This state is used for get hotelId.
    // const [hotelTitle,setHotelTitle] = useState("")
    // const [hotelImage,setHotelImage] = useState("")
    // const [hotelPrice,setHotelPrice] = useState(0)
    //console.log(hotelTitle,hotelImage,hotelPrice)

    // UseEffect Hook:
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch("https://hotel-booking-app-backend-yjvv.onrender.com/api/booking/get-booking");
            const data = await res.json();
            // setHotelId(data.hotel[0]._id) 
            // setHotelTitle(data.hotel[0].title)
            // setHotelImage(data.hotel[0].image)
            // setHotelPrice(data.hotel[0].pricePerDay)
            if (!res.ok) {
                toast.error(data.message);
            } else {
                setBooked(data);
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

    };

    const handlePayment = async () => {
        try {
            const response = await axios.post('https://hotel-booking-app-backend-yjvv.onrender.com/api/payment/checkout', { bookingId:bookingId });
            //console.log(response);
            if(response.status === 200) {
            const {session_url} = response.data;
            window.location.replace(session_url);
            }else {
                alert("Error");
              }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <div
                className="flex mt-5 mx-auto max-w-2xl flex-col gap-5 border-2 rounded-md border-lime-300 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 p-8" >
                  <p className="text-gray-500 dark:text-gray-400">
                                                Copy and Paste the BookingID then proceed the Payment section !!!
                                            </p>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <div className='flex-1'>
                        <Label className="font-semibold text-md" value="Booking ID :" />
                        <TextInput type="text" className='me-16 h-16'
                            value={bookingId}
                            onChange={(e) => setBookingId(e.target.value)}
                            placeholder="Enter booking ID" />
                          
                    </div>
                    <div className='flex-1'>
                        <Button onClick={handlePayment} size="md" className="text-white bg-gradient-to-r mt-4 font-semibold from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" gradientMonochrome="blue">CHECKOUT PROCEED</Button>
                    </div>
                </div>
            </div>

            {CurrentUser ? (<>  <div className='flex mt-5 mx-5'>
                <h1 className='text-3xl font-semibold'>Great! Your stay is confirmed.</h1>
            </div>
                <section className="py-3 bg-white md:py-8 dark:bg-gray-900 antialiased">
                    {hotel?.map((ele) => {
                        return (
                            <div key={ele._id} className=' mx-5 py-5 shadow-lg border border-lime-400 rounded-md'>


                                <h1
                                    className="ms-5 mb-3 text-md font-semibold text-gray-900 sm:text-2xl dark:text-white"
                                >
                                    Booking ID : {_id}
                                </h1>

                                <span
                                    className="ms-5 text-gray-900 sm:text-2xl dark:text-white"
                                >
                                    Location : {ele.location}
                                </span>
                                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                                        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                                            <img className="w-full rounded-md shadow-xl mt-24" src={ele.image} alt="hotelImage" />
                                        </div>

                                        <div className="mt-6 sm:mt-8 lg:mt-0">

                                            <h1
                                                className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                                            >
                                                Title : <span className='text-3xl'>{ele.title}</span>
                                            </h1>
                                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex py-2.5 border-b border-gray-200">
                                                <p
                                                    className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                                >
                                                    Price : $ {ele.pricePerDay}
                                                </p>


                                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                                    <div className="flex items-center gap-1">
                                                        <svg
                                                            className="w-4 h-4 text-yellow-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <p
                                                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                                    >
                                                        ({ele.rating})
                                                    </p>
                                                    {/* <a
              href="#"
              class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
          >
              345 Reviews
          </a> */}
                                                </div>
                                            </div>

                                            <div className="flex justify-between mt-3 " >
                                                <div
                                                    className="cursor-pointer text-gray-600 dark:text-gray-400 "

                                                >
                                                    Primary Guest
                                                </div>
                                                <div
                                                    className="cursor-pointer text-gray-600 dark:text-gray-400 "

                                                >
                                                    Check-In
                                                </div>
                                                <div className="cursor-pointer text-gray-600 dark:text-gray-400 " >
                                                    Check-Out
                                                </div>
                                            </div>

                                            <div className="flex justify-between mt-3">
                                                <span
                                                    className="cursor-pointer text-black dark:text-white"

                                                >
                                                    {CurrentUser.Result.username}
                                                </span>
                                                <span
                                                    className="cursor-pointer text-black dark:text-white"

                                                >
                                                    {checkindate}
                                                </span>
                                                <span className="cursor-pointer text-black dark:text-white" >
                                                    {checkoutdate}
                                                </span>
                                            </div>

                                            <div className="flex justify-between  mt-8">
                                                <span
                                                    className="cursor-pointer  text-gray-600 dark:text-gray-400 "

                                                >
                                                    Mobile Number
                                                </span>
                                                <span
                                                    className="cursor-pointer  text-gray-600 dark:text-gray-400 "

                                                >
                                                    Email
                                                </span>
                                                <span className="cursor-pointer text-gray-600 dark:text-gray-400 " >
                                                    1 Room
                                                </span>

                                            </div>

                                            <div className="flex justify-between mt-3 sm:flex-row-1">
                                                <div
                                                    className="cursor-pointer text-black sm:flex-row-1 dark:text-white"

                                                >
                                                    {phone}
                                                </div>
                                                <div
                                                    className="cursor-pointer text-black dark:text-white"

                                                >
                                                    {CurrentUser.Result.email}
                                                </div>
                                                <div className="cursor-pointer text-black dark:text-white" >
                                                    {roomType}
                                                </div>
                                            </div>


                                            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                                            <p className="mb-3  text-black-500 dark:text-white">
                                                <span className='font-semibold'>Amenities :</span> {ele.amenities}
                                            </p>
                                            <p className="mb-3 font-semibold text-black-500 dark:text-white">
                                                Description :
                                            </p>

                                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                                {ele.description}
                                            </p>

                                            <p className="mt-3  text-black-500 dark:text-white font-semibold">
                                                Booked By {CurrentUser.Result.username} {new Date(createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </section></>) : (<p className="text-sm my-5">No Bookings Yet!</p>)}

        </>

    );
};

export default Bookings;