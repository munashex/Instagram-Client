import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function Search() {
  const [search, setSearch] = useState('');
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  const onSubmit = () => {
    navigate(`user/${search}`); 
    setSearch(" ")
  }; 

  return (
    <div className="">
      <h1 className="text-center text-4xl font-thin my-6">Search</h1>

      <div className="mx-auto w-fit">
        <input
          placeholder="@username"
          className="border border-black p-2 outline-none w-60 md:w-80"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className={`${
            search?.length < 1
              ? 'hidden'
              : 'p-2 bg-blue-600 text-white text-lg mx-2 rounded-md'
          }`}
          onClick={onSubmit} 
        >
          Search
        </button>
      </div>
      <Outlet /> 
    </div>
  );
}

export default Search;
