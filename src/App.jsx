import './App.css'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { auth } from './app/firebase';
import Navbar from './components/Navbar';


function App() {
  const [user, setUser] = useState(null);

  // Ye "Observer" hai, jo Firebase se puchta rehta hai ke koi user logged in hai ya nahi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  

  return (
    <>
      <BrowserRouter>
      {/* Abhi hum simple rakhte hain, baad mein MainLayout use karenge */}
      <Navbar user={user} />
      <div className="pt-20 pb-10 min-h-screen"> 
        <AppRoutes />
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
