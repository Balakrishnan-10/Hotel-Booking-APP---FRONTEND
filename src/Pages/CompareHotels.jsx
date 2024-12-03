import React, { useContext, useEffect, useState } from 'react';
import { HotelContext } from '../Context/SearchContext';
import { Card, Label, Select } from 'flowbite-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompareHotels = () => {
    const { hotels } = useContext(HotelContext);
    const [hotel1, setHotel1] = useState({});
    const [hotel2, setHotel2] = useState({});
    const [hotel1Id, setHotel1Id] = useState('');
    const [hotel2Id, setHotel2Id] = useState('');
    //console.log(hotels)

    useEffect(() => {
        if (hotel1Id) {
            fetchHotelDetail1();
        }
    }, [hotel1Id]);

    useEffect(() => {
        if (hotel2Id) {
            fetchHotelDetail2();
        }
    }, [hotel2Id]);

    // Fetch Hotel 1 data :
    const fetchHotelDetail1 = async () => {
        try {
            const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/single/${hotel1Id}`);
            const data = await res.json();
            setHotel1(data);
          //  console.log(data)
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch Hotel 2 data :
    const fetchHotelDetail2 = async () => {
        try {
            const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/single/${hotel2Id}`);
            const data = await res.json();
            setHotel2(data);
           // console.log(data)
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleHotel1Change = (e) => {
        setHotel1Id(e.target.value);
    };

    const handleHotel2Change = (e) => {
        setHotel2Id(e.target.value);
    };

    return (
        <>
            <div className="p-3 max-w-4xl mx-auto min-h-screen">
                <h1 className="text-center text-4xl my-7 font-bold">
                    Hotel Price Comparison
                </h1>
                <div
                    className="flex flex-col gap-5 border-2 rounded-md border-lime-300 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 p-8" >
                    <div className="flex flex-col gap-4 sm:flex-row justify-between">

                        <div className='flex-1'>
                            <Label className="font-semibold text-md" value="Hotel 1" />
                            <Select value={hotel1Id} onChange={handleHotel1Change}>
                                <option value="">Select Hotel </option>
                                {hotels?.map(hotel => (
                                    <option key={hotel._id} value={hotel._id}>{hotel.title}</option>
                                ))}
                            </Select></div>
                        <div className='flex-1'>
                            <Label className="font-semibold text-md" value="Hotel 2" />
                            <Select value={hotel2Id} onChange={handleHotel2Change}>
                                <option value="">Select Hotel </option>
                                {hotels?.map(hotel => (
                                    <option key={hotel._id} value={hotel._id}>{hotel.title}</option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    {hotel1?.result?.title && hotel2?.result?.title && (
                        <div className="flex flex-col gap-4 sm:flex-row justify-between">
                            <Card
                                className="max-w-sm bg-white rounded-md shadow-md p-4 w-full sm:w-1/2"
                                imgAlt="Hotel Image"
                                imgSrc={hotel1?.result?.image}
                            >
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {hotel1?.result?.title}
                                </h5>
                                <p className="font-semibold text-blue-700 dark:text-gray-400">
                                    Price : $ {hotel1?.result?.pricePerDay}
                                </p>
                                <p className="font-semibold text-gray-700 dark:text-gray-400">
                                    Category :  {hotel1?.result?.category}
                                </p>

                                <p className="font-semibold text-gray-700 dark:text-gray-400">
                                    Rating :  {hotel1?.result?.rating}
                                </p>
                                <p className="font-semibold text-gray-700 dark:text-gray-400">
                                    Location :  {hotel1?.result?.location}
                                </p>
                            </Card>
                            <Card
                                className="max-w-sm bg-white rounded-md shadow-md p-4 w-full sm:w-1/2"
                                imgAlt="Hotel Image"
                                imgSrc={hotel2?.result?.image}
                            >
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {hotel2?.result?.title}
                                </h5>
                                <p className="font-semibold text-blue-700 dark:text-gray-400">
                                    Price : $ {hotel2?.result?.pricePerDay}
                                </p>
                                <p className="font-semibold text-gray-700 dark:text-gray-400">
                                    Category :  {hotel2?.result?.category}
                                </p>

                                <p className="font-semibold text-gray-700 dark:text-gray-400">
                                    Rating :  {hotel2?.result?.rating}
                                </p>
                                <p className="font-semibold text-gray-700 dark:text-gray-400">
                                    Location :  {hotel2?.result?.location}
                                </p>
                            </Card>

                        </div>
                    )}
                    {hotel1?.result?.pricePerDay < hotel2?.result?.pricePerDay && (
                        <h1 className='flex text-2xl justify-center font-bold bg-lime-400  rounded p-3'>{hotel1?.result?.title} is cheaper by $ {hotel2?.result?.pricePerDay - hotel1?.result?.pricePerDay}</h1>
                    )}
                    {hotel2?.result?.pricePerDay < hotel1?.result?.pricePerDay && (
                        <h1 className='flex text-2xl justify-center font-bold bg-lime-400  rounded p-3'>{hotel2?.result?.title} is cheaper by $ {hotel1?.result?.pricePerDay - hotel2?.result?.pricePerDay}</h1>
                    )}
                </div>
            </div>
        </>
    )
};

export default CompareHotels;