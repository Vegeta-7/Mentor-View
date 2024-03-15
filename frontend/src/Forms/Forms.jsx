import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Forms = () => {
  const location = useLocation();
  const student = location.state?.Student;
  const mentorId = location.state?.id;
  const API_URL = "https://mentor-view-2.onrender.com/api/";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    OOPS: "",
    C: "",
    Java: "",
    Python: "",
    NALR: "",
  });

  const [assignedData,setAssignedData]=useState({
    OOPS: student.OOPS,
    C: student.C,
    Java: student.Java,
    Python: student.Python,
    NALR: student.NALR,
  })

  const { OOPS, C, Java, Python, NALR } = formData;

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) return;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const total = OOPS + C + Java + Python + NALR;
      const data ={
        ...formData,
        isAssigned:true,
        total,
        mentorId
      }

      const response = await axios.put(
        `${API_URL}student/assignData/${student.studentId}`,
        data
      );      
      navigate(`/${mentorId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    setFormData(prevFormData=>({
      ...prevFormData,
      ...assignedData,
    }))
  },[assignedData])

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form className="flex flex-col gap-5 w-full max-w-md">
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="OOPS" className="text-2xl font-semibold">
              OOPS:
            </label>
            <input
              type="number"
              id="OOPS"
              name="OOPS"
              value={OOPS}
              placeholder="Enter The Marks"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="C" className="text-2xl font-semibold">
              C/C++:
            </label>
            <input
              type="number"
              id="C"
              name="C"
              value={C}
              placeholder="Enter The Marks"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="Java" className="text-2xl font-semibold">
              Java:
            </label>
            <input
              type="number"
              id="Java"
              name="Java"
              value={Java}
              placeholder="Enter The Marks"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="Python" className="text-2xl font-semibold">
              Python:
            </label>
            <input
              type="number"
              id="Python"
              name="Python"
              value={Python}
              placeholder="Enter The Marks"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="NALR" className="text-2xl font-semibold">
              NALR:
            </label>
            <input
              type="number"
              id="NALR"
              name="NALR"
              value={NALR}
              placeholder="Enter The Marks"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-start ">
            <button
              className="btn btn-neutral w-full max-w-xs"
              onClick={handleAssign}
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Forms;
