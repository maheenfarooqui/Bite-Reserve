import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

 const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Purana error saaf karein
    
    try {
      // ✅ 'logIn' ki jagah 'login' (jo useAuth se aaya hai) use karein
      await login(email, password); 
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome <span className="text-primary">Back</span></h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-primary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;