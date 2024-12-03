import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../Components/CommentSection';

const HotelPage = () => {
    const [hotelById, setHotelById] = useState([]);
    const { id } = useParams();
    //console.log(id)

    // Fetch hotel details when the component mounts or the ID changes
    useEffect(() => {
        fetchHotelDetail();
    }, [id]);

    // Fetch data and Diaplay cards :
    const fetchHotelDetail = async () => {
        const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/hotel/single/${id}`);
        const data = await res.json();
        //console.log(data)
        setHotelById(data);
    };
    return (
        
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-16 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div className='p-3 border-r-2 border-lime-400'>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{hotelById?.result?.title}</h2>
                    <p className="mt-4 text-gray-500">{hotelById?.result?.description}</p>
                    <p className="mt-4 text-2xl text-black">Location : {hotelById?.result?.location}</p>

                    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        <img src={hotelById?.result?.image} alt="hotel Image" className="rounded-lg h-56 w-auto bg-gray-100" />
                        <div className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900" >Price : $ {hotelById?.result?.pricePerDay}</dt>
                            <dd className="mt-2 text-sm font-medium text-gray-500"><strong>Category :</strong> {hotelById?.result?.category}</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Amenities :</dt>
                            <dd className="mt-2 text-sm text-gray-500">{hotelById?.result?.amenities}</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Rating :</dt>
                            <dd className="mt-2 text-sm text-gray-500">{hotelById?.result?.rating}</dd>
                        </div>
                    </dl>
                </div>
                <CommentSection id={id} />
            </div>
        
    );
};

export default HotelPage;