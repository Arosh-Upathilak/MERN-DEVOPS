import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [note, setNote] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/getNotes`);
        setNote(response.data.allNotes);
        console.log(response.data.allNotes || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/remove/${id}`);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdate = (id) => {
    navigate(`/updateNode/${id}`);
  };
  return (
    <>
      <Navbar />
      <div className="p-16">
        <div className="grid grid-cols-4 text-center border font-bold border-black p-4 text-xl">
          <h1>Heading</h1>
          <h1>Name</h1>
          <h1>Description</h1>
          <h1>Action</h1>
        </div>
        {note.map((item, index) => {
          return (
            <div className="grid grid-cols-4 text-center p-4" key={index}>
              <h1>{item.heading}</h1>
              <h1>{item.name}</h1>
              <h1>{item.description}</h1>
              <div className="flex gap-4 items-center justify-center">
                <button
                  className="p-2 bg-green-400 hover:bg-green-600 cursor-pointer rounded-md"
                  type="submit"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
                <button
                  className="p-2 bg-red-400 hover:bg-red-600 cursor-pointer rounded-md"
                  onClick={() => onUpdate(item._id)}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
