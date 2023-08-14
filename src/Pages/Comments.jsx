import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

function Comments() {
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { imageId } = useParams();

  if (!token) {
    navigate('/login');
    return null;
  }

  const getComments = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/user/comments/${id}`);
      setComments(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getComments(imageId);
  }, [imageId]);



  return (
    <div className="flex justify-center mt-8">
      {loading ? <div className="flex justify-center"><Loader /></div> :
        (
          <div className="bg-white p-4 border rounded-md max-w-md">
            <img alt={comments?.username}
              className="w-full h-auto"
              src={comments?.image}
            />

            <div className="flex items-center mt-2">
              <h1 className="font-bold text-lg mr-2">{comments?.username}</h1>
              {comments?.likes?.length === 0 ? null :
                <p className="text-gray-600 text-sm">{comments?.likes?.length} {comments?.likes?.length === 1 ? 'like' : 'likes'}</p>}
            </div>

            <h1>{comments.caption}</h1>

            <div className="mt-2 max-h-80 overflow-y-auto">
              <h2 className="text-[gray] border-b py-1">Comments</h2>
              {comments?.comments?.length === 0 ? <h1 className="text-[gray]">no comments</h1> : (
                <div className="space-y-1">
                  {comments?.comments?.map(comment => (
                    <div key={comment._id}>
                      <p><strong className="font-semibold py-2">{comment.user}</strong>: {comment.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  )
}

export default Comments;
