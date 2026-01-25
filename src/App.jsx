import './App.css'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { auth } from './app/firebase';
import Navbar from './components/Navbar';
import ScrollToTop from "./components/ScrollToTop";
import Footer from './components/Footer';
import CartSidebar from './components/features/cart/CartSidebar';

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
    <ScrollToTop />
      <Navbar user={user} />
      <CartSidebar />
      
      {/* Ye div aapke main content ka container hai */}
      <div className="pt-20 min-h-screen flex flex-col"> 
        
        {/* 1. Pehle Routes aayenge (Page ka content) */}
        <main className="flex-grow">
          <AppRoutes user={user} />
        </main>

        {/* 2. Aakhir mein Footer aayega */}
        <Footer />
        
      </div>
    </BrowserRouter>
  </>
)
}

export default App
