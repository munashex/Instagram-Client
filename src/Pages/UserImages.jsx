import React, { useEffect, useState } from 'react'; // Added the import for useEffect and useState
import { useDispatch, useSelector } from 'react-redux';
import { getImages } from '../features/fetchUserImages';
import { useNavigate, Link } from 'react-router-dom';
import { BsCamera } from 'react-icons/bs';
import Loader from '../components/Loader';

function UserImages() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return null;
  }

  const { loading, error, images } = useSelector((state) => state.userImages);
  const dispatch = useDispatch();
  const [uploadedImages, setUploadedImages] = useState([]); // State to hold the uploaded images

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  // Listen for changes in the Redux store's images state and update the component's state
  useEffect(() => {
    if (images && images.images) {
      setUploadedImages(images.images);
    }
  }, [images]);

  return (
    <div className="mb-7">
      {loading ? (
        <div className="flex flex-row justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          {uploadedImages.length === 0 ? (
            <div className="flex flex-col items-center gap-y-3 my-9 lg:my-20">
              <div>
                <BsCamera size={160} className="border p-2 rounded-md" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">Share Photo</h1>
              <Link to="/create" className="text-xl text-blue-600 font-bold">
                Share your first photo
              </Link>
            </div>
          ) : (
            <div>
              <div className="ml-0 lg:ml-[18%] lg:mr-12 mt-5">
                <button
                  disabled
                  className="mb-2 mx-2 bg-black text-white rounded-md px-2 text-xl lg:mx-0 border"
                >
                  {uploadedImages.length === 1 ? 'Post' : 'Posts'}
                </button>

                <div className="grid gap-x-1 gap-y-1 grid-cols-3 lg:grid-cols-4 items-center">
                  {uploadedImages.map((image) => {
                    return (
                      <Link to={`singleimage/${image._id}`} key={image._id}>
                        <img src={image.image} alt={`Image ${image._id}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserImages;
