import React from 'react';
import { hotelImages } from '../assets/assets';
import { Accordion } from "flowbite-react";
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className='container p-5'>

            <div className="align-items-center mt-2">
                <h2 className="text-center font-semibold text-4xl text-slate-900 dark:text-lime-500">About us Hotel Royal</h2>
                <br />
                <div className="row">
                    <p>
                        The front elevation of the building is a built in a semicircular curve running from the top of Prince of Wales Road into Bank Plain and has three gable ends incorporated into the curve all of which have further alternating brickwork decorative detailing. The front elevation at street level was constructed from stone masonry of a colour to match the brickwork, which begins at the first lift at ground floor level. The roof of the hotel was originally tiled with green slate.</p>
                </div>
                <br />
                <div className="row">
                    <p>
                        In 1951 Lisanevich opened the country's first hotel, The Hotel Royal with the Yak and Yeti Bar, in a converted Rana Palace with Prince Basundhara as his business partner.
                        A hotel in Kodaikanal that offers room service, a smoking area, and dry cleaning services.
                    </p>
                </div>
                <br />
                <div className="row text-center items-center justify-center">
                    <div className="col ">
                        <img src={hotelImages.hotel1} alt="" className="w-1/2 rounded items-center justify-center text-center inline" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <p>
                        Thank you for choosing Hotel Royal. We look forward to providing you with
                        a staying experience filled with creativity and aesthetic beauty.
                        Let's explore the boundless possibilities of Hotel Royal together!
                    </p>
                </div>


            </div>
            <Accordion className='mt-5'>
                <Accordion.Panel>
                    <Accordion.Title>Royal Hotel</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Rangalaya Royal Hotel: A boutique hotel in Vellore with a restaurant, banquet hall, and air-conditioned rooms
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out this guide to learn how to&nbsp;
                            <Link
                                href="https://flowbite.com/docs/getting-started/introduction/"
                                className="text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                get started&nbsp;
                            </Link>
                            and start developing websites even faster with components on top of Tailwind CSS.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Is there a Figma file available?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
                            has a design equivalent in our Figma file.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out the
                            <Link href="https://flowbite.com/figma/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                Figma design system
                            </Link>
                            based on the utility classes from Tailwind CSS and components from Flowbite.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>What are the differences between Flowbite and Tailwind UI?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            The main difference is that the core components from Flowbite are open source under the MIT license, whereas
                            Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
                            components, whereas Tailwind UI offers sections of pages.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
                            technical reason stopping you from using the best of two worlds.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                        <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                    Flowbite Pro
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://tailwindui.com/"
                                    rel="nofollow"
                                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                                >
                                    Royal Hotel
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

        </div>

    );
};

export default About;
