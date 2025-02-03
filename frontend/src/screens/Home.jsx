
import React, { useState } from 'react';
import { useContext , useEffect} from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios.js';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../config/axios.js';
function Home() {
  const { user } = useContext(UserContext);
  const [ismodalopen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get('/projects/all').then(function(response){
      console.log(response.data);
      setProjects(response.data.projects);
    }).catch(function(error){
      console.log(error);

    })
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    axios.post('/projects/create' , {
      name : name,

    }).then((res) => {}).catch((err) =>{
      console.log(err);
    });
    setName('');
    setModalOpen(false);
  };
   const navigate = useNavigate();
  return (
    <main className='p-4'>
      <div className='projects flex gap-4'>
      <div className="project  ">
  <button 
    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg border border-gray-700"
    onClick={() => setModalOpen(true)}
  >
    New Project
    <i className="ri-add-large-line"></i  >
  
  </button>
       
      </div>
      <div className="project flex-col cursor-pointer">
  {projects.map((project) => (
    <button
      key={project.id} // Ensure 'id' is correctly accessed from your data structure
      className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg border border-gray-700 flex flex-col justify-center items-center"
      onClick={() => navigate(`/project`, { state: { project } })} // Pass an individual project
    >
      <h2 className="text-lg">{project.name}</h2>
      <div className="text-sm">{project.users.length} Users</div>
    </button>
  ))}
</div>


</div>

      {ismodalopen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-1/2">
            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg mb-4"
                placeholder="Enter project name"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Add Project
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
