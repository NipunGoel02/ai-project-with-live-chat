import React ,{useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';
function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios.post('/users/register',{
        email,
        password
      }).then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token)
        setUser(res.data.user.email);
        navigate('/');
    }).catch((err) => {
         console.log(err);
    }); 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-1/2">
        <h1 className="text-3xl text-white font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label className="text-white block mb-2" htmlFor="email">Email</label>
            <input
             onChange={e => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="bg-gray-700 text-white p-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2" htmlFor="password">Password</label>
            <input
             onChange={e => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="bg-gray-700 text-white p-2 rounded-lg w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-white mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
