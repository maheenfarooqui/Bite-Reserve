import { useState } from 'react';
import { signUp } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Choti si validation
    if (password !== confirmPassword) {
      return setError("Passwords match nahi kar rahe!");
    }
    if (password.length < 6) {
      return setError("Password kam az kam 6 characters ka hona chahiye.");
    }

    try {
      await signUp(email, password);
      navigate('/'); // Account banne ke baad home par le jao
    } catch (err) {
      setError("Account nahi ban saka. Shayad email pehle se istemal mein hai.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 mt-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-2">Create <span className="text-primary">Account</span></h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Join the BiteReserve family today!</p>
        
        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded-lg">{error}</p>}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-primary transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-primary transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-primary transition-all"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:bg-opacity-90 transition-all active:scale-95">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm">
          already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;