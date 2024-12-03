import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const UserTable = () => {
    const [users, setUsers] = useState();

    // Use Effext Hook :
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data and Diaplay cards :
    const fetchData = async () => {
        const res = await fetch("https://hotel-booking-app-backend-yjvv.onrender.com/api/user/all-users");
        const data = await res.json();
        setUsers(data);
        console.log(data);
    };

    return (
        <>
            <div className='table-auto overflow-x-scroll md:mx-auto  p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
                <Table hoverable className='shadow-md'>
                    <Table.Head className="dark:text-yellow-300">
                        <Table.HeadCell>Date created</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Admin</Table.HeadCell>
                    </Table.Head>
                    {users?.map((ele) => (
                        <Table.Body className='divide-y' key={ele._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                    {new Date(ele.createdAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>{ele.username}</Table.Cell>
                                <Table.Cell>{ele.email}</Table.Cell>
                                <Table.Cell>
                                    {ele.isAdmin ? (
                                        <FaCheck className='text-green-500' />
                                    ) : (
                                        <FaTimes className='text-red-500' />
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>

        </>
    );
};

export default UserTable;

