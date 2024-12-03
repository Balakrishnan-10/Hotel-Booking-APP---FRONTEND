import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hotelImages } from '../assets/assets';

const StartingPage = () => {
    const { CurrentUser } = useSelector((state) => state.Users);

    return (
      <>
        <div className='bg-lime-100'>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
          <h1 className='text-3xl font-bold lg:text-6xl dark:text-black'>Welcome to <span className='text-lime-500 lg:text-7xl'>Hotel Booking App</span></h1>
          <p className='text-gray-600 text-xl sm:text-xl'>
          Using photographs that feature unique views as well as some of the amenities, the visitor gets an immediate sense of what their own experience at this hotel might be like. 
          The bonus is that potential guests need only scroll once to see a list of available room types.
          </p>
          <Link
            to={CurrentUser?.Result?.isAdmin ? "/admin" : "/userhome"}
            className='text-xs sm:text-sm text-teal-500 font-bold '
          >
            <Button className='font-semibold' gradientDuoTone='tealToLime'>Get Started</Button>
          </Link>        
        </div>
       </div>
        </>
    );
};

export default StartingPage;