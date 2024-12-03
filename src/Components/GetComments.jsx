import { Button, Textarea } from 'flowbite-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const GetComments = ({ comment, onLike, onEdit ,onDelete }) => {
    const { CurrentUser } = useSelector((state) => state.Users);
    const [user, setUser] = useState({});
    //console.log(user) checking purpose :
    const [edit, setEdit] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    // USeEffect Hook:
    useEffect(() => {
        getUser();
    }, [comment])

    // Get User by Id :
    const getUser = async () => {
        try {
            const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/user/${comment.userId}`);
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    // Edit Comments : 
    const handleEdit = async () => {
        setEdit(true);
        setEditContent(comment.content);
    }

    // Save the comment function:
    const handleSave = async () => {
        try {
            const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/comments/edit/${comment._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    'token': localStorage.getItem("Token"),
                },
                body: JSON.stringify({ content: editContent })
            });
            if (res.ok) {
                setEdit(false);
                onEdit(comment, editContent)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='flex p-4 border-b border-lime-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className="w-10 h-10 rounded-full" src={user?.profilePicture} alt={user.username} />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 test-xs dark:text-black truncate'>{user ? `@${user?.username}` : "Anonymous User"}</span>
                    <span className='text-gray-500 test-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {
                    edit ? (
                        <>
                            <Textarea
                                className='mb-2'
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <div className='flex justify-end gap-2 text-xs'>
                                <Button
                                    type='button'
                                    size='sm'
                                    gradientDuoTone='tealToLime'

                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                                <Button
                                    type='button'
                                    size='sm'
                                    gradientDuoTone='tealToLime'
                                    outline
                                    onClick={() => setEdit(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <> <p className='pb-2 text-gray-600'>{comment.content}</p>
                            <div className='flex items-center pt-2 text-xs
                        border-t dark:border-gray-700 max-w-fit gap-2'>
                                <button type="button" onClick={() => onLike(comment._id)}
                                    className={`text-gray-500 hover:text-blue-500
                            ${CurrentUser && comment.likes.includes(CurrentUser.Result._id) && '!text-blue-500'}`}>
                                    <FaThumbsUp className='text-sm' />
                                </button>
                                <p> {
                                    comment.numberOfLikes > 0 && comment.numberOfLikes + " " +
                                    (comment.numberOfLikes === 1 ? "like" : "likes")
                                }
                                </p>

                                <button
                                    type='button'
                                    onClick={handleEdit}
                                    className='text-gray-400 hover:text-blue-600'
                                >
                                    Edit
                                </button>
                                <button
                                   onClick={()=>onDelete(comment._id)}
                                    type='button'
                                    className='text-gray-400 hover:text-red-600'
                                >
                                    Delete
                                </button>
                            </div>
                            </>
                    )
                }

            </div>
        </div>
    );
};

export default GetComments;