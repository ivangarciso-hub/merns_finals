import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useEffect, useState} from 'react';
import axios from "axios";

function App() {


  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(null);
  

  useEffect(() => {

    axios
      .get("https://merns-finals.vercel.app/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch(error =>
        console.error('Error fetching student:', error));

  },[]);

  const saveStudent = (event) => {
   event.preventDefault();
   axios
     .post("https://merns-finals.vercel.app/students", {
       name: name,
       course: course,
       age: age
     })
     .then(() => {
       axios
         .get("https://merns-finals.vercel.app/students")
         .then((response) => {
           setStudents(response.data);
         });
         
       setName("");
       setCourse("");
       setAge("");
     });
 };
 const deleteStudent = (id) => {
   axios
     .delete(`https://merns-finals.vercel.app/students/${id}`).then(() => { 
       axios
         .get("https://merns-finals.vercel.app/students")
         .then((response) => {
           setStudents(response.data);
         });

     });
 };
 const updateStudent = (event) => {
   event.preventDefault();
   axios
     .put(`https://merns-finals.vercel.app/students/${id}`, {
       name: name,
       course: course,
       age: age
     })
     .then(() => {
       axios
         .get("https://merns-finals.vercel.app/students")
         .then((response) => {
           setStudents(response.data);
         });
         
       setName("");
       setCourse("");
       setAge("");
       setId(null);
     })
 };
 

  
  return (
    <div>

      <h1>Student Management System</h1>

      <h2>Students</h2>
      
      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

        <button onClick={() => deleteStudent(student._id)}>Delete</button>

    <button onClick={() =>{
      setId(student._id);
      setName(student.name);
      setCourse(student.course);
      setAge(student.age);}}>Update</button>
          </div>
      ))}
     <div>
        <form onSubmit={id ? updateStudent : saveStudent}>
  <div>
    <input
      type="text"
      placeholder="name"
      value={name}
      onChange={(event) => setName(event.target.value)}/>
  </div>
    <div>
      <input
          type="text"
          placeholder="course"
          value={course}
          onChange={(event) => setCourse(event.target.value)}/>
  </div>
    <div>
      <input
        type="text"
        placeholder="age"
        value={age}
        onChange={(event) => setAge(event.target.value)}/>
    </div>
  <div>
      <button className="submit-btn"type="submit">save</button>
      </div>
  </form>
  </div>
    </div>
          );
          }
export default App;