import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateNote() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    heading: '',
    description: '',
  });
  const params = useParams();
  const noteId = params.id;
  const onchangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${url}/getNote/${noteId}`);
        setFormData(result.data.data);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [noteId,url]);

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`${url}/update/${noteId}`, formData);
      if (result.data.success) {
        console.log(result.data.message);
        setFormData({
          name: '',
          heading: '',
          description: '',
        });
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="px-16 mx-auto w-[60%] mt-6">
        <Link to="/" className="cursor-pointer">
          Back
        </Link>
        <h1 className="text-3xl mb-4 text-center underline font-bold">Update a Note</h1>
        <form className="flex flex-col space-y-6" onSubmit={onSubmitHandle}>
          <div className="flex flex-col ">
            <label className="text-2xl ">Header : </label>
            <input
              placeholder="Enter the header name"
              className="p-3 border border-black rounded-md"
              required
              name="heading"
              value={formData.heading}
              onChange={onchangeHandle}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl ">Name : </label>
            <input
              placeholder="Enter the header Name"
              className="p-3 border border-black rounded-md"
              required
              name="name"
              value={formData.name}
              onChange={onchangeHandle}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-2xl ">Description</label>
            <textarea
              placeholder="Enter the Description"
              rows={10}
              className="p-3 border border-black rounded-md"
              required
              name="description"
              value={formData.description}
              onChange={onchangeHandle}
            />
          </div>
          <button
            type="submit"
            className="border bg-blue-400 cursor-pointer hover:bg-blue-600 text-white p-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateNote;
