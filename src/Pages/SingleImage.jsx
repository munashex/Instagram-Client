import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { InfinitySpin } from 'react-loader-spinner';

function SingleImage() {
  const navigate = useNavigate();
  const { imageId } = useParams();
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login');
    return null;
  }

  const getImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://instagram-backend-onig.onrender.com/post/image/${imageId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setImage(response.data.image);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getImage();
  }, [imageId]);

  const deleteImage = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://instagram-backend-onig.onrender.com/post/image/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        navigate('/profile');
        return;
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center mt-12 mb-40">
      {loading ? <div className="flex justify-center"><Loader /></div> :
        (
          <div className="bg-white p-4 border rounded-md max-w-md">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-lg">{image?.username}</h1>
              <button onClick={() => deleteImage(image?._id)}>
                {loading ? (
                  <InfinitySpin width="24" color="red" />
                ) : (
                  <RiDeleteBin4Line size={24} color="red" />
                )}
              </button>
            </div>
            
            <img alt={image?.username}
              className="w-full h-auto mt-2"
              src={image?.image}
            />

            <div className="flex items-center mt-2">
              {image?.likes?.length === 0 ? null :
                <p className="text-gray-600 text-sm">{image?.likes?.length} {image?.likes?.length === 1 ? 'like' : 'likes'}</p>}
            </div>

            <h1>{image?.caption}</h1>

            <div className="mt-2 max-h-80 overflow-y-auto">
              <h2 className="text-[gray] border-b py-1">Comments</h2>
              {image?.comments?.length === 0 ? <h1 className="text-[gray]">no comments</h1> : (
                <div className="space-y-1">
                  {image?.comments?.map(comment => (
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
  );
}

export default SingleImage;
