import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Mentor() {
  const API_URL = "https://mentor-view-2.onrender.com/api/";

  const [mentor, setMentor] = useState();
  const [students, setStudents] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [isStudents, setIsStudents] = useState(false);
  const [AssignedStudents, setAssignedStudents] = useState([]);
  const [NotAssignedStudents, setNotAssignedStudents] = useState([]);
  const [showButton,setShowButton] = useState(true)

  const { id } = useParams();

  // fetching mentor
  const fetchMentor = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}mentor/${id}`);
      setMentor(data);
      setIsLoading(false);
      setIsMentor(true);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}student/getStudents`);
      setStudents(data);
      setIsStudents(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMentor(id);
  }, [id]);

  useEffect(() => {
    if (isMentor) {
      fetchStudents();
    }
    if (isStudents) {
      const AssignedStudents = students.filter(
        (student) => student.isAssigned && student.mentorId === parseInt(id)
      );
      const notAssignedStudents = students.filter(
        (student) => !student.isAssigned
      );
      setAssignedStudents(AssignedStudents);
      setNotAssignedStudents(notAssignedStudents);
    }
  }, [isMentor, isStudents]);

  // console.log(AssignedStudents)
  // console.log(NotAssignedStudents)
  const handleClick = async (Student) => {
    const formData = {
      OOPS: 0,
      C: 0,
      Java: 0,
      Python: 0,
      NALR: 0,
      total: 0,
      isAssigned: false,
    };
    try {
      const response = await axios.put(
        `${API_URL}student/resetData/${Student.studentId}`,
        formData
      );
      // console.log(response.data);

      const updatedNotAssigned = [...NotAssignedStudents];
  
      // Find the index of the Student object in the isAssigned array
      const index = AssignedStudents.findIndex((s) => s.studentId === Student.studentId);
      
      if (index !== -1) {
        // Remove the Student object from the isAssigned array
        const removedStudent = AssignedStudents.splice(index, 1)[0];
        
        // Update the isAssigned state without the removed Student object
        setAssignedStudents([...AssignedStudents]);

        // Add the removed Student object to the notAssigned array
        updatedNotAssigned.push(removedStudent);

        // Update the notAssigned state with the updated array
        setNotAssignedStudents(updatedNotAssigned);        
      }
    }catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  const finalSubmit = async () =>{
    if(AssignedStudents.length<3){
      return;
    }setShowButton(false);
  }

  return (
    <>
      {isMentor && (
        <div className="text-white">
          <Header mentor={mentor} />
          <div className="m-4">
            <h1 className="text-white text-center text-3xl underline">
              Students
            </h1>
          </div>

          {/* Assigned */}
          <div className="flex flex-col gap-12 mb-10">
            <div className="flex flex-col gap-4">
              <div className="ml-4">
                <h2>Assigned</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>StudentId</th>
                      <th>Name</th>
                      <th>OOPS</th>
                      <th>C/C++</th>
                      <th>Java</th>
                      <th>Python</th>
                      <th>NALR</th>
                      <th>Total Marks</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AssignedStudents.length > 0 &&
                      AssignedStudents.map((Student) => (
                        <tr key={Student._id}>
                          <td className="px-4 py-2">{Student.studentId}</td>
                          <td className="px-4 py-2">{Student.name}</td>
                          <td className="px-4 py-2">{Student.OOPS}</td>
                          <td className="px-4 py-2">{Student.C}</td>
                          <td className="px-4 py-2">{Student.Java}</td>
                          <td className="px-4 py-2">{Student.Python}</td>
                          <td className="px-4 py-2">{Student.NALR}</td>
                          <td className="px-4 py-2">{Student.total}</td>

                          {showButton &&
                            <td className="px-4 py-2 flex gap-5">
                              {
                                <Link
                                  state={{ Student, id }}
                                  className="px-2 py-1 text-center text-xs font-bold rounded bg-blue-500 hover:bg-blue-700 text-white"
                                  to={"/forms"}
                                >
                                  Edit
                                </Link>
                              }
                              {
                                <button
                                  className="px-2 py-1 text-center text-xs font-bold rounded bg-red-500 hover:bg-red-700 text-white"
                                  onClick={() => {
                                    handleClick(Student);
                                  }}
                                >
                                  Not Assign
                                </button>
                              }
                            </td>
                          }
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Not assigned */}
            <div className="flex flex-col gap-4">
              <div className="ml-4">
                <h2>Not Assigned</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>StudentId</th>
                      <th>Name</th>
                      <th>email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NotAssignedStudents.length > 0 &&
                      NotAssignedStudents.map((Student) => (
                        <tr key={Student._id}>
                          <td className="px-4 py-2">{Student.studentId}</td>
                          <td className="px-4 py-2">{Student.name}</td>
                          <td className="px-4 py-2">{Student.email}</td>
                          {showButton &&
                            <td className="px-4 py-2">
                              {AssignedStudents.length < 4 && (
                                  <Link
                                    state={{ Student, id }}
                                    className="px-2 py-1 text-center text-xs font-bold rounded bg-blue-500 hover:bg-blue-700 text-white"
                                    to={"/forms"}
                                  >
                                    Assign
                                  </Link>
                                )}
                            </td>
                          }
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="submitButton flex flex-col justify-center items-center">
              <button className="btn btn-neutral w-1/2" onClick={()=>{finalSubmit()}}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Mentor;
