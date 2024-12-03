import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInformationCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GetComments from "./GetComments";
import { Modal } from "flowbite-react";

const CommentSection = ({ id }) => {
    const { CurrentUser } = useSelector((state) => state.Users);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [formdata] = useState({
        userId: CurrentUser?.Result?._id,
        hotelId: id,
    });

    // GetComments State:
    const [comments, setComments] = useState([]);
    //console.log(comments) Checking purpose

    // Comment delete States :
    const [showModal, setShowModal] = useState(false);
    const [deleteComment, setDeleteComment] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate comment length
        if (comment.length > 200) {
            alert('Comment cannot exceed 200 characters');
            return;
        }

        try {
            // Create a new comment
            const newComment = {
                content: comment,
                ...formdata
            };

            // Send a POST request to create a new comment
            const response = await fetch('https://hotel-booking-app-backend-yjvv.onrender.com/api/comments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('Token'),
                },
                body: JSON.stringify(newComment),
            });

            // Parse the response data
            const data = await response.json();
            console.log(data);
            // Reset the comment field
            setComment('');
            setCommentError(null);
            setComments([data, ...comments]);
        } catch (error) {
            setCommentError(error.message)
        }
    };

    // UseEffect Hook:
    useEffect(() => {
        fetchComments();
    }, [id]);

    // Get Comments function:
    const fetchComments = async () => {
        try {
            const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/comments/getHotelComments/${id}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {

        }
    }

    // Like comments function:
    const handleLike = async (commentId) => {
        try {
            const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/comments/likeComments/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'token': localStorage.getItem("Token"),
                }
            });

            // Check if the response is OK
            if (res.ok) {
                const data = await res.json();

                // Update the comments state with the new like data
                setComments(
                    comments?.map((comment) =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                likes: data.likes,
                                numberOfLikes: data.numberOfLikes,
                            }
                            : comment
                    )
                );
            }
            console.log(commentId)
        } catch (error) {
            console.log(error.message);
        }
    };

    // Comment Edit function:
    const handleEdit = async (comment, editContent) => {
        setComments(
            comments?.map((c) =>
                c._id === comment._id ? { ...c, content: editContent } : c)
        )
    }

    // Comment delete function:
    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!CurrentUser) {
                navigate('/signin')
            }
            const res = await fetch(`https://hotel-booking-app-backend-yjvv.onrender.com/api/comments/delete/${commentId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'token': localStorage.getItem("Token"),
                },
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId))
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {
                CurrentUser ? (
                    <div className="flex items-center gap-1 my-5
                    text-sm text-gray-500" >
                        <p>Signed in as :</p>
                        <img className="w-5 h-5 object-cover rounded-full" src={CurrentUser.Result.profilePicture} alt="" />
                        <Link to="/dashboard?tab=profile" className="text-xs text-cyan-600 hover:underline">@{CurrentUser.Result.username} </Link>
                    </div>
                ) : (
                    <div className="text-sm text-teal-500 my-5">
                        You must be signed in to review.
                        <Link to={'/signin'} className="hover:underline ms-3 text-blue-500">Sign In</Link>
                    </div>
                )}
            {CurrentUser && (
                <form onSubmit={handleSubmit} className="border border-lime-500 p-3 rounded-md">
                    <Textarea
                        placeholder="Add your review.."
                        rows={3}
                        maxLength={200}
                        onChange={(e) => setComment(e.target.value)} value={comment} />

                    <div className="flex justify-between items-center mt-5">
                        <p className="text-gray-600 text-sm">{200 - comment.length} character remaining </p>
                        <Button type="submit" gradientDuoTone="tealToLime">Submit</Button>
                    </div>
                    {commentError && (
                        <Alert
                            className="mt-2"
                            color="failure"
                            withBorderAccent
                            icon={HiInformationCircle}
                        >
                            <span className="font-medium">OOPS! </span> {commentError}
                        </Alert>
                    )}
                </form>
            )}
            {comments.length === 0 ? (
                <p className="text-sm my-5">No Comments Yet!</p>
            ) : (
                <>
                    <div className="text-sm my-5 flex items-center gap-1">
                        <p className="dark:text-black">Comments</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">
                            <p className="dark:text-black">{comments.length}</p>
                        </div>
                    </div>
                    {comments?.map((comment) => (
                        <GetComments
                            key={comment._id}
                            comment={comment}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                                setShowModal(true)
                                setDeleteComment(commentId)
                            }}
                            onLike={handleLike} />
                    ))}
                </>
            )}
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
                            Are you sure you want to delete this Comment?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button gradientMonochrome="failure" onClick={() => handleDelete(deleteComment)}>
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
        </div>
    );
};

export default CommentSection;